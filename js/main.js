class Angus {

    constructor() {
        this.initValidation()
        this.initScrollEvents()

        this.stars_in_motion = []
        this.initRedStars()
    }

    initValidation() {
        const form = document.getElementById('contact-form')
        const text_inputs = form.querySelectorAll('input[type=text], input[type=email], textarea')
        const toggle_label = e => {
            if (e.target.value.length) {
                e.target.classList.add('has-text')
            } else {
                e.target.classList.remove('has-text')
            }
        }
        if (text_inputs.length) {
            text_inputs.forEach(input => {
                input.addEventListener('input', toggle_label)
            })
        }
    }

    initScrollEvents() {
        const main_nav = document.querySelector('.main-nav')
        const nav_links = main_nav.children
        const animate_in_elements = document.querySelectorAll('footer.footer > *')
        const calculate_offsets = () => {
            let elements = []
            if (nav_links.length) {
                for (let i = 0; i < nav_links.length; i++) {
                    const element = nav_links[i]
                    const target = document.querySelector(element.getAttribute('data-spy'))
                    elements.push({
                        name: element.textContent,
                        link: element,
                        element: target,
                        offset_top: target.offsetTop - window.innerHeight
                    })
                }
            }
            return elements
        }
        let spy_elements = calculate_offsets()

        /* Init scroll spy */
        if (nav_links.length) {
            for (let i = 0; i < nav_links.length; i++) {
                const element = nav_links[i]
                const target = document.querySelector(element.getAttribute('data-spy'))
                element.addEventListener('click', e => {
                    e.preventDefault()
                    window.scrollTo({
                        top: target.offsetTop - ((window.innerHeight - target.clientHeight) / 2),
                        behavior: 'smooth'
                    })
                })
            }
        }

        /* On scroll */
        window.addEventListener('scroll', e => {
            /* Sticky Nav */
            if (window.scrollY) {
                main_nav.classList.add('sticky')
            } else {
                main_nav.classList.remove('sticky')
            }
            /* Scroll Spy */
            const current_spy = spy_elements.filter(i => window.scrollY > i.offset_top).pop()
            if (nav_links.length) {
                for (let i = 0; i < nav_links.length; i++) {
                    const element = nav_links[i]
                    element.classList.remove('active')
                }
            }
            current_spy.link.classList.add('active')
            /* Animate In */
            for (let i = 0; i < animate_in_elements.length; i++) {
                const element = animate_in_elements[i]
                if (element.getBoundingClientRect().y < window.innerHeight) {
                    element.classList.add('slide-fade-in')
                }
            }
        })
        window.addEventListener('resize', e => {
            spy_elements = calculate_offsets()
        })
        window.dispatchEvent(new Event('scroll'))
    }

    initRedStars() {
        const bgs = document.querySelectorAll('.red-stripe')
        bgs.forEach(bg => {

            let stars = []

            for (let i = 0; i < 40; i++) {
                const star = document.createElement('span')
                star.size = Math.floor(Math.random() * 6) + 4
                star.className = 'star'
                star.style.top = (i * 2.25) + (Math.random() * 4) - 2 + 'vw'
                star.style.width = star.size + 'px'
                star.style.height = star.size + 'px'
                stars.push(star)
                bg.appendChild(star)
            }

            setInterval(() => {
                const available_stars = stars.filter(star => !star.classList.contains('shooting'))
                const star = available_stars[Math.floor(Math.random() * available_stars.length)]
                if (!star) return
                const speed = star.size / 8
                this.shootStar(star, speed)
            }, 50)
        })
    }

    shootStar(star, speed) {
        star.classList.add('shooting')
        setTimeout(() => {
            star.classList.remove('shooting')
        }, 2000)
    }
}

window.angus = new Angus