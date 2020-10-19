document.addEventListener('DOMContentLoaded', function(){
    //Прилипающий header при скроле
    if (document.querySelector('.header')) {

        const offset = 300;

        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            const body = document.querySelector('body');
            const activeClass = 'header--active';

            if (pageYOffset > offset) {
                if (!header.classList.contains(activeClass)) {
                    header.classList.toggle(activeClass);
                    body.style.paddingTop = header.offsetHeight + 'px';
                }
            } else {
                if (header.classList.contains(activeClass)) {
                    header.classList.toggle(activeClass);
                    body.style.paddingTop = 0;
                }
            }
        });
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

    console.log('X: ' + (window.screen.width- document.querySelector('.menu__button').getBoundingClientRect().x) + ' Y: ' + document.querySelector('.header .menu__button').getBoundingClientRect().y);

});