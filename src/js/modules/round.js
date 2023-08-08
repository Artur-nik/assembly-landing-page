import { parseDataList } from "../utility/parseDataList";
//*

//*
$('[data-round]').each((index, $root)=> {
    //*
    const data =  parseDataList($root.dataset.round)[0]
    //*
    const roundPrimary = Number(data[0])
    const roundSecondary = Number(data[1])
    const roundRound = Number(data[2]) || 1
    const roundDuration = Number(data[3]) || 3000

    ScrollTrigger.create({
        trigger: $root,
        start:  "center 95%",
        onEnter: () => {
            console.log(data, roundSecondary, data[1]);
            anime({
                targets: $root,
                innerHTML: [roundPrimary, roundSecondary],
                easing: 'linear',
                round: roundRound,
                duration: roundDuration
            });
        },
        once: true,
        markers: false
    })
})

