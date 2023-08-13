//* "./src/assets/libraries/gsap.min.js",
//* "./src/assets/libraries/ScrollTrigger.min.js",

ScrollTrigger.matchMedia({
    // desktop
    "(min-width: 1024px)": function() {
        document.querySelectorAll('[data-scroll-image-box]').forEach(imageBox => {
            const imageBoxHeight = imageBox.getBoundingClientRect().height
            const image= imageBox.querySelector('[data-scroll-image]')
            const imageHeight = image.getBoundingClientRect().height
           
            gsap.to(image, {
                scrollTrigger: {
                    trigger: imageBox,
                    start: "top 100%",
                    end:  "bottom ",
                    scrub: 1,
                    markers: false
                },
                y: -(imageHeight - imageBoxHeight - 10),
            });
        });  
    }
});
/* 
<div class="__image-box adaptive-box" data-scroll-image-box>
    <div class="adaptive-box__item">
        <div class="__image adaptive-box" data-scroll-image>
            <img class="adaptive-box__image lazy" data-src="images/" src="images/global/lazyload.png" alt="" loading="lazy"/>
        </div>
    </div>
</div>
*/