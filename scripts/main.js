'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Angus = function () {
    function Angus() {
        _classCallCheck(this, Angus);

        this.initValidation();
        this.initScrollEvents();
    }

    _createClass(Angus, [{
        key: 'initValidation',
        value: function initValidation() {
            var form = document.getElementById('contact-form');
            var text_inputs = form.querySelectorAll('input[type=text], input[type=email], textarea');
            var toggle_label = function toggle_label(e) {
                if (e.target.value.length) {
                    e.target.classList.add('has-text');
                } else {
                    e.target.classList.remove('has-text');
                }
            };
            if (text_inputs.length) {
                text_inputs.forEach(function (input) {
                    input.addEventListener('input', toggle_label);
                });
            }
        }
    }, {
        key: 'initScrollEvents',
        value: function initScrollEvents() {
            var main_nav = document.querySelector('.main-nav');
            var nav_links = main_nav.children;
            var animate_in_elements = document.querySelectorAll('footer.footer > *');
            var calculate_offsets = function calculate_offsets() {
                var elements = [];
                if (nav_links.length) {
                    for (var i = 0; i < nav_links.length; i++) {
                        var element = nav_links[i];
                        var target = document.querySelector(element.getAttribute('data-spy'));
                        elements.push({
                            name: element.textContent,
                            link: element,
                            element: target,
                            offset_top: target.offsetTop - window.innerHeight
                        });
                    }
                }
                return elements;
            };
            var spy_elements = calculate_offsets();

            /* Init scroll spy */
            if (nav_links.length) {
                var _loop = function _loop(i) {
                    var element = nav_links[i];
                    var target = document.querySelector(element.getAttribute('data-spy'));
                    element.addEventListener('click', function (e) {
                        e.preventDefault();
                        window.scrollTo({
                            top: target.offsetTop - (window.innerHeight - target.clientHeight) / 2,
                            behavior: 'smooth'
                        });
                    });
                };

                for (var i = 0; i < nav_links.length; i++) {
                    _loop(i);
                }
            }

            /* On scroll */
            window.addEventListener('scroll', function (e) {
                /* Sticky Nav */
                if (window.scrollY > 0) {
                    main_nav.classList.add('sticky');
                } else {
                    main_nav.classList.remove('sticky');
                }
                /* Scroll Spy */
                var current_spy = spy_elements.filter(function (i) {
                    return window.scrollY > i.offset_top;
                }).pop();
                if (nav_links.length) {
                    for (var i = 0; i < nav_links.length; i++) {
                        var element = nav_links[i];
                        element.classList.remove('active');
                    }
                }
                current_spy.link.classList.add('active');
                /* Animate In */
                for (var _i = 0; _i < animate_in_elements.length; _i++) {
                    var _element = animate_in_elements[_i];
                    if (_element.getBoundingClientRect().y < window.innerHeight) {
                        _element.classList.add('slide-fade-in');
                    }
                }
            });
            window.addEventListener('resize', function (e) {
                spy_elements = calculate_offsets();
            });
            window.dispatchEvent(new Event('scroll'));
        }
    }]);

    return Angus;
}();

window.angus = new Angus();
//# sourceMappingURL=main.js.map
