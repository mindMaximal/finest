export default class Tabs {

    constructor(selector) {
        this.selector = selector;

        this.init(selector);
    }

    init(selector) {
        const tabs = document.querySelector(selector);
        const buttons = tabs.querySelectorAll('.tabs__button');
        const items = tabs.querySelectorAll('.tabs__item')

        const activeButtonClass = 'tabs__button--open';
        const activeItemClass = 'tabs__item--open';

        buttons.forEach(el => {

            el.addEventListener('click', evt => {

                if (!el.classList.contains(activeButtonClass)) {

                    const index = Array.prototype.slice.call(buttons).indexOf(el);

                    tabs.querySelectorAll('.' + activeButtonClass).forEach(el => {
                        el.classList.toggle(activeButtonClass);
                    });

                    buttons.item(index).classList.toggle(activeButtonClass);

                    tabs.querySelectorAll('.' + activeItemClass).forEach(el => {
                        el.classList.toggle(activeItemClass);
                    });

                    items.item(index).classList.toggle(activeItemClass);

                }

            })

        })
    }
}