/*
Implement slider using js with options:

number of slides per page
show/hide bulets
show/hide arrows
different transitions
number of slides to transition
continiousTransition\

*/


class Slider {

    constructor(options) {
        this.slider = document.getElementById('slider');
        this.slides = Array.prototype.slice.call(this.slider.getElementsByClassName('slide'));
        this.config = Slider.globalConfig(options);
        this.config.slidesLenth = this.slides.length;

        this.init();
    }

    static globalConfig(options = {}) {

        const defaultSettings = {
            itemsPerPage: 1,
            bullets: false,
            arrows: false,
            transition: '0',
            slidesToTransition: 0,
            continuousTransition: false,
        };

        return Object.assign({}, defaultSettings, options);


    }

    init() {
        const config = this.config;


        (config.bullets && this.renderBullets());
        (config.arrows && this.renderArrows());
        (config.itemsPerPage && this.makeActiveSlides());

    }

    makeActiveSlides(array = this.slides) {
        const config = this.config;
        if (array.length === 1) {
            config.currentVisibleSlides = this.slides.slice();
        }

        // this.wrapActiveSlides(array);
        array.slice(0, config.itemsPerPage).map(item => item.classList.add('visible'));
    }


    addArrowsListeners(prevEl, nextEl) {
        // this.previous(prevEl);
        this.next(nextEl);
    }

    addBulletsListeners(bullets) {
        Array.from(bullets.children).forEach(item=>{
            item.addEventListener('click' ,()=>[
                this.goTo(item.dataset.item)
            ])
        })
    }

    goTo(index){

    }

    next(el) {
        el.addEventListener('click', () => {
            this.getVisibleSlides();
        });
    }

// todo change logic
    getVisibleSlides() {
        let config = this.config;
        let count = config.itemsPerPage;
        const lastItem = this.slides.length - 1;


        const lastVisibleItem = Array.from(this.slider.querySelectorAll('.visible')).pop();
        const lastVisibleItemIndex = this.slides.indexOf(lastVisibleItem);
        const allSlides = this.slides.map(item => {
            item.classList.remove('visible');
            return item;
        });

        let nextBatch;

        if ((lastItem !== lastVisibleItemIndex)) {
            nextBatch = allSlides.slice(lastVisibleItemIndex + 1, lastVisibleItemIndex + 1 + count);

        } else {
            nextBatch = this.slides.slice();
        }

        this.makeActiveSlides(nextBatch);


    }


    renderArrows() {
        const previousArrow = this.createElement('a', ['previous'], '&#10094;');
        const nextArrow = this.createElement('a', ['next'], '&#10095;');
        this.slider.appendChild(previousArrow);
        this.slider.appendChild(nextArrow);
        this.addArrowsListeners(previousArrow, nextArrow);
    }

    renderBullets() {
        const config = this.config;
        const sliderControls = this.createElement('nav', ['slider-controls']);
        let bulletsAmount = Math.floor(config.slidesLenth / config.itemsPerPage);
        let index = 1;
        while ((bulletsAmount--) > 0) {
            sliderControls.appendChild(this.createElement('a', ['slide-bullet', 'fade'], '', ['data-item',index++]))
        }

        this.slider.appendChild(sliderControls);

        this.addBulletsListeners(sliderControls);
    }

    createElement(elem, className = [], content = '', attr = []) {
        const element = document.createElement(elem);
        (className && element.classList.add(...className));
        console.log(attr)
        attr.length && element.setAttribute(...attr);
        if (content) {
            element.innerHTML = content
        }

        return element;
    }


}

const options = {
    arrows: true,
    itemsPerPage: 2,
    bullets: true
};


new Slider(options);
