//* data-unit
//* data-unit-stop
function units($root) {
    if (!($root instanceof HTMLElement)) {
        console.error($root, 'only HTMLElement')
        return
    }
    const unitList = {}

    function parseUnit($units) {
        //*
        if ($units.children.length) {
            for (let index = 0; index < $units.children.length; index++) {
                //*
                const $unit = $units.children[index];
                //*
                if ($unit.dataset.unit) {
                    if ($unit.dataset.unit.includes(',')) {
                        $unit.dataset.unit.split(',').forEach(unitName => {
                            createUnit($unit, unitName.trim())
                        });
                    }
                    else {
                        createUnit($unit, $unit.dataset.unit.trim())
                    }
                }
                //* 
                if (!$unit.hasAttribute('data-unit-stop')) parseUnit($unit)
            }
        }
        //*
        return
    }
    //*
    parseUnit($root)
    //*
    function createUnit($unit, unitName) {
        if (unitName.startsWith('#')) {
            if (!unitList[unitName])unitList[unitName] = $unit
            else {
                console.group(`Error id ${unitName} unit`);
                console.error('элемент: ',$unit);
                console.error(`${unitName} идентификатор уже существует`);
                console.error('юнит: ', unitList[unitName]);
                console.error('root: ', $root);
                console.groupEnd();
            }
        }
        else {
            if (!unitList[unitName]) unitList[unitName] = []
            unitList[unitName].push($unit)
        }
    }
    return (unitValue) => {
        if (!unitValue) {
            console.log('Missing value unit');
            return
        }
        if (unitValue.includes(',')) {
            let _list = []
            unitValue.split(',').forEach(unitName => {
                unitName = unitName.trim()
                if (!unitName || !unitList[unitName]) return
                if (Array.isArray(unitList[unitName])) {
                    _list = _list.concat(unitList[unitName])
                }
                else {
                    if (unitList[unitName]) _list.push(unitList[unitName])
                }
            });
            return Array.from(new Set(_list)).length ? Array.from(new Set(_list)) : []
        }
        else {
            return unitList[unitValue] ? unitList[unitValue] : []
        }
         
    }
}
