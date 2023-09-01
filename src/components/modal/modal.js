import { isFunction, isHTMLElement, isObject } from "../../js/utility/util";

export class Modal {
    constructor(config) {
        //*
        this.config = isObject(config) ? config : {}
        //*
        if (isHTMLElement(config.root)) {
            this.init(config.root)
        }
        else if (config.name){
            config.name = config.name.trim()
            if (modalList[config.name]) {
                modalList[config.name].forEach($modal => {
                    this.init($modal)
                });
            }
        }
        else {
            console.log('Error: {name: "modal" || root: HTMLElement}');
        }
        //*
    }
    init($root) {
        const config = this.config
        //* 
        $($root).on('modalOpen', (e, data, $trigger)=> {
            this.open($root, data, $trigger)
            return false
        })
        //*
        $($root).on('scrollOffsetClose', (e, data, $trigger)=> {
            this.close($root, data)
            return false
        })
        //*
        $($root).on('modalClose', (e, data, $trigger)=> { 
            this.close($root, data, $trigger)
            return false
        })
        //*
        $(window).on('modalCloseAll', (e, data, $trigger)=> {
            this.close($root, data, $trigger)
        })
        //*
        $($root).find('[data-modal-close]').on('click', (e)=> {
            this.close($root, config)
        })
        if (config.setup && isFunction(config.setup)) config.setup($root)
    }
    open($root, data, $trigger){
        const config = this.config
        //*
        if (config.onOpen && isFunction(config.onOpen)) config.onOpen($root, data, $trigger)
        if (config.onOpenReplace && isFunction(config.onOpenReplace)) config.onOpenReplace($root, data, $trigger)
        else {
            $($root).fadeIn(400);
        }
        $(window).trigger('scrollOffsetOpen', {target: $root})
        if (config.onOpenAfter && isFunction(config.onOpenAfter)) config.onOpenAfter($root, data, $trigger)
    }
    close($root, data, $trigger){
        const config = this.config
        //*
        if (config.onClose && isFunction(config.onClose)) config.onClose($root, data, $trigger)
       
        if (config.onCloseReplace && isFunction(config.onCloseReplace)) config.onCloseReplace($root, data, $trigger)
        else {
            $($root).fadeOut(400);
        } 
        $(window).trigger('scrollOffsetClose', {target: $root})
        if (config.onCloseAfter && isFunction(config.onCloseAfter)) config.onCloseAfter($root, data, $trigger)
    }
}

const modalList = {}

$('[data-modal]').each((indexModal, $modal)=> {
    const modalName = $modal.dataset.modal.trim()
    if (modalName.length) {
        if (!modalList[modalName]) modalList[modalName] = []
        modalList[modalName].push($modal)
    }
    else {
        new Modal({
            root: $modal
        })
    }
})