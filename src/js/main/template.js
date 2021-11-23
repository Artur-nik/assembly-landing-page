
const templateSlider = new Swiper('.template-slider', {
    slidesPerView: 1,
    //autoHeight:true,
    spaceBetween: 25,
    watchOverflow: true,
    initialSlide:0,
    simulateTouch: false,
    nested: true,
    navigation: {
        nextEl: '.template-slider-btn.swiper-button-next',
        prevEl: '.template-slider-btn.swiper-button-prev',
    },
    pagination: {
        el: '.template-pagination',
        type: 'bullets',
        clickable: true,
    },
});



const Slider1 = new Swiper('.slider-1', {
    slidesPerView: 1,
    spaceBetween: 25,
    watchOverflow: true,
    //simulateTouch: false,
    initialSlide:1,
    //*
    autoHeight:true,
    //*
    navigation: {
        nextEl: '.slider-1 .swiper-button-next',
        prevEl: '.slider-1 .swiper-button-prev',
    },
});

const Slider2 = new Swiper('.slider-2', {
    slidesPerView: 1,
    spaceBetween: 25,
    watchOverflow: true,
   // simulateTouch: false,
    //*
    autoHeight:true,
    //*
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
});

const Slider21 = new Swiper('.slider-2-1', {
    slidesPerView: 1,
    spaceBetween: 25,
    watchOverflow: true,
   // simulateTouch: false,
    //*
    autoHeight:true,
    //*
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        dynamicBullets: true,
        clickable: true,
    },
});


const Slider3 = new Swiper('.slider-3', {
    slidesPerView: 1,
    spaceBetween: 25,
    watchOverflow: true,
    //simulateTouch: false,
    //*
    autoHeight:true,
    //*
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
});

const Slider4 = new Swiper('.slider-4', {
    slidesPerView: 1,
    spaceBetween: 25,
    watchOverflow: true,
    //simulateTouch: false,
    //*
    autoHeight:true,
    //*
    pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
    },
});

const Slider5 = new Swiper('.slider-5', {
    slidesPerView: 1,
    spaceBetween: 25,
    watchOverflow: true,
    //simulateTouch: false,
    //*
    autoHeight:true,
    //*
    pagination: {
        el: '.swiper-pagination',
        //type: 'custom',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },
});

const Slider6 = new Swiper('.slider-6', {
    slidesPerView: 1,
    spaceBetween: 25,
    watchOverflow: true,
    //simulateTouch: false,
    //*
    autoHeight:true,
    //*
    pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
    },
    navigation: {
        nextEl: '.slider-6 .swiper-button-next',
        prevEl: '.slider-6 .swiper-button-prev',
    },
});


const Slider7 = new Swiper('.slider-7', {
    slidesPerView: 1,
    spaceBetween: 25,
    watchOverflow: true,
    //simulateTouch: false,
    //*
    autoHeight:true,
    //*
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
    navigation: {
        nextEl: '.slider-7 .swiper-button-next',
        prevEl: '.slider-7 .swiper-button-prev',
    },
});
