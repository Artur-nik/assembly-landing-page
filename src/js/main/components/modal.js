
//* Открытие окна

$('[data-modal-open]').on('click', function(){
    const modal = $(this).data('modal-open');
    //*
    $('#' + modal).fadeIn(500);
    //*
    setTimeout(function tick() {
        $('body').css('overflow', 'hidden');
        if ($('body').css('padding-right') == '0px') {
            $('.scroll-offset').css('padding-right',  window.innerWidth - bodyWidth + 'px');
        }
    },500);
    //*
    if (modal == 'modal-video') {
        let modalVideoSrc = $(this).data('video-src') || $('#' + modal).find('.video__frame').data('video-src');

        if (!$('#' + modal).find('iframe.video__frame').length) { 
            initVideo($('#' + modal).find('.video__frame').attr('id'), modalVideoSrc);
        }
        else {
            player[$('#' + modal).find('.video__frame').attr('id')].loadVideoById({videoId: modalVideoSrc})
        }
    }
    //*
    if ($(this).data('modal-title')) {
        $('.modal-form__title').text($(this).data('modal-title'));
        $('.modal .form-input-title').val('Pop-Up: ' + $(this).data('modal-title'));
    }
    else {
        $('.modal-form__title').text($('.modal-form__title').data('modal-title'));
        $('.modal .form-input-title').val('Pop-Up: ' + $('.modal-form__title').data('modal-title'));
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
        $('.scroll-offset').css('padding-right', 0 + 'px');
    };
    if (modalClose.parents('.modal')[0].id == 'modal-video') {
        player[modalClose.parents('.modal').find('.video__frame').attr('id')].pauseVideo();
    }    
}); 

//* Закрытие по клику в не области элемента
$('.modal').mouseup(function (e){ 
    const modal = $(this); 
    const modalBox = $(this).find('.modal-target'); 
    if ((modal.data('modal-target') != false) && !modalBox.is(e.target) && modalBox.has(e.target).length === 0) { 
        setTimeout(function tick() {
            modal.fadeOut(500); 
        },150);
        if (checkModalOpen(modal)) {
            $('body').css('overflow', '');
            $('.scroll-offset').css('padding-right', 0 + 'px');
        }
        if (modal[0].id == 'modal-video') {
            player[modal.find('.video__frame').attr('id')].pauseVideo();
        }  
    }
});


function checkModalOpen(modal) {
    return modal.parents('body').find('.modal:visible').length === 1;
}
