import { parseData } from "../utility/parseData"

$('[data-static]').each((index, $static)=> {
    const dataStatic = $static.dataset.static
    if (dataStatic.includes(';')) {
        dataStatic.split(';').forEach((dataItem, index) => {
            parseStatic(dataItem, $static)
        });
    }
    else {
        parseStatic(dataStatic, $static)
    }

})

function parseStatic(rawData, $root) {
    const data = parseData(rawData)
    const defaultConfig = {
        id: null,
        event: "click",
        target: $root,
        log: false
    }
    const config = Object.assign(defaultConfig, data)
    if (config.id) {
        $(config.target).on(config.event, (e)=> {
            ym(10000000, 'reachGoal', config.id)
            if (config.log) console.log(config, e);
        })
    } 
}