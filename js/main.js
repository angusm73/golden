class Angus {

    constructor() {
        this.initValidation()
        this.initScrollEvents()
    }

    initValidation() {
        const form = document.getElementById('contact-form')
        if (!form) return
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
                    if (target) {
                        elements.push({
                            name: element.textContent,
                            link: element,
                            element: target,
                            offset_top: target.getBoundingClientRect().top + window.scrollY - window.innerHeight
                        })
                    }
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
                        top: target.getBoundingClientRect().top + window.scrollY - ((window.innerHeight - target.clientHeight) / 2),
                        behavior: 'smooth'
                    })
                })
            }
        }

        /* On scroll */
        window.addEventListener('scroll', e => {
            /* Sticky Nav */
            if (window.scrollY > 0) {
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
}

window.angus = new Angus