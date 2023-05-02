//* <button data-toggle="text">test toggle default</button> 
//* <button data-toggle="text, show">test show</button>
//* <button data-toggle="text, fadeToggle, 1000">test fadeToggle</button>
//* <button data-toggle="text, fadeToggle, 1000, active">test fadeToggle</button>
//* <div data-toggle-box="text"></div>

$('[data-toggle]').each((index, $toggle)=>{
    //*
    toggle($toggle)
    //*
})
//*
//$(document).on("DOMNodeInserted", 'body', function (event) {
//    if ($(event.target).find('[data-toggle]').length) {        
//        $(event.target).find('[data-toggle]').each((index, $toggle)=>{
//            //*
//            toggle($toggle)
//            //*
//        })
//    }
//    if ($(event.target).data('toggle')) {
//        toggle(event.target)
//    }
//    
// });

//*
const effectList = {
    'toggle': (box, duration)=> box.toggle(),
    'show': (box, duration)=> box.show(),
    'hide': (box, duration)=> box.hide(),
    'fadeIn': (box, duration)=> box.fadeIn(Number(duration)),
    'fadeOut': (box, duration)=> box.fadeOut(Number(duration)),
    'fadeToggle': (box, duration)=> box.fadeToggle(Number(duration)),
    'slideDown': (box, duration)=> box.slideDown(Number(duration)),
    'slideUp': (box, duration)=> box.slideUp(Number(duration)),
    'slideToggle': (box, duration)=> box.slideToggle(Number(duration)),
    'addClass': (box, elClass)=> box.addClass(elClass),
    'removeClass': (box, elClass)=> box.removeClass(elClass),
    'toggleClass': (box, elClass)=> box.toggleClass(elClass),
}
//*
function toggle($toggle) {
    if ($toggle.__toggle) {
        return
    }
    $toggle.__toggle = true
    //*
    if ($toggle.dataset.toggle.includes(';')) {
        const configs = $toggle.dataset.toggle.split(';')
        configs.forEach(config => {
            config = config.split(',')            
            toggleBox(config)
        });
    }
    else {
        const config = $toggle.dataset.toggle.split(',')
        toggleBox(config)
    }
    //*
    function toggleBox(config) {
        const box = $($toggle).parents('[data-toggle-wrapper]').length ? 
                        $($toggle).parents('[data-toggle-wrapper]').find(`[data-toggle-box="${config[0].trim()}"]`) : 
                            $(`[data-toggle-box="${config[0].trim()}"]`)
        const effect = config[1] || 'toggle'
        const duration = config[2] || 400
        const toggleClass = config[3] || null
      
        if(box.length) {
            //*
            function toggleClick() {
                effectList[effect.trim()](box, duration)
                if (toggleClass) $($toggle).toggleClass(toggleClass)
            }
            $($toggle).click(toggleClick);
        }
    }
}