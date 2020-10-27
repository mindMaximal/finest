import './scss/main.scss'
import Glide from '@glidejs/glide'
import Accordion from './js/Accordion'
import Scroll from "./js/Scroll";
import Header from "./js/Header";
import Tabs from "./js/Tabs";

document.addEventListener('DOMContentLoaded', function(){
    //Прилипающий header при скроле
    if (document.querySelector('.header')) {
        const header = new Header('.header');
    }

    //Мобильное меню
    if (document.querySelector('.menu')) {

        const menu = document.querySelector('.menu');
        const menuButtons = document.querySelectorAll('.menu__button');

        menuButtons.forEach(el => {
            el.addEventListener('click', function () {
                menuButtons.forEach(el => el.classList.toggle('menu__button--active'));
                menu.classList.toggle('menu--active');
            });
        });
    }

    //Sliders
    if (document.querySelector('.services__slider')) {
        const servicesSlider = new Glide('.services__slider', {
            type: 'carousel',
            focusAt: 0,
            animationDuration: 1000,
            perView: 4,
            gap: 50,
            autoplay: 2000,
            breakpoints: {
                1280: {
                    perView: 3
                },
                900: {
                    perView: 2,
                    focusAt: 'center'
                },
                600: {
                    perView: 1
                }
            },
        });

        document.querySelector('.services__arrow--prev').addEventListener('click', function () {
            servicesSlider.go('<');
        });

        document.querySelector('.services__arrow--next').addEventListener('click', function () {
            servicesSlider.go('>');
        });

        servicesSlider.mount();
    }

    if (document.querySelector('.partners__slider')) {
        const partnersSlider = new Glide('.partners__slider', {
            type: 'carousel',
            focusAt: 0,
            animationDuration: 1000,
            perView: 3,
            gap: 50,
            autoplay: 2000,
            hoverpause: false,
            breakpoints: {
                900: {
                    perView: 2,
                    focusAt: 'center'
                },
                600: {
                    perView: 1
                }
            },
        });

        document.querySelector('.partners__arrow--prev').addEventListener('click', function () {
            partnersSlider.go('<');
        });

        document.querySelector('.partners__arrow--next').addEventListener('click', function () {
            partnersSlider.go('>');
        });

        partnersSlider.mount();
    }

    if (document.querySelector('.feedback__slider')) {
        const feedbackSlider = new Glide('.feedback__slider', {
            type: 'slider',
            focusAt: 'center',
            startAt: 1,
            animationDuration: 1000,
            perView: 3,
            gap: 50,
            //autoplay: 2000,
            breakpoints: {
                900: {
                    perView: 1,
                    focusAt: 'center'
                },
                600: {
                    perView: 1
                }
            },
        });

        const dots = document.querySelector('.feedback__bullets');

        for (let i = 0; i < document.querySelectorAll('.feedback__slider .feedback__slide').length; i++) {
            const button = document.createElement('button');
            button.classList.add('feedback__bullet');

            if (i === 1) {
                button.classList.add('glide__bullet--active');
            }

            button.setAttribute('data-glide-dir', `=${i}`);

            dots.appendChild(button);
        }

        feedbackSlider.mount();
    }

    //Scroll to anchor
    const croll = new Scroll();

    //Accordion
    if (document.querySelector('.accordion')) {
        const faqAccordion = new Accordion('.accordion');
    }

    //Tabs
    if (document.querySelector('.price__tabs')) {
        const priceTabs = new Tabs('.price__tabs');
    }
});