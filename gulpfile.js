const { src, dest, parallel, series, watch } = require('gulp');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const browserSync   = require('browser-sync').create();
const del           = require('del');
const gcmq          = require('gulp-group-css-media-queries');
const autoprefixer  = require('gulp-autoprefixer');
const fileinclude   = require('gulp-file-include');
const uglify        = require('gulp-uglify-es').default;
const cssnano       = require('gulp-cssnano');
const concat        = require('gulp-concat');
const svgmin        = require('gulp-svgmin');
const svgSprite     = require('gulp-svg-sprite');
const cheerio       = require('gulp-cheerio');
const replace       = require('gulp-replace');
const ttf2woff      = require('gulp-ttf2woff');
const ttf2woff2     = require('gulp-ttf2woff2');

//* src  -  файлы разработки

//* src  -  файлы разработки

let way = "app";

let path = {
    build: {
        html:           way + "/",
        php:            way + "/form/",
        PHPMailer:      way + "/PHPMailer/",
        css:            way + "/css/",
        js_main:        way + "/js/main",
        js_libraries:   way + "/js/libraries/",
        js_dist:        way + "/js/dist/",
        images:         way + "/images/",
        imagesWebp:     way + "/images/webp/",
        svg:            way + "/svg-sprite/",
        favicon:        way + "/favicon/",
        files:          way + "/files/",
    },
    src: {
        html:           [
                            "./src/template/*.html", 
                            '!' + "./src/template/**/_*.html"
                        ],
        php:            "./src/form/*.php",
        PHPMailer:      "./src/PHPMailer/**/*",
        css:            "./src/css/*css",
        scss:           "./src/scss/**/*scss",
        files:          "./src/files/**/*",
        
        //*       
        js_main:        [
                            "./src/js/main/main.js",
                        ],
        js_libraries:   [
                            "./src/js/libraries/jquery.min.js",
                            "./src/js/libraries/lazyload.min.js",
                            "./src/js/libraries/swiper.min.js",
                            "./src/js/libraries/jquery.maskedinput.min.js",
                            //"./src/js/libraries/anime.min.js",
                            //"./src/js/libraries/fancybox.umd.js",
                            //"./src/js/libraries/gsap.min.js",
                            //"./src/js/libraries/jquery.event.move.js",
                            //"./src/js/libraries/jquery.nice-select.min.js",
                            //"./src/js/libraries/jquery.twentytwenty.js",
                            //"./src/js/libraries/ScrollTrigger.min.js",
                            //"./src/js/libraries/simplebar.min.js",
                            "./src/js/libraries/wow.js"
                        ],
        js_dist:           "./src/js/dist/*js",

        images:         [
                            "./src/images/**/*",
                            '!' + "./src/images/webp/**/*",
                        ],
        imagesWebp:     "./src/images/webp/**/*",
        favicon:        "./src/favicon/*",
        svg:            "./src/icon/*.svg",
    },
    watch: {
        html:           [
                            "./src/template/*.html", 
                            "./src/template/**/_*.html"
                        ],
        php:            "./src/form/*.php",
        css:            "./src/css/*css",
        scss:           "./src/scss/**/*.scss",

        files:          "./src/files/**/*",

        js_main:        "./src/js/main/**/*.js",
        js_libraries:   "./src/js/libraries/*js",
        js_dist:        "./src/js/dist/*js",

        img:            "./src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,mp4,mov}",
        fonts:          "./src/fonts/**/*",
        svg:            "./src/icon/*.svg",
    },
    fonts:{
        src:            "./src/fonts/src/*.ttf",
        dest:           "./src/fonts/dest/",
        buildSrc:       "./src/fonts/dest/*.{woff,woff2}",
        build:          way + "/fonts/",
    },
    clean: [
                        way + "/*",
                        way + "/css/",
                        way + "/fonts/",
                        way + "/images/",
                        way + "/js/main/",
                        way + "/js/libraries/",
                        way + "/js/dist/",
                        way + "/svg-sprite/",
                        way + "/favicon/",
                        way + "/files/",
    ],
    cleanimg:           way + "/images/**/*",
}

const _Browserslist = [
    '>0.5%',
    'last 4 versions',
    'edge >= 79',
    'not ie > 11', 
    'not ie_mob > 0',  
    'ff >= 52',
    'chrome >= 61',
    'opera >= 60',
    'safari >= 12.1',
    'ios >= 12.2',
]

// Определяем логику работы Browsersync
function browser_sync() {
    browserSync.init({ 
        server: {
            baseDir: way,
            index:'index.html'
        },
        //proxy: 'job-app-8',
        notify: false, // Отключаем уведомления
        online: true, // Режим работы
        open: false
    })
}
//
function favicon() {
    return src(path.src.favicon)
    .pipe(dest(path.build.favicon))
}
//  
function html() {
    return src(path.src.html)
    .pipe(fileinclude()) // сборка html файлов
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}
//  
function php() {
    return src(path.src.php)
    .pipe(dest(path.build.php))
    .pipe(browserSync.stream());
}
function PHPMailer() {
    return src(path.src.PHPMailer)
    .pipe(dest(path.build.PHPMailer))
}

// sass
function styles() {
    return src(path.src.scss)
    .pipe(sass())
    .pipe(gcmq()) 
    .pipe(autoprefixer({
        flexbox: false,
        overrideBrowserslist: _Browserslist}))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}

function stylesBuild(){
    del(path.build.css)
    return src(path.src.scss)
    .pipe(sass())
    .pipe(gcmq())       // сбор медиа запросов
    .pipe(cssnano({ minifyFontValues: false, discardUnused: false })) 
    .pipe(autoprefixer({
        flexbox: false,
        overrideBrowserslist: _Browserslist}))
    .pipe(dest(path.build.css));
}

function css() {
    return src(path.src.css)
    .pipe(dest(path.build.css)) 
    .pipe(browserSync.stream());
}
// end style

// js
function js_main() {
    return src(path.src.js_main)
    .pipe(fileinclude())
    .pipe(concat('main.js'))        // объединяем
    .pipe(uglify())                 // сжимаем
    .pipe(dest(path.build.js_main))      // отправляем
    .pipe(browserSync.stream())
}
function js_libraries() {
    return src(path.src.js_libraries)
    .pipe(concat('libraries.js'))        // объединяем 
    .pipe(dest(path.build.js_libraries)) 
    .pipe(browserSync.stream());
}
function js_dist() {
    return src(path.src.js_dist)
    .pipe(dest(path.build.js_dist)) 
    .pipe(browserSync.stream());
}
// files
function files() {
    return src(path.src.files)
    .pipe(dest(path.build.files)) 
    .pipe(browserSync.stream());
}
// watch
function startwatch() {
    watch(path.watch.scss,          styles);    
    watch(path.watch.css,           css);       
    watch(path.watch.js_main,       js_main);   
    watch(path.watch.js_libraries,  js_libraries);   
    watch(path.watch.js_dist,       js_dist);   
    watch(path.watch.html,          html);      
    watch(path.watch.php,           php);      
    watch(path.watch.img,           images);   
    watch(path.watch.svg,           svg);
    watch(path.watch.files,         files);
}
// fonts
function fontsBuild(){
    return src(path.fonts.buildSrc)
    .pipe(dest(path.fonts.build))
    .pipe(browserSync.stream());
}
function fontsWoff() {
    return src(path.fonts.src)
    .pipe(ttf2woff())
    .pipe(dest(path.fonts.dest));
}
function fontsWoff2() {
    return src(path.fonts.src)
    .pipe( ttf2woff2())
    .pipe(dest(path.fonts.dest));
}
function images() {
    //del(path.cleanimg);
    return src(path.src.images, )
    .pipe(dest(path.build.images))  
    .pipe(browserSync.stream());
}
// 
function imagesDel() {
    return del(path.cleanimg);
}

function imagesWebp(){
    return src(path.src.imagesWebp) 
    //.pipe(webp({
    //    quality:90
    //}))
    .pipe(dest(path.build.imagesWebp)) 
}
// svg
function svg() {
    return src(path.src.svg)    
    .pipe(svgmin({
        js2svg: {
            pretty: true,
            indent: 2,
        } ,
        
        plugins: [{
            cleanupIDs: {
              minify: true
            }
        }]
    }))
    .pipe(cheerio({
        run: function ($) {
            //$('[fill]').removeAttr('fill');
            //$('[stroke]').removeAttr('stroke');
            //$('[style]').removeAttr('style');
            $('[xmlns]').removeAttr('xmlns');
        },
        parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "../sprite.svg",
                example: true
            }
        },
        svg: {
            xmlDeclaration: false,
        }
    }))
    .pipe(dest(path.build.svg))
    .pipe(browserSync.stream());
}
// удаление папки dest
function cleandest() {
    return del(path.clean);
}
//
exports.stylesBuild = stylesBuild;
exports.browser_sync = browser_sync;
exports.html = html;
exports.php = php;
exports.PHPMailer = PHPMailer;
exports.js_main = js_main;
exports.js_libraries = js_libraries;
exports.js_dist = js_dist;
exports.files = files;
exports.styles = styles;
exports.startwatch = startwatch;
exports.cleandest = cleandest;
exports.images = images;
exports.imagesWebp = imagesWebp;
exports.imagesDel = imagesDel;
exports.css = css;
exports.fontsBuild = fontsBuild;
exports.svg = svg;
exports.favicon = favicon;
exports.fontsWoff = fontsWoff;
exports.fontsWoff2 = fontsWoff2;
//
exports.font = series(fontsWoff, fontsWoff2);
exports.build = series(cleandest, favicon, fontsBuild, stylesBuild, css,files, js_main, js_libraries, js_dist, html, php, PHPMailer, series(imagesDel, images), svg);
exports.default = series(cleandest, favicon, fontsBuild, parallel(styles, css, js_main, js_libraries, js_dist, browser_sync, html, php, PHPMailer, series(imagesDel, images), svg,files, startwatch));