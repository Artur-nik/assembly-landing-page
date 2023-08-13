import { isString } from "./util"

export function parseDataObj(data) {
    if(isString(data)) {
        const parceDate = new Function(`return {${data}}`);
        return JSON.parse(JSON.stringify(parceDate()))
    }
    return {}
}