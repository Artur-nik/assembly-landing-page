/*
    data-parallax="y: 1rem, x: 1rem, scrub, marker"
*/
//*
ScrollTrigger.matchMedia({
    // desktop
    "(min-width: 1024px)": function() {
        document.querySelectorAll('[data-scroll-item]').forEach(element => {
            const parallaxDataConfig = element.dataset.scrollItem.split(',');
            //*
            let animationConfig = {};
            if(parallaxDataConfig[0].trim().length) {
                parallaxDataConfig.forEach(Element => { 
                    const arrElement = Element.split(':');
                    if ( arrElement.length === 2) {
                        animationConfig[arrElement[0].trim()] = arrElement[1].trim() || null;
                    }
                    if ( arrElement.length === 1) {
                        animationConfig[arrElement[0].trim()] = true;
                    }
                });
            }
            //*
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 100%",
                    end:  "bottom ",
                    scrub: animationConfig.scrub || 1,
                    markers: animationConfig.marker || false
                },
                y: animationConfig.y || 0,
                x: animationConfig.x || 0
            });
        });  
    }
});