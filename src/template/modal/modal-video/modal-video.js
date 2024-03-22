import { Modal } from "../../../components/modal/modal";

new Modal({
    name: 'youtube-video',
    onOpen($modal, data, $trigger) {
        if (data.videoSrc) {
            if (!$($modal).find('iframe.video__frame').length) { 
                $($modal).find('[data-video]').trigger('initPlay', data.videoSrc) 
                $modal.__videoSrc = data.videoSrc
            }
            else {
                if ($modal.__videoSrc === data.videoSrc) {
                    $($modal).find('[data-video]').trigger('playVideo') 
                }
                else {
                    $($modal).find('[data-video]').trigger('loadVideoById', data.videoSrc) 
                    $modal.__videoSrc = data.videoSrc
                }
                
            }
        }
    },
    onClose($modal) {
        $($modal).find('[data-video]').trigger('stopVideo') 
    },
})

