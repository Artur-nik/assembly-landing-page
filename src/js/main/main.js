

document.addEventListener("DOMContentLoaded", function() {

    @@include("utility/index.js",{})


    @@include("form/config.js",{})
    @@include("form/control.js",{})
    @@include("form/field.js",{})
    @@include("form/file.js",{})
    @@include("form/phone.js",{})
    @@include("form/textarea.js",{})    
    @@include("form/ajax.js",{})

    @@include("plugins/lazy.js",{})
    @@include("plugins/scroll.js",{})

    @@include("components/index.js",{})

    @@include("section/index.js",{})
    
    @@include("preloader.js",{})
});
