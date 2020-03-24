let nbArt = document.querySelector('.indic__nb');
let nbTotArt = parseInt(document.querySelector('.indic__nb-max').textContent);
let widthBar = document.querySelector('.indic__bg').offsetWidth;
let progressBar = document.querySelector('.indic__progress');
let prevBtn = document.querySelector('.arrow-prev')
let nextBtn = document.querySelector('.arrow-next')

document.addEventListener('DOMContentLoaded', () => {
    anime.timeline({
            easing: 'easeOutExpo'
        })
        .add({
            targets: '.project *',
            translateX: [-100, 0],
            opacity: [0, 1],
            delay: (el, l, i) => {
                return i * 200
            }
        })
        .add({
            targets: '.menu',
            translateX: ['100%', 0],
            opacity: [0, 1],
            duration: 800
        }, "-=300")
        .add({
            targets: '.container',
            width: [0, '100%'],
            paddingLeft: [0, '40px'],
            paddingRight: [0, '40px'],
            duration: 700,
            delay: function (el, i, l) {
                return i * 300;
            }
        }, '-=300')
        .add({
            targets: '.indic div',
            translateY: ['100%', 0],
            opacity: [0, 1],
            duration: 800,
            delay: function (el, i, l) {
                return i * 150;
            }
        }, '-=100')
        .add({
            targets: '.description *',
            translateY: [30, 0],
            opacity: [0, 1],
            delay: function (el, i, l) {
                return i * 100;
            }
        }, "-=500")
        .add({
            targets: '.bgfull',
            translateX: ['-20%', 0],
            opacity: [0, 1],
            delay: 200,
            duration: 600,
        }, "-=800")
        .add({
            targets: '.image',
            height: [0, '100%'],
        }, "-=500")
        .add({
            targets: '.arrow',
            translateY: ["100%", 0],
            opacity: [0, 1]
        })


    progressBar.style.width = `${(1 / nbTotArt) * widthBar}px`;
})

nextBtn.addEventListener('mouseenter', e => {
    arrowAnim([1, 1.2], e.target)
})
nextBtn.addEventListener('mouseleave', e => {
    arrowAnim([1.2, 1], e.target)
})
prevBtn.addEventListener('mouseenter', e => {
    arrowAnim([1, 1.2], e.target)
})
prevBtn.addEventListener('mouseleave', e => {
    arrowAnim([1.2, 1], e.target)
})

const arrowAnim = (grow, el) => {
    anime({
        targets: el,
        scale: grow,
    })
}

const WrongIndex = () => {
    anime({
        targets: nbArt,
        translateX: [-5, 5],
        direction: 'alternate',
        loop: 3,
        duration: 50,
        easing: 'easeInExpo',
        complete: function (anim) {
            nbArt.style.transform = 'translateX(0)'
        }
    })
}

nextBtn.addEventListener('click', () => {
    let number = parseInt(nbArt.textContent);
    if (number < nbTotArt) {
        nbArt.innerHTML = (number < 9) ? `0${number + 1}` : `${number + 1}`;
        progressBar.style.width = `${((number + 1) / nbTotArt) * widthBar}px`;
        FetchContent(nextBtn, `project-${number + 1}.html`)
    } else {
        WrongIndex()
    }
})

prevBtn.addEventListener('click', () => {
    let number = parseInt(nbArt.textContent);
    if (number > 1) {
        nbArt.innerHTML = (number < 9) ? `0${number - 1}` : `${number - 1}`;
        progressBar.style.width = `${((number - 1) / nbTotArt) * widthBar}px`;
        FetchContent(nextBtn, `project-${(number - 1) === 1 ? 'index' : number - 1}.html`)
    } else {
        WrongIndex()
    }
})

function FetchContent(link, page) {
    let baseURL = `${window.location.protocol}//${window.location.hostname}:${(window.location.port) ? window.location.port : '80'}/${window.location.pathname.substring(1, window.location.pathname.lastIndexOf('/'))}`
    console.log(baseURL);

    fetch(`${baseURL}/${page}`)
        .then(response => response.text())
        .then(html => {

            let doc = new DOMParser().parseFromString(html, 'text/html')

            anime.timeline({
                    easing: 'easeOutExpo',
                    complete: function (anim) {
                        document.querySelector('.project').remove()
                        document.querySelector('.description').remove()
                        document.querySelector('.bgfull').remove()
                    }
                })
                .add({
                    targets: [".bgfull", ".description *"],
                    translateY: '100%',
                    duration: 700,
                    opacity: 0,
                    delay: (el, l, i) => {
                        return i * 150
                    }
                })
                .add({
                    targets: '.project',
                    translateX: "-50%",
                    opacity: 0,
                    duration: 500
                }, "-=200")
            setTimeout(() => {
                document.querySelector('#app').insertBefore(doc.querySelector('.project'), document.querySelector('.arrow'))
                document.querySelector('#app').insertBefore(doc.querySelector('.description'), document.querySelector('.image'))
                document.querySelector('#app').insertBefore(doc.querySelector('.bgfull'), document.querySelector('.menu'))
                anime.timeline({
                        easing: 'easeOutExpo',
                    })
                    .add({
                        targets: '.project',
                        translateX: ["-50%", 0],
                        opacity: [0, 1],

                    })
                    .add({
                        targets: [".bgfull", ".description *"],
                        translateY: ['100%', 0],
                        opacity: [0, 1],
                        delay: (el, l, i) => {
                            return i * 150
                        }
                    }, "-=200")

            }, 1500)

        })
}