function castParallax() {
    window.addEventListener('scroll', () => {
        let top = window.scrollY
        let speed, yPos
        let layers = document.querySelectorAll('.parallax-layer')
        layers.forEach(layer => {
            speed = layer.getAttribute('data-speed')
            yPos = (top * speed / 100)
            layer.setAttribute('style', `transform: translate3d(0px, ${yPos}px, 0px)`)
        })
    })
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))  
}

function onLoadAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                if (entry.target.classList.contains("parallax-section")) {
                    observer.unobserve(entry.target)
                }
            } else {
                entry.target.classList.remove('visible')
            }
        })
    })

    const elements = document.querySelectorAll('section')
    elements.forEach((element) => observer.observe(element))
}

const castObservers = () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry)
                if (entry.target.classList.contains('parallax-section')) {
                    $('.navbar').css({
                        'opacity': '0',
                        'margin-top': '-25px',
                    })
                    $('.map-section').css({
                        'opacity': '0',
                    })
                    $('body').css({
                        'background-color': '#262826',
                        'background-image': 'none'
                    })
                }
                else if (entry.target.classList.contains('map-section')) {
                    $('.parallax-section').css({
                        'opacity': '0',
                    })
                }
            } 
            else {
                if (entry.target.classList.contains('parallax-section')) {
                    $('.navbar').css({
                        'opacity': '1',
                        'margin-top': '0px',
                        'background-color': '#262826',
                        'box-shadow': '1px 1px 4px 0 rgba(0, 0, 0, 0.1);'
                    })
                    $('.map-section').css({
                        'opacity': '1',
                    })
                    $('body').css({
                        'background-color': 'hsla(234,17%,25%,1)',
                        'background-image': 'radial-gradient(at 34% 0%, hsla(201,24%,26%,1) 0px, transparent 50%), radial-gradient(at 0% 63%, hsla(192,21%,39%,1) 0px, transparent 50%),radial-gradient(at 100% 21%, hsla(136,17%,54%,0.42) 0px, transparent 50%)'
                    })
                }
                else if (entry.target.classList.contains('map-section')) {
                    $('.parallax-section').css({
                        'opacity': '1',
                    })
                }
            }
        })
    })
    
    observer.observe(document.querySelector('.parallax-section'))
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
        castParallax()
    }
    onLoadAnimation()
    castObservers()
})