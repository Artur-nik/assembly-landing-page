import { parseDataList } from "../utility/parseDataList";
//*
//* "./src/assets/libraries/anime.min.js",
//* "./src/assets/libraries/gsap.min.js",
//* "./src/assets/libraries/ScrollTrigger.min.js",
//*
$('[data-round]').each((index, $root)=> {
    //*
    const data =  parseDataList($root.dataset.round)[0]
    //*
    const roundPrimary = Number(data[0])
    const roundSecondary = Number(data[1]) || 0
    const roundRound = Number(data[2]) || 1
    const roundDuration = Number(data[3]) || 3000

    ScrollTrigger.create({
        trigger: $root,
        start:  "center 95%",
        onEnter: () => {
            anime({
                targets: $root,
                innerHTML: [roundSecondary, roundPrimary],
                easing: 'linear',
                round: roundRound,
                duration: roundDuration
            });
        },
        once: true,
        markers: false
    })
})

