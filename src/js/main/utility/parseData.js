function parseData(data) {
    if(isString(data)) {
        data = data.trim()
        data = data.includes(',') ? data.split(',') : [data]
        const dataList = {}
        
        data.forEach(dataValue => {
            if (dataValue.includes(':')) {
                const [_key, _value] = dataValue.split(':')
                dataList[_key.trim()] = _value 
            }
            else {
                dataList[dataValue.trim()] = true
            }
        });
        console.log(dataList);
        return dataList
    }
    return {}
}

