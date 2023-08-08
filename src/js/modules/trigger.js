import { parseDataList } from "../utility/parseDataList"
import { isNumber, isString } from "../utility/util"

//*  data-trigger - вызывает событие у элемента
//*  Все дата атрибуты отправляется вместе с triggerData (кроме самого trigger)
//*  аргументы:
//*     1. селектор/ид - $(triggerElement) (window, document)
//*     2. Имя события (можно передать более одного через пробел "event event-1 event-2")
//*     3. число - для setTimeout
//*     4. ';' - позволяет разделить и задать для нескольких элементов события
//*  data-trigger="#modal-form, modal:open, 400; #modal-video, modal:open"
//*  data-trigger="#modal-form, modal:open, 400"
//*  data-trigger="#modal-form, modal:open, 400"


$('[data-trigger]').each((index, $trigger)=>{
    //*
    trigger($trigger, $trigger.dataset.trigger, 'trigger', 'click')
    //*
})
//*
export function trigger($root, config, configName, eventName) {
    if ($root.__trigger) return
    $root.__trigger = true
    //*
    config = parseDataList(config)
    //*
    Object.keys(config).forEach(index => {
        //*
        const data = config[index]
        //*
        let   triggerElement = data[0] || false
        const triggerEvent   = data[1] || false
        const triggerDelay   = data[2]
        //*
        if (triggerElement === 'window') triggerElement = window
        if (triggerElement === 'document') triggerElement = document
        //*
        if (triggerElement && triggerEvent ) {
            if (triggerDelay) {
                if (!isNumber(triggerDelay)) {
                    console.error("trigger delay error: ", triggerDelay, ' only Number');
                    return
                }
                $($root).on(eventName, ()=> {
                    setTimeout(
                        ()=> {
                            $(triggerElement).trigger(triggerEvent, [parceDataset(), $root])
                        }, triggerDelay
                    )
                })
            }
            else {
                $($root).on(eventName, ()=> {
                    $(triggerElement).trigger(triggerEvent, [parceDataset(), $root])
                })
            }
        }
    })
    function parceDataset() {
        let triggerData = {}
        Object.keys($root.dataset).forEach(data => {
            if (data != configName) {
                triggerData[data] = $root.dataset[data]
            }
        });
        return triggerData
    }
}

