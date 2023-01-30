

document.addEventListener("DOMContentLoaded", function() {

    @@include("utility/index.js",{})
    @@include("components/index.js",{})
    //*
    @@include("modules/index.js",{})
    //*
    @@include("form/control.js",{})
    @@include("form/input.js",{})
    @@include("form/file.js",{})
    @@include("form/ajax.js",{})

    @@include("plugins/lazy.js",{})

    @@include("section/index.js",{})
    
    @@include("template/index.js",{})

    @@include("preloader.js",{})
});
