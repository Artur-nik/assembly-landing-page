//*
let initYoutubeScript = true
//*
function createYoutubeScript(start) {
    //*
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //*
    let checkYTPlayer = setInterval(changeYTPlayer, 250);
    //*
    function changeYTPlayer() {
        if (window.yt && YT && YT.Player && YT.Player) {
            start()
            if (initYoutubeScript) initYoutubeScript = false
            clearInterval(checkYTPlayer);
        }
    }

}
//*
export function videoYoutube($root, data, index) {

    //*
    const frameBox = $($root).find('[data-frame-box]')
    const btn = $($root).find('[data-video-btn]')
    const videoId = $($root).find('[data-video-id]').data('video-id')
    //* 
    const iframeId = 'YT-' + index +  new Date().getTime()
    //*
    const defaultConfig = {
        init: true,
        id: videoId,
        play: false
    }
    const config = Object.assign(defaultConfig, data)
    //*
    $(frameBox).attr('id', iframeId);
    //*
    let player
    function init(_id) {
        if (player) return
        //*
        $($root).addClass('_active');
        //*

        if (initYoutubeScript) {
            createYoutubeScript(()=> {
                player = new YT.Player(iframeId, {
                    height: '100%',
                    width: '100%',
                    videoId: _id,
                    events: {
                        'onReady': (event)=> {
                            event.target.playVideo() 
                        },
                    }
                
                });
            })  
        } 
        else {
            player = new YT.Player(iframeId, {
                height: '100%',
                width: '100%',
                videoId: _id,
                events: {
                    'onReady': (event)=> {
                        event.target.playVideo()
                    },
                }
            
            });
        }
    }
    if (config.play) {
        init(config.id)
    }
    //*
    else if (config.init) {
        $(btn).click(()=> {
            init(config.id)
        })
    } 
    else {
        //? init
        $($root).on('init', (e, data)=> {
            $(btn).click(()=> {
                init(data || config.id)
            })
            $($root).off('init')
        })

        //? initPlay
        $($root).on('initPlay', (e, data)=> {
            init(data || config.id)
            $($root).off('initPlay')
        })
    }
    //? stopVideo
    $($root).on('stopVideo', (e, data)=> {
        if (player) player.pauseVideo()
    })
    //? playVideo
    $($root).on('playVideo', (e, data)=> {
        if (player) player.playVideo()
    })
    //? loadVideoById
    $($root).on('loadVideoById', (e, data)=> {
        if (data && player) player.loadVideoById({videoId: data})
    })
}