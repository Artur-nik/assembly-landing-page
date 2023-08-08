//* data-unit
//* data-unit:stop
export class Units {
    unitList = {} 
    unitNameList = new Map()
    constructor($root, stop) {
        if (!($root instanceof HTMLElement)) {
            console.error($root, 'only HTMLElement')
            return
        }
        if (stop && !(typeof stop === 'function')) {
            console.group(`Error stop`);
            console.error('Argument "', stop, '" only function')
            console.error('root: ', $root);
            console.groupEnd();
            stop = () => {return true}
        }
        this.stop = stop ? stop : () => {return true}
        this.$root = $root
    }
    //*
    init() {
        //*
        this.parseUnits(this.$root)
        //*
        const unit = this.unit.bind(this)
        //*
        return unit
    }
    update() {
        this.unitList = {}
        this.unitNameList = new Map()
        this.parseUnits(this.$root)
    }
    destroy() {
        this.unitNameList = {}
        this.unitList = {}
    }
    parseUnits($units) {
        if ($units.children.length) {
            for (let index = 0; index < $units.children.length; index++) {
                //*
                const $unit = $units.children[index];
                let unitValue = $unit.dataset['unit:stop'] || $unit.dataset.unit;
                //*
                
                if (unitValue && unitValue.trim().length) {
                    if (unitValue.includes(' ')) {
                        let unitList = unitValue.split(' ') 
                        unitList.forEach(unitName => {
                            this.createUnit($unit, unitName)
                        });
                        //*
                        this.unitNameList.set($unit, unitList.filter((unit)=> unit.trim()))
                    }
                    else {
                        this.createUnit($unit, unitValue)
                        this.unitNameList.set($unit, [unitValue])
                    }
                }

                //*
                if (!$unit.dataset['unit:stop'] && this.stop($unit) && $unit.children.length) this.parseUnits($unit)
            }
        }
    }
    createUnit($unit, unitName) {
        unitName = unitName.trim()
        if (unitName.startsWith('#') && unitName.length >= 2 ) {
            if (!this.unitList[unitName]) {
                this.unitList[unitName] = [] 
                this.unitList[unitName].push($unit)
            }
            //else {
            //    console.group(`Error id ${unitName} unit`);
            //    console.error('элемент: ',$unit);
            //    console.error(`${unitName} идентификатор уже существует`);
            //    console.error('юнит: ', this.unitList[unitName][0]);
            //    console.error('root: ', this.$root);
            //    console.groupEnd();
            //}
        }
        else if (unitName.length){
            if (!this.unitList[unitName]) this.unitList[unitName] = []
            this.unitList[unitName].push($unit)
        }
    }
    unit(unitValue, unitHandler) {
        //*
        let unitList = []
        
        //*
        if (!unitValue ) {
            console.log('Missing value unit');
            return
        }
        //*
        unitValue = unitValue.trim()
        //*
        if (!unitValue.length) return []
        //*
        if (unitValue.includes(' ')) {
            //*
            let unitValueList = unitValue.split(' ').filter((unit)=> unit.trim()).sort()
            const unitValueListStr = unitValueList.join(' ')
            //*
            if (this.unitList[unitValueListStr]) unitList = this.unitList[unitValueListStr]
            else {
                
                unitValueList.forEach(unitName => {
                    if (this.unitList[unitName]) {
                        unitList = unitList.concat(unitList, this.unitList[unitName])
                    }
                })
                unitList = Array.from(new Set(unitList))
                this.unitList[unitValueListStr] = unitList
            }
        }
        else {
            if (this.unitList[unitValue]) unitList = this.unitList[unitValue]
        }
        if (unitHandler && typeof unitHandler === 'function') {
            unitList.forEach(($unit, indexUnit)=> {
                unitHandler($unit, indexUnit, this.unitNameList.get($unit))
            }) 
        }
        return unitList
    }
    
}