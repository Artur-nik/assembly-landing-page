

document.addEventListener("DOMContentLoaded", function() {

    @@include("utility/variables.js",{})
    @@include("utility/slider.js",{})

    @@include("form/control.js",{})
    @@include("form/field.js",{})
    @@include("form/file.js",{})
    @@include("form/phone.js",{})
    @@include("form/textarea.js",{})    
    @@include("form/ajax.js",{})

    @@include("plugins/lazy.js",{})
    @@include("plugins/menu.js",{})
    @@include("plugins/modal.js",{})
    @@include("plugins/scroll.js",{})
    @@include("plugins/questions.js",{})
    
    @@include("template.js",{})
    
    @@include("preloader.js",{})
});
