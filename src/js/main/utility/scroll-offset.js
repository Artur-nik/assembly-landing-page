//*
let scrollOffsetlist = [];
//*
let addStyleOffset = document.createElement('style');
addStyleOffset.innerHTML = '.scroll-offset { padding-right:' + (window.innerWidth - bodyWidth) + 'px;}';
document.getElementsByTagName('head') [0].appendChild(addStyleOffset);
//*
document.querySelectorAll('[data-scroll-trigger]').forEach(element => {
    element.classList.remove('scroll-offset');
});

function conditionScrollOffset(id, $condition) {
    if ($condition == 'open') {
        scrollOffsetlist.push(id);
    }
    else if ($condition == 'close') {
        scrollOffsetlist.splice(scrollOffsetlist.indexOf(id), 1);
    }
    return scrollOffsetlist.length;
}
//*
function scrollOffset(id, $condition) {
    conditionScrollOffset(id, $condition || 'open')
    if (conditionScrollOffset() === 1) {
        document.body.style.overflow = 'hidden';
        document.querySelectorAll('[data-scroll-trigger]').forEach(element => {
            element.classList.add('scroll-offset');
        });
    }
    if (conditionScrollOffset() === 0) {
        document.body.style.overflow = '';
        document.querySelectorAll('[data-scroll-trigger]').forEach(element => {
            element.classList.remove('scroll-offset');
        });
    }
}