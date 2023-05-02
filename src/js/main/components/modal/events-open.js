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

