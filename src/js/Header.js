export default class Header {

    constructor(selector) {
        this.selector = selector;

        this.init(selector);
    }

    init(selector) {
        const offset = 300;

        window.addEventListener('scroll', el => {
            const header = document.querySelector(selector);
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
}