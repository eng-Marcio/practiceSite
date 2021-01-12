import throtle from 'lodash/throttle'

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header");
        this.events();
    }

    runOnScroll() {
        if(window.scrollY > 60) {
            this.siteHeader.classList.add("site-header--dark")
        } else {
            this.siteHeader.classList.remove("site-header--dark")
        }
    }

    events() {  
        window.addEventListener("scroll", throtle(() => this.runOnScroll(), 200));
    }

    
}

export default StickyHeader;