//
//* Закрытие по кнопке
$(".modal__close").click(function(){
    modalClose($(this).parents('.modal')[0]);  
}); 

//* Закрытие по клику в не области элемента
$('.modal').mouseup(function (e){ 
    const modalBox = $(this).find('.modal-target'); 
    if (($(this).data('modal-target') != false) && 
        !modalBox.is(e.target) && 
        modalBox.has(e.target).length === 0
        ) { 
        modalClose(this);  
    }
});

//*
window.addEventListener('keyup', (e)=> {
    if (e.key === 'Escape' && conditionScrollOffset()) {
        const modalCloseId = document.getElementById(scrollOffsetlist[scrollOffsetlist.length - 1]);
        if ($(modalCloseId).hasClass("modal")) {
            modalClose(modalCloseId); 
        }
    }
});