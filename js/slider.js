class Slider {

    constructor(options) {
        this.slider = document.getElementById('slider');
        this.sliderWidth = this.slider.offsetWidth;
        this.slides = Array.prototype.slice.call(this.slider.children);
        this.config = Slider.globalConfig(options);
        this.config.slidesLenth = this.slides.length;
        this.currentSlide = Math.max(0, Math.min(0, this.slides.length - this.config.itemsPerPage));
        this.init();
    }

    static globalConfig(options = {}) {

        const defaultSettings = {
            itemsPerPage: 1,
            itemsToSlide: 1,
            bullets: false,
            arrows: true,
            infinity: false,
            transition: 'ease-out',
            duration: 1500,
            autoPlay: false

        };

        return Object.assign({
        }, defaultSettings, options);


    }

    init() {
        const config = this.config;
        config.autoStop = this.slides.length - config.itemsToSlide;

        this.renderSlidesWrappers(this.slides);

        if (config.autoPlay) {
            setInterval(this.autoSwitch.bind(this), config.duration);
            config.bullets = false;
            config.arrows = false;
        }

        (config.bullets && this.renderBullets());
        (config.arrows && this.renderArrows());

        this.slideToCurrent();


    }

    prev() {
        const config = this.config;
        const howManySlides = config.itemsToSlide;

        if (this.currentSlide === this.slides.length - config.itemsPerPage && config.infinity) {
            this.currentSlide = 0;
        }
        else {
            this.currentSlide = Math.max(this.currentSlide - howManySlides, 0);
        }

        this.slideToCurrent();
    }


    next() {
        const config = this.config;
        const howManySlides = config.itemsToSlide;

        if (this.currentSlide === this.slides.length - config.itemsPerPage && config.infinity) {
            this.currentSlide = 0;
        }
        else {
            this.currentSlide = Math.min(this.currentSlide + howManySlides, this.slides.length - config.itemsPerPage)

        }

        this.slideToCurrent();

    }

    slideToCurrent() {
        const config = this.config;
        config.movingWith = this.currentSlide * (this.sliderWidth / config.itemsPerPage);

        this.sliderFrame.style.transform = `translate3d(-${config.movingWith}px, 0, 0)`;


    }

    autoSwitch() {
        const config = this.config;

        const howManySlides = config.itemsToSlide;
        this.currentSlide = Math.min(this.currentSlide + howManySlides, this.slides.length - config.itemsPerPage);
        this.slideToCurrent();

        if (this.currentSlide === config.autoStop) {
            this.currentSlide = 0;
            config.movingWith = 0;
            this.slideToCurrent();

        }

    }

    moveToSetItems(index) {

        const beforeChange = this.currentSlide;
        const config = this.config;
        this.currentSlide = Math.min(Math.max(+index * config.itemsPerPage, 0), this.slides.length - config.itemsPerPage);
        if (beforeChange !== this.currentSlide) {
            this.slideToCurrent();
        }
    }

    renderArrows() {
        const previousArrow = this.createElement({elem: 'a', className: ['previous'], content: '&#10094'});
        const nextArrow = this.createElement({elem: 'a', className: ['next'], content: '&#10095;'});
        const container = this.slider.parentElement;
        container.appendChild(previousArrow);
        container.appendChild(nextArrow);

        previousArrow.addEventListener('click', this.prev.bind(this));
        nextArrow.addEventListener('click', this.next.bind(this));

    }

    renderBullets() {
        const config = this.config;
        const sliderControls = this.createElement({elem: 'div', className: ['slider-controls']});
        let bulletsAmount = Math.round(config.slidesLenth / config.itemsPerPage);
        let index = 0;

        while ((bulletsAmount--) > 0) {
            const elemOptions = {element: 'a', className: ['slide-bullet', 'fade'], attr: ['data-item', index++]};
            sliderControls.appendChild(this.createElement(elemOptions));
        }

        Array.from(sliderControls.children).forEach(bullet => {
            bullet.addEventListener('click', this.moveToSetItems.bind(this, bullet.dataset.item));
        });

        this.slider.parentElement.appendChild(sliderControls);


    }

    renderSlidesWrappers(data) {
        const config = this.config;

        const elementOptions = {
            elem: 'div', className: ['slides-frame'], styles: {
                display: "flex",
                width: `${(this.sliderWidth / config.itemsPerPage) * this.slides.length}px`,
                transition: `all ${config.duration}ms ${config.transition}`
            }
        };
        this.sliderFrame = this.createElement(elementOptions);

        Array.from(data).forEach(item => {
            const elementContainer = document.createElement('div');
            elementContainer.style.width = `${100 / this.slides.length}%`;
            elementContainer.classList.add('slide-wrap');
            elementContainer.appendChild(item);
            this.sliderFrame.appendChild(elementContainer)
        });
        this.slider.appendChild(this.sliderFrame);
    }

    createElement({elem, className = [], content = '', styles = {}, attr = []}) {

        const node = document.createElement(elem);
        (className && node.classList.add(...className));
        Object.keys(styles).forEach(prop => {
            node.style[prop] = styles[prop];
        });
        attr.length && node.setAttribute(...attr);
        if (content) {
            node.innerHTML = content
        }

        return node;
    }

}