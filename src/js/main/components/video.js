//*
let player = [];
//*
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//*
function initVideo(id, src) {
    player[id] = new YT.Player(id, {
        height: '100%',
        width: '100%',
        videoId: src,
        events: {
            'onReady': onPlayerReady,
        }

    });
    function onPlayerReady(event) {
        event.target.playVideo();
    }
}
//*
function videoOpen(selector) {
    $(selector).off('click');
    $(selector).click(function(){
        $(this).parent('.video').addClass('_active');
        let srcVideo = $(this).data('video-src');
        let idVideo = $(this).data('video-src') + '-' + Math.floor(Math.random() * (1000000 - 10000 + 1) + 10000);
        $(this).parent('.video').find('.video__frame').attr('id', idVideo);
        initVideo(idVideo, srcVideo);
    })
};
//*
videoOpen('.video__btn');
//*
function pauseVideos(list) {
    list.forEach(element => {
        if ($(element).find('iframe').length && player[$(element).find('iframe').attr('id')].getPlayerState() == 1) {
            player[$(element).find('iframe').attr('id')].pauseVideo();
        }
    });
}
