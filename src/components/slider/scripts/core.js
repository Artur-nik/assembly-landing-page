function _slider() {
    document.querySelectorAll('.slider').forEach(slider => {
        const sliderInit = slider.querySelector('.slider-init');
        let sliderConfig = {
            slidesPerView: 1,
            spaceBetween: 25,
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
                nextEl: slider.querySelector('.slider-button-next'),
                prevEl: slider.querySelector('.slider-button-prev'),
            },
            pagination: {
                el: slider.querySelector('.slider-pagination'),
                type: 'bullets',
                clickable: true,
            },
            
            //*
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 2
            },
        };

        if (slider.dataset.config) {
			let sliderDataConfig = slider.dataset.config.split(',');
            function sliderData(element, callback) {
                if (sliderDataConfig.find(el => el.trim() == element)) {
                    callback();
                }
            }
            sliderData('addClassGrid-lg', ()=> {
                if (window.screen.width >= 1024) {
                    sliderConfig = false;
                    $(sliderInit.querySelector('[data-wrapper]')).addClass('grid')
                    $(sliderInit.querySelector('[data-wrapper]')).removeClass('swiper-wrapper')
                    $(sliderInit.querySelectorAll('[data-slide]')).removeClass('swiper-slide')
                    $(sliderInit).removeClass('swiper') 
                }
                else {
                    $(sliderInit.querySelector('[data-wrapper]')).removeClass('grid')
                    $(sliderInit.querySelector('[data-wrapper]')).addClass('swiper-wrapper')
                    $(sliderInit.querySelectorAll('[data-slide]')).addClass('swiper-slide')
                    $(sliderInit).addClass('swiper')
                }
            });
		} 

        if (sliderInit.swiper) {
            if (sliderInit.querySelector('[data-wrapper]')) sliderInit.querySelector('[data-wrapper]').removeAttribute('style');
            if (sliderInit.querySelectorAll('[data-slide]')) sliderInit.querySelectorAll('[data-slide]').forEach(element => element.removeAttribute('style'));
            sliderInit.swiper.detachEvents();
            sliderInit.swiper.destroy();      
        }
        
        if(sliderConfig) new Swiper(sliderInit, sliderConfig); 
    });
    window.addEventListener('resize', _slider);
};
_slider();