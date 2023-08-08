import { isString } from "./util"

export function parseDataList(data) {
    if(isString(data)) {
        data = data.trim()
        const dataList = {}
        //*
        if (data.includes(';')) {
            data.split(';').forEach((dataItem, index) => {
                dataList[index] = dataItem.trim().split(',').filter((item)=>item.trim()).map((item)=>item.trim())
            });
        }
        else {
            dataList[0] = data.split(',').filter((item)=>item.trim()).map((item)=>item.trim())
        }
        return dataList
    }
    return {}
}

