export default class Scroll {

    constructor() {
        this.init();
    }

    init() {
        try {
            const linkNav = document.querySelectorAll('[href^="#"]'),
                speed = .8;

            for (let i = 0; i < linkNav.length; i++) {
                linkNav[i].addEventListener('click', function(e) {
                    e.preventDefault();

                    let w = window.pageYOffset,
                        hash = this.href.replace(/[^#]*(.*)/, '$1');

                    if (hash === '#') {
                        return false;
                    }

                    let t = document.querySelector(hash).getBoundingClientRect().top - document.querySelector('.header').clientHeight,
                        start = null;
                    requestAnimationFrame(step);

                    function step(time) {
                        if (start === null) start = time;
                        let progress = time - start,
                            r = (t < 0 ? Math.max(w - progress / speed, w + t) : Math.min(w + progress / speed, w + t));
                        window.scrollTo(0,r);
                        if (r !== w + t) {
                            requestAnimationFrame(step);
                        } else {
                            location.hash = hash;
                        }
                    }
                }, false);
            }
        } catch (error) {
            console.log(error);
        }
    }
}