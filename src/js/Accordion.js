export default class Accordion {

    constructor(selector) {
        this.selector = selector;

        this.init(this.selector);
    }

    init(selector) {
        const mainElem = document.querySelector(selector),
            items = mainElem.querySelectorAll('.accordion__item');

        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener('click', function () {

                if (mainElem.querySelector('.accordion__item--open') && mainElem.querySelector('.accordion__item--open') !== this) {
                    mainElem.querySelector('.accordion__item--open .accordion__content').style.maxHeight = null;
                    mainElem.querySelector('.accordion__item--open').classList.remove('accordion__item--open');
                }

                const itemContent = this.querySelector('.accordion__content');

                if (itemContent.style.maxHeight) {
                    itemContent.style.maxHeight = null;
                } else {
                    itemContent.style.maxHeight = itemContent.scrollHeight + "px";
                }

                this.classList.toggle('accordion__item--open');
            });
        }
    }
}
