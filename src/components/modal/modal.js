$('[data-modal-open]').on('click', function(){
    let modalBtn = $(this);
    modalOpen(this.dataset.modalOpen, function(modalId, modal){
        //*
        if (modalId == 'modal-video') {
            let modalVideoSrc = modalBtn.data('video-src') || $(modal).find('.video__frame').data('video-src');
    
            if (!$(modal).find('iframe.video__frame').length) { 
                initVideo($(modal).find('.video__frame').attr('id'), modalVideoSrc);
            }
            else {
                player[$(modal).find('.video__frame').attr('id')].loadVideoById({videoId: modalVideoSrc})
            }
        }
        //*
        if (modalBtn.data('modal-title')) {
            $('.modal [data-modal-title]').text(modalBtn.data('modal-title'));
            $('.modal .form-input-title').val('Pop-Up: ' + modalBtn.data('modal-title'));
        }
        else {
            $('.modal [data-modal-title]').text($('.modal [data-modal-title]').data('modal-title'));
            $('.modal .form-input-title').val('Pop-Up: ' + $('.modal [data-modal-title]').data('modal-title'));
        }
        
        if (modalBtn.data('info')) {
            $('#input-info').val(modalBtn.data('info'));
        }
        else {
            $('#input-info').val('');
        }
    });
    return false;
}); 

//*

function modalOpen(modalId, callback) {
    const modal = document.getElementById(modalId);
    //*
    $('#' + modalId).fadeIn(500);
    //*
    setTimeout(()=> scrollOffset(modalId), 500);

    if (callback) callback(modalId, modal);

}




function modalClose(modal) {
    //*
    setTimeout(function(){
        $(modal).fadeOut(500);
    },150);
    //*
    scrollOffset(modal.id, 'close');
    //*
    if ($(modal).find('iframe').length) {
        player[$(modal).find('.video__frame')[0].id].pauseVideo();
    } 
}

//$('.modal').each((index, $modal)=> {
//    $($modal).on('modal:open', (e, e1, $btn)=> {
//        console.log(e, e1, $btn);
//    })
//})

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