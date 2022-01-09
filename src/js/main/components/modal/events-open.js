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
            $('.modal-form__title').text(modalBtn.data('modal-title'));
            $('.modal .form-input-title').val('Pop-Up: ' + modalBtn.data('modal-title'));
        }
        else {
            $('.modal-form__title').text($('.modal-form__title').data('modal-title'));
            $('.modal .form-input-title').val('Pop-Up: ' + $('.modal-form__title').data('modal-title'));
        }
    });
    return false;
}); 

