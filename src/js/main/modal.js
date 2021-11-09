
//* Открытие окна
$('[data-modal-open]').on('click', function(){
    const modal = $(this).data('modal-open');
    $('#' + modal).fadeIn(500);
    setTimeout(function tick() {
        $('body').css('overflow', 'hidden')
    },500);
    if (modal == 'modal-video') {
        let modalVideoSrc;
        if ($(this).data('video-src')) {
            modalVideoSrc = $(this).data('video-src');
        }
        else {
            modalVideoSrc = $('#' + modal).find('.modal-video__box').data('video-src');
        }
        if (!$('#' + modal).find('.modal-video__frame').length) { 
            console.log($('#' + modal).find('.modal-video__frame').length);
            $('#' + modal).find('.modal-video__box').html(' <iframe class="modal-video__frame" src="' + modalVideoSrc + '" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
        }
        else {
            $('#' + modal).find('.modal-video__frame').attr('src', modalVideoSrc)
        }
    }
}); 
//
//* Закрытие по кнопке
$(".modal__close").click(function(){
    const modalClose =  $(this);
    setTimeout(function tick() {
        modalClose.parents('.modal').fadeOut(500);
    },150);
    if (checkModalOpen($(this).parents('.modal'))) {
        $('body').css('overflow', '');
    }
    setTimeout(function tick() {
        if (modalClose.parents('.modal')[0].id == 'modal-video') {
            modalClose.parents('.modal').find('.modal-video__frame').attr('src', '')
        }    
    },650);
}); 

//* Закрытие по клику в не области элемента
$('.modal').mouseup(function (e){ 
    const modal = $(this); 
    const modalBox = $(this).find('.modal__box'); 
    if (modal.data('modal-target') != false) {
        if (!modalBox.is(e.target) && modalBox.has(e.target).length === 0) { 
            setTimeout(function tick() {
                modal.fadeOut(500); 
            },150);
            if (checkModalOpen(modal)) {
                $('body').css('overflow', '');
            }
        }
    }
});


function checkModalOpen(modal) {
    return modal.parents('body').find('.modal:visible').length === 1;
}
