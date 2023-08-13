import { Modal } from "../../../components/modal/modal";
import { initVideo, player } from "../../../components/video/video";

new Modal({
    name: 'youtube-video',
    onOpen($modal, data, $trigger) {
        if (data.videoSrc) {
            if (!$($modal).find('iframe.video__frame').length) { 
                initVideo($($modal).find('.video__frame').attr('id'), data.videoSrc);
            }
            else {
                player[$($modal).find('.video__frame').attr('id')].loadVideoById({videoId: data.videoSrc})
            }
        }
    },
    onClose($modal) {
        if ($($modal).find('iframe').length) {
            player[$($modal).find('.video__frame')[0].id].pauseVideo();
        }
    },
})

