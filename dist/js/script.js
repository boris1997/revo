
class Slider {

    constructor(arrow, content, dragableItem, main, slideNumber) {
        this.arrow = arrow,
            this.content = content,
            this.dragableItem = dragableItem,
            this.main = main,
            this.slideNumber = slideNumber,
            this.isDragging = false,
            this.currentIndex = 0,
            this.startPos = 0,
            this.currentTranslation = 0;
        this.prevTranslation = 0;
        this.animationID = 0;
    }

    translateSlides = () => {
        for (let i = 1; i < content.length; i++) {
            this.translate();
        }
        window.addEventListener("resize", () => {
            this.translate();
        });

    }
    translate = () => {
        for (let i = 1; i < content.length; i++) {
            content[i].style.left = content[i].clientWidth * i + "px";
        }

    }

    contextMenu = () => {
        window.oncontextmenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false
        }
    }

    initDrag = () => {
        console.log(this.content)
        this.content.map((dragableItem, i) => {

            dragableItem.addEventListener('dragstart', (e) => e.preventDefault())

            //touch event
            console.log(i)
            dragableItem.addEventListener('touchstart', this.touchStart(i), { passive: true })
            dragableItem.addEventListener('touchend', this.touchEnd)
            dragableItem.addEventListener('touchmove', this.touchMove, { passive: true })
            /* daragableImg.classList.add('slider__img--dragable') */

            //mouse event
            dragableItem.addEventListener('mousedown', this.touchStart(i), { passive: true })
            dragableItem.addEventListener('mouseup', this.touchEnd)
            dragableItem.addEventListener('mouseleave', this.touchEnd)
            dragableItem.addEventListener('mousemove', this.touchMove, { passive: true })


        })
    }

    touchStart = (i) => {
        console.log(i)
        return (event) => {
            this.dragableItem[i].classList.add('carousel__wrapper--dragable')
            this.currentIndex = i;
            this.startPos = this.getPositionX(event);
            this.isDragging = true;
            this.animationID = requestAnimationFrame(this.animation)
        }
    }

    touchEnd = () => {
        cancelAnimationFrame(this.animationID)
        this.isDragging = false;
        this.dragableItem[this.currentIndex].classList.remove('carousel__wrapper--dragable')
        const activeSlide = document.querySelector(".carousel__item--active");
        if (this.currentTranslation <= 0 && activeSlide.nextElementSibling && Math.abs(this.currentTranslation) > Math.abs(this.prevTranslation) + (activeSlide.clientWidth / 2.5)) {
            this.toggleAciveElement(activeSlide, activeSlide.nextElementSibling)
            this.getTransformation();
        } else if (this.currentTranslation <= 0 && activeSlide.previousElementSibling && Math.abs(this.currentTranslation) < Math.abs(this.prevTranslation) - (activeSlide.clientWidth / 2.5)) {
            this.toggleAciveElement(activeSlide, activeSlide.previousElementSibling)
            this.getTransformation();
        } else {
            this.getTransformation();
        }
    }

    touchMove = (e) => {
        if (this.isDragging) {
            const currentPosition = this.getPositionX(e);
            this.currentTranslation = this.prevTranslation + currentPosition - this.startPos;
        }
    }
    animation = () => {
        this.setSliderPosition();
        if (this.isDragging) requestAnimationFrame(this.animation)
    }

    setSliderPosition = () => this.isDragging && (this.main.style.transform = `translateX(${this.currentTranslation}px)`)


    getPositionX = (event) => event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;



    getToggleBtns = () => {
        this.arrow[0].addEventListener("click", () => {
            this.left();
        });

        this.arrow[1].addEventListener("click", () => {
            this.rigth();
        });
    }




    rigth = () => {
        const activeSlide = document.querySelector(".carousel__item--active");

        if (activeSlide.nextElementSibling) {
            this.toggleAciveElement(activeSlide, activeSlide.nextElementSibling)
            this.getTransformation()
        } else {
            this.toggleAciveElement(activeSlide, this.content[0])
            this.getTransformation()
        }

    }


    left = () => {
        const activeSlide = document.querySelector(".carousel__item--active");
        if (activeSlide.previousElementSibling) {

            this.toggleAciveElement(activeSlide, activeSlide.previousElementSibling)
            this.getTransformation()
        } else {
            this.toggleAciveElement(activeSlide, this.main.lastElementChild)
            this.getTransformation()
        }
    }

    toggleAciveElement = (active, unActive) => {
        active.classList.remove("carousel__item--active");
        unActive.classList.add("carousel__item--active");
    }

    activeSlide = () => document.querySelector(".carousel__item--active");

    getTransformation = () => {
        /*  console.log('ok') */
        const activeSlide = document.querySelector(".carousel__item--active");
        /* console.log(activeSlide) */
        this.currentIndex = this.content.indexOf(activeSlide);
        this.slideNumber.textContent = this.currentIndex + 1;
        this.prevTranslation = this.currentIndex * -activeSlide.clientWidth;
        this.currentTranslation = -this.currentIndex * activeSlide.clientWidth;
        this.main.style.transform = `translate(${this.currentTranslation}px)`
    }

}



document.addEventListener('DOMContentLoaded', () => {
    const arrow = [...document.querySelectorAll(".togglers__item")];
    const content = [...document.querySelectorAll(".carousel__item")];
    const dragableItem = [...document.querySelectorAll(".carousel__wrapper")];
    const main = document.querySelector(".carousel__content");
    const slideNumber = document.querySelector(".togglers__slide-count");
    const slider = new Slider(arrow, content, dragableItem, main, slideNumber);
    /* slider.translateSlides(); */
    slider.getToggleBtns();
    slider.initDrag();
    slider.contextMenu();

})