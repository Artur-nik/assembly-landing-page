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
            breakpoints: {
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
            },
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
            sliderData('grid', ()=> {
				sliderConfig.slidesPerColumn = 2;
				sliderConfig.slidesPerColumnFill = 'row';
            });
		} 

        if (sliderInit.swiper) {
            sliderInit.querySelector('.swiper-wrapper').removeAttribute('style');
            sliderInit.querySelectorAll('.swiper-slide').forEach(element => element.removeAttribute('style'));
            sliderInit.swiper.detachEvents();
            sliderInit.swiper.destroy();    
        }
        new Swiper(sliderInit, sliderConfig); 
    });
    window.addEventListener('resize', _slider);
};
_slider();