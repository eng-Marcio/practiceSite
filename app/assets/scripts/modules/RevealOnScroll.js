import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'


class RevealOnScroll {
    constructor(els, thresholdPercent){
        this.itemstoReveal = els;
        this.thresholdPercent = thresholdPercent;
        this.browserHeight = window.innerHeight;
        this.hideInitially();
        this.scrollThrotle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events() {
        window.addEventListener("scroll", this.scrollThrotle);
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 333))
    }

    calcCaller() {
        this.itemstoReveal.forEach(el => {
            if(!el.isRevealed) {
                this.calculateIfScrolledTo(el);
            }
        })
    }

    calculateIfScrolledTo(el) {
        if(window.scrollY + this.browserHeight > el.offsetTop) {
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
            if(scrollPercent <= this.thresholdPercent) {
                el.classList.add("reveal-item--is-visible");
                el.isRevealed = true;
                if(el.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrotle);
                }
            }
        }
    }

    hideInitially() {
        this.itemstoReveal.forEach(el => {
            el.classList.add("reveal-item");
            el.isRevealed = false;
        })
        this.itemstoReveal[this.itemstoReveal.length-1].isLastItem = true;
    }
}

export default RevealOnScroll;