if (window.matchMedia("(pointer: fine)").matches) {

const cursorItem = document.getElementById('cursor');
function cursorEvent(x,y) {
    cursorItem.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
    window.requestAnimationFrame(cursorEvent);
}
window.requestAnimationFrame(cursorEvent);

window.addEventListener('mousemove', function(e){
    cursorEvent(e.clientX, e.clientY);
});


window.addEventListener('mouseover', function(e){
    $(cursorItem).addClass('_show');
    if (e.target.localName == 'iframe') {
        console.log(e.target);
        $(cursorItem).removeClass('_show');
    }
});
window.addEventListener('mouseout', function(e){
    $(cursorItem).removeClass('_show');
});
function cursorTrigger(element, Class) {
    let cursorElement = element;
    let cursorClass = Class;
    $(cursorElement).on("mouseenter", function() {
        $(cursorItem).addClass(cursorClass);
    });
    $(cursorElement).on("mouseleave", function() {
        $(cursorItem).removeClass(cursorClass);
    });
    $(cursorElement).on("mousedown", function() {
        $(cursorItem).addClass('_click');
    });
    $(cursorElement).on("mouseup", function() {
        $(cursorItem).removeClass('_click');
    });
}
cursorTrigger('.trigger', 'cursor-trigger');


//* end
}