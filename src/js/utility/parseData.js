import { isString } from "./util"

export function parseData(data) {
    if(isString(data)) {
        data = data.trim()
        data = data.includes(',') ? data.split(',') : [data]
        const dataList = {}
        
        data.forEach(dataValue => {
            if (dataValue.includes(':')) {
                dataValue = dataValue.split(':')
                const _key = dataValue[0].trim()
                const _value = dataValue[1].trim()
                dataList[_key.trim()] = Number(_value) ? Number(_value) : _value
            }
            else {
                dataList[dataValue.trim()] = true
            }
        });
        return dataList
    }
    return {}
}

