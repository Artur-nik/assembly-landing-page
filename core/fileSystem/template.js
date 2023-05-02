//*
export function styleTemplate(name) {
    return `.${name} { 
    
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
</head>
<body>

    <!-- @@include("../../template/base/preloader.html",{}) -->
    @@include("../../template/menu/menu-modal.html",{})

    @@include("../../template/base/header.html",{})
    
    @@include("_include.g.html",{})

    @@include("../../template/base/footer.html",{})

    @@include("../../template/modal/modal-form-v1.html",{})
    @@include("../../template/modal/modal-video.html",{})

    <script src="js/libraries/libraries.js"></script>
    <script src="js/main/main.js"></script>

</body>
</html>`;
}