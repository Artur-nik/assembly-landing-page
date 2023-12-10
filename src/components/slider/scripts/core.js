import { addZero } from "../../../js/utility/addZero";
import { Units } from "../../../js/utility/units";

let sliderWidth = window.innerWidth
function _slider(e) {
    if (e) {
        if (sliderWidth === e.target.innerWidth) return
        else sliderWidth = e.target.innerWidth
    }
    document.querySelectorAll('[data-slider]').forEach(slider => {
        //
        const units = new Units(slider, (item)=> item.dataset.slider === undefined)
        const $unit = units.init()

        const $sliderInit = $unit('#init')[0];
        if (!$sliderInit) return
        //*
        const $wrapper = $unit('#wrapper')[0];
        const $slides = $unit('slide');

        let sliderConfig = {
            slidesPerView: 1,
            spaceBetween: 10,
            watchOverflow: true,
            simulateTouch: false,
            //*
            //autoHeight:true,

            //*
            //breakpoints: {
            //    1024: {
            //        slidesPerView: 2,
            //        spaceBetween: 20
            //    },
            //},
            //*
            navigation: {
                nextEl: $unit('#next'),
                prevEl: $unit('#prev'),
            },
            pagination: {
                el: $unit('#pagination'),
                type: 'bullets',
                clickable: true,
            },
            
            //*
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 2
            },
        };
  

		let sliderDataConfig = slider.dataset.config.split(',') || undefined;
        
        function sliderData(element, callback) {
            if (sliderDataConfig && sliderDataConfig.find(el => el.trim() == element)) {
                callback();
            }
        }
            
        //*
        //*  sliderData('addClassGrid-lg', ()=> { 
        //*      if (window.screen.width >= 1024) {
        //*          sliderConfig = false;
        //*          $($wrapper).addClass('grid')
        //*          $($wrapper).removeClass('swiper-wrapper')
        //*          $($slides).removeClass('swiper-slide')
        //*          $($sliderInit).removeClass('swiper') 
        //*      }
        //*      else {
        //*          $($wrapper).removeClass('grid')
        //*          $($wrapper).addClass('swiper-wrapper')
        //*          $($slides).addClass('swiper-slide')
        //*          $($sliderInit).addClass('swiper')
        //*      }
        //*  });

        //* sliderData('1-2', ()=> {  
        //*     sliderConfig.breakpoints = {
        //*         768: {
        //*             slidesPerView: 2,
        //*             spaceBetween: 20
        //*         },
        //*     }
        //* });

        //* sliderData('1-2-3', ()=> {  
        //*     sliderConfig.breakpoints = {
        //*         1024: {
        //*             slidesPerView: 3,
        //*             spaceBetween: 30
        //*         },
        //*         768: {
        //*             slidesPerView: 2,
        //*             spaceBetween: 20
        //*         },
        //*     }
        //* });

        //* sliderData('loop', ()=> {  
        //*     sliderConfig.loop = true
        //* });

        //* sliderData('observe', ()=> {
        //*     sliderConfig.observeParents = true
        //*     sliderConfig.observer = true
        //* })

        //* sliderData('autoHeight-lg-max', ()=> {
        //*     if (window.screen.width < 1024) {
        //*         sliderConfig.autoHeight =  true;
        //*     }
        //*     window.addEventListener("load", ()=> {
        //*         if ($sliderInit.swiper) {
        //*             $sliderInit.swiper.updateAutoHeight()
        //*         }
        //*     })
        //* });


        //* sliderData('fade', ()=> {
        //*     sliderConfig.effect = 'fade'
        //*     sliderConfig.fadeEffect = {
        //*         crossFade: true
        //*     }
        //* })

        //* sliderData('pagination-fraction', ()=> {  
        //*     sliderConfig.pagination = {
        //*         el: $unit('#pagination'),
        //*         type: 'fraction',
        //*         formatFractionCurrent: addZero,
        //*         formatFractionTotal: addZero,
        //*     }
        //* });

        //* sliderData('nested', ()=> {
        //*     sliderConfig.nested = true
        //* })
        

        if ($sliderInit.swiper) {
            if ($wrapper) $wrapper.removeAttribute('style');
            if ($slides) $slides.forEach(element => element.removeAttribute('style'));
            $sliderInit.swiper.detachEvents();
            $sliderInit.swiper.destroy();      
        }
        
        if(sliderConfig) new Swiper($sliderInit, sliderConfig); 
    });
    window.addEventListener('resize', _slider);
};
_slider();