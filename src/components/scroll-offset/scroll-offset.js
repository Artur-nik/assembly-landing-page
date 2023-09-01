import { isHTMLElement } from "../../js/utility/util";

const SOList = []

//*
function scrollOffsetEscape(e) {
    if (e.key === 'Escape') {
        const $root = SOList[SOList.length - 1]
        $($root).trigger('scrollOffsetClose', {target: $root})
    }
}

//*
$(window).on("scrollOffsetOpen", (e, data)=> {
    if (data && data.target) {
        if (isHTMLElement(data.target)) {
            SOList.push(data.target)
            //*
            if (SOList.length === 1) {
                document.body.classList.add('scroll-offset');
                window.addEventListener('keyup', scrollOffsetEscape)
            }
        }
    }

})

//*
$(window).on("scrollOffsetClose", (e, data)=> {
    if (data && data.target) {
        if (isHTMLElement(data.target)) {
            if (SOList.includes(data.target)) SOList.splice(SOList.indexOf(data.target), 1)
            //*
            if (SOList.length === 0) {
                document.body.classList.remove('scroll-offset');
                window.removeEventListener('keyup', scrollOffsetEscape)
            }
        }
    }
})

//*
$(window).on("scrollOffsetAllClose", (e)=> {
    const SOItems = []
    SOList.forEach($item => {
        SOItems.unshift($item)
    });
    SOItems.forEach($item => {
        $($item).trigger('scrollOffsetClose', {target: $item})
    });
})

//*
const addStyleOffset = document.createElement('style');
const bodyWidth = window.innerWidth - document.documentElement.getBoundingClientRect().width;
$(window).one("scrollOffsetOpen", null, ()=> {
    addStyleOffset.innerHTML = ':root{--scroll-offset-init: ' + bodyWidth + 'px;}';
    document.getElementsByTagName('head')[0].appendChild(addStyleOffset);
})

window.addEventListener('resize', function(){
    addStyleOffset.innerHTML = ':root{ --scroll-offset-init:' + (window.innerWidth - document.documentElement.getBoundingClientRect().width) + 'px;}';
});