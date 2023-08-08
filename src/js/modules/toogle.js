//* <button data-toggle="text">test toggle default</button> 
//* <button data-toggle="text, show">test show</button>
//* <button data-toggle="text, fadeToggle, 1000">test fadeToggle</button>
//* <button data-toggle="text, fadeToggle, 1000, active">test fadeToggle</button>
//* <div data-toggle-box="text"></div>

//TODO config (проверка ошибок) (?)

$('[data-toggle]').each((index, $toggle)=>{
    //*
    toggle($toggle)
    //*
})
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
function toggle($root) {
    if ($root.__toggle) return
    $root.__toggle = true
    //*
    if ($root.dataset.toggle.includes(';')) {
        const configs = $root.dataset.toggle.split(';')
        configs.forEach(config => {
            config = config.split(',')            
            toggleBox(config)
        });
    }
    else {
        const config = $root.dataset.toggle.split(',')
        toggleBox(config)
    }
    //*
    function toggleBox(config) {
        const box = $($root).parents('[data-toggle-wrapper]').length ? 
                        $($root).parents('[data-toggle-wrapper]').find(`[data-toggle-box="${config[0].trim()}"]`) : 
                            $(`[data-toggle-box="${config[0].trim()}"]`)
        const effect = config[1] || 'toggle'
        const duration = config[2] || 400
        const toggleClass = config[3] || null
      
        if(box.length) {
            //*
            function toggleClick() {
                effectList[effect.trim()](box, duration)
                if (toggleClass) $($root).toggleClass(toggleClass)
            }
            $($root).click(toggleClick);
        }
    }
}