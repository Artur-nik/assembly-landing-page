import gulp from "gulp"
const { src, dest, parallel, series, watch } = gulp
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import browserSync from "browser-sync";
import del from "del";
import gcmq from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import fileinclude from "gulp-file-include";
import cssnano from "gulp-cssnano";
import concat from "gulp-concat";
import svgmin from "gulp-svgmin";
import svgSprite from "gulp-svg-sprite";
import cheerio from "gulp-cheerio";
import replace from "gulp-replace";
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import * as esbuild from "esbuild";
import parseHTMLClass from "./core/parseHTMLClass.js";
import addFilePage from "./core/pages.js";
import addFileComponents from "./core/components.js";
import addFileTemplate from "./core/template.js";

//* src  -  файлы разработки

let way = "app";
if (process.argv.includes('--build')) {
    way = "dist";
}
//*
global.app = {
    page: []
}

let isDemo = false
//? 
if (process.argv.includes('--demo')) {
    isDemo = true
}
//*
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
        php:            "./src/form/*.php",
        PHPMailer:      "./src/assets/PHPMailer/**/*",
        css:            "./src/assets/css/*css",
        scss:           "./src/scss/*scss",
        files:          "./src/assets/files/**/*",
        
        //*       
        js_main:        [
                            "./src/js/main.js",
                        ],
        js_libraries:   [
                            "./src/assets/libraries/jquery.min.js",
                            "./src/assets/libraries/lazyload.min.js",
                            "./src/assets/libraries/swiper.min.js",
                            "./src/assets/libraries/jquery.maskedinput.min.js",
                            //"./src/assets/libraries/anime.min.js",
                            //"./src/assets/libraries/fancybox.umd.js",
                            //"./src/assets/libraries/gsap.min.js",
                            //"./src/assets/libraries/ScrollTrigger.min.js",
                            //"./src/assets/libraries/jquery.event.move.js",
                            //"./src/assets/libraries/jquery.nice-select.min.js",
                            //"./src/assets/libraries/jquery.twentytwenty.js",
                            //"./src/assets/libraries/simplebar.min.js",
                            "./src/assets/libraries/wow.js"
                        ],
        js_dist:           "./src/assets/js/*js",

        images:         [
                            "./src/images/**/*",
                            "!" + "./src/images/webp/**/*",
                        ],
        imagesWebp:     "./src/images/webp/**/*",
        favicon:        "./src/assets/favicon/*",
        svg:            "./src/icon/*.svg",
    },
    watch: {
        html:           [
                            "./src/template/**/*.html",
                            "./src/pages/**/*.html"
                        ],
        php:            "./src/form/*.php",
        css:            "./src/assets/css/*css",
        scss:           [
                            "./src/scss/**/*.scss", 
                            "./src/components/**/*.scss",
                            "./src/template/**/*.scss",
                            "./src/pages/**/*.scss",
                        ],

        files:          "./src/assets/files/**/*",

        js_main:        [
                            "./src/js/**/*.js", 
                            "./src/components/**/*.js",
                            "./src/template/**/*.js",
                            "./src/pages/**/*.js",
                        ],
        js_libraries:   "./src/assets/libraries/*js",
        js_dist:        "./src/assets/js/*js",

        img:            "./src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,mp4,mov}",
        svg:            "./src/icon/*.svg",
    },
    fonts:{
        src:            "./src/assets/fonts/src/*.ttf",
        dest:           "./src/assets/fonts/dest/",
        buildSrc:       "./src/assets/fonts/dest/*.{woff,woff2}",
        build:          way + "/fonts/",
    },
    clean: [
                        way + "/*",
                        way + "/css/",
                        way + "/fonts/",
                        way + "/images/",
                        way + "/js/main/",
                        way + "/assets/libraries/",
                        way + "/js/dist/",
                        way + "/svg-sprite/",
                        way + "/favicon/",
                        way + "/files/",
    ],
    cleanimg:           way + "/images/**/*",
    demo: {
        src: "./core/demo/index.html",
    } 
}

const _Browserslist = [
    ">0.5%",
    "last 4 versions",
    "edge <= 79",
    "not ie <= 11", 
    "not ie_mob > 0",  
    "ff >= 52",
    "chrome >= 61",
    "opera >= 60",
    "safari >= 12.1",
    "ios >= 12.2",
]

const browserslistrcJS = [
    "es6",
    "chrome61",
    "edge79",
    "firefox52",
    "safari12",
]

// Определяем логику работы Browsersync
function browser_sync() {
    browserSync.init({ 
        server: {
            baseDir: way,
            index:'index.html'
        },
        //proxy: 'job-app-1',
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
    return src(app.page)
    .pipe(fileinclude()) // сборка html файлов
    .pipe(parseHTMLClass('src/scss/modifiers/_create.g.scss'))
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}
//  
function demoHtml() {
    return src(path.demo.src)
    .pipe(fileinclude()) // сборка html файлов
    .pipe(parseHTMLClass('src/scss/modifiers/_create.g.scss'))
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
    return esbuild.build({
        entryPoints: path.src.js_main,
        //entryNames: '[name]',
        bundle: true,
        minify: process.argv.includes('--build') ? true : false,
        outdir: path.build.js_main,
        target: browserslistrcJS
    })
    .then(browserSync.reload())
}
function js_libraries() {
    return src(path.src.js_libraries)
    .pipe(concat("libraries.js"))        
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
    watch('./src/components/components.json',   {ignorePermissionErrors: true}, addFileComponents); 
    watch('./src/template/template.json',       {ignorePermissionErrors: true}, addFileTemplate); 
    if (isDemo) {
        watch('./core/demo/*.html',          {ignorePermissionErrors: true}, demoHtml);   
    }
    else {
        watch('./src/pages/pages.json',             {ignorePermissionErrors: true}, addFilePage);  
        watch(path.watch.html,                      {ignorePermissionErrors: true}, html);   
    }
    watch(path.watch.scss,          {ignorePermissionErrors: true}, styles);    
    watch(path.watch.css,           {ignorePermissionErrors: true}, css);       
    watch(path.watch.js_main,       {ignorePermissionErrors: true}, js_main);   
    watch(path.watch.js_libraries,  {ignorePermissionErrors: true}, js_libraries);   
    watch(path.watch.js_dist,       {ignorePermissionErrors: true}, js_dist);   
    watch(path.watch.php,           {ignorePermissionErrors: true}, php);      
    watch(path.watch.img,           {ignorePermissionErrors: true}, images);   
    watch(path.watch.svg,           {ignorePermissionErrors: true}, svg);
    watch(path.watch.files,         {ignorePermissionErrors: true}, files);
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
            //$("[fill]").removeAttr("fill");
            //$("[stroke]").removeAttr("stroke");
            //$("[style]").removeAttr("style");
            $("[xmlns]").removeAttr("xmlns");
        },
        parserOptions: {xmlMode: true}
    }))
    .pipe(replace("&gt;", ">"))
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "../sprite.svg",
                example: true
            }
        },
        svg: {
            xmlDeclaration: false,
            namespaceClassnames: false
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
const FONT =    series(fontsWoff, fontsWoff2);
const BUILD =   series(cleandest, favicon, fontsBuild, addFileTemplate, addFileComponents, addFilePage, stylesBuild, css, files, js_main, js_libraries, js_dist, html, php, PHPMailer, imagesDel, images, svg);
const DEMO =    series(cleandest, favicon, fontsBuild, addFileTemplate, addFileComponents, addFilePage, demoHtml, php, PHPMailer, imagesDel, images, svg, files, styles, css, js_main, js_libraries, js_dist, parallel(browser_sync, startwatch));
const DEV =     series(cleandest, favicon, fontsBuild, addFileTemplate, addFileComponents, addFilePage, html, styles, css, js_main, js_libraries, js_dist, php, PHPMailer, imagesDel, images, svg, files, parallel(browser_sync, startwatch));
export { 
    FONT,
    BUILD,
    DEMO
}

gulp.task("default", DEV)