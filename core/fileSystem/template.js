//*
export function styleTemplate(name) {
    return `.${name} { 
    position: relative;
    border-top: 1px solid #000;
    min-height: 100vh;
}`;
}
//*
export function sectionTemplate(name) {
    return `<section id="${name}" class="${name}">
    <div class="container">
        <h2 class="${name}__title title title--size-"></h2>
    </div>
</section>`;
}

//*
export function pageTemplate(name) {
    return `<!DOCTYPE html>
<html lang="ru-RU">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${name}</title>
    <meta name="description" content="">

    @@include("../../template/base/favicon.html",{})

    <meta property="og:title" content="" />
    <meta property="og:description"  content="" />
    <meta property="og:url" content="" />
    <meta property="og:image" content="images/global/soc.jpg" />

    <link rel="stylesheet" type="text/css" href="css/main.css">
    
    <meta name="format-detection" content="telephone=no">
    
    @@include("../../template/base/head-bottom.html",{})
</head>
<body>

    <!-- @@include("../../template/base/preloader.html",{}) -->
    @@include("../../template/menu-modal/menu-modal.html",{})

    @@include("../../template/header/header.html",{})
    
    @@include("_include.g.html",{})

    @@include("../../template/footer/footer.html",{})

    @@include("../../template/modal/modal-form/modal-form.html",{})
    @@include("../../template/modal/modal-video/modal-video.html",{})

    <script src="js/libraries/libraries.js"></script>
    <script defer src="js/main/main.js"></script>
    @@include("../../template/base/body-bottom.html",{})
</body>
</html>`;
}