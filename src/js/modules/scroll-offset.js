let bodyWidth = document.documentElement.getBoundingClientRect().width;
//*
window.addEventListener('resize', function(){
    bodyWidth = document.documentElement.getBoundingClientRect().width;
});
//*
export let scrollOffsetlist = [];
//*
let addStyleOffset = document.createElement('style');
addStyleOffset.innerHTML = '.scroll-offset { padding-right:' + (window.innerWidth - bodyWidth) + 'px;}';
document.getElementsByTagName('head')[0].appendChild(addStyleOffset);
//*
document.querySelectorAll('[data-scroll-trigger]').forEach(element => {
    element.classList.remove('scroll-offset');
});

export function conditionScrollOffset(id, $condition) {
    if ($condition == 'open') {
        scrollOffsetlist.push(id);
    }
    else if ($condition == 'close') {
        scrollOffsetlist.splice(scrollOffsetlist.indexOf(id), 1);
    }
    return scrollOffsetlist.length;
}
//*
export function scrollOffset(id, $condition) {
    conditionScrollOffset(id, $condition || 'open')
    if (scrollOffsetlist.length === 1) {
        document.body.style.overflow = 'hidden';
        document.querySelectorAll('[data-scroll-trigger]').forEach(element => {
            element.classList.add('scroll-offset');
        });
    }
    if (scrollOffsetlist.length === 0) {
        document.body.style.overflow = '';
        document.querySelectorAll('[data-scroll-trigger]').forEach(element => {
            element.classList.remove('scroll-offset');
        });
    }
}