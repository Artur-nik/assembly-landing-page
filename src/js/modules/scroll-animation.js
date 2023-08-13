//* "./src/assets/libraries/gsap.min.js",
//* "./src/assets/libraries/ScrollTrigger.min.js",

/*
    data-scroll-animation="y: 1rem, x: 1rem, scrub, marker"
*/

import { parseData } from "../utility/parseData";

//*
ScrollTrigger.matchMedia({
    // desktop
    "(min-width: 1024px)": function() {
        document.querySelectorAll('[data-scroll-animation]').forEach($trigger => {
            //*
            const animationConfig =  parseData($trigger.dataset.scrollTrigger);
            //*
            console.log(animationConfig);
            gsap.to($trigger, {
                scrollTrigger: {
                    trigger: document.querySelector(animationConfig.trigger) || $trigger,
                    start: animationConfig.start || "top 100%",
                    end:  animationConfig.end || "bottom",
                    scrub: animationConfig.scrub || 1,
                    markers: animationConfig.marker || false
                },
                y: animationConfig.y || 0,
                x: animationConfig.x || 0
            });
        });  
    }
});