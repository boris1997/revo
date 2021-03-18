
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


    resizeWindow = () => {
        window.onresize = (e) => {
            this.getTransformation(e)
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
        /*         console.log(this.content) */
        this.content.map((dragableItem, i) => {

            dragableItem.addEventListener('dragstart', (e) => e.preventDefault())

            //touch event
            dragableItem.addEventListener('touchstart', this.touchStart(i), { passive: true })
            dragableItem.addEventListener('touchend', (e) => this.touchEnd(e))
            dragableItem.addEventListener('touchmove', this.touchMove, { passive: true })
            /* daragableImg.classList.add('slider__img--dragable') */

            //mouse event
            dragableItem.addEventListener('mousedown', this.touchStart(i), { passive: true })
            dragableItem.addEventListener('mouseup', (e) => this.touchEnd(e))
            dragableItem.addEventListener('mousemove', this.touchMove, { passive: true })
            /*  dragableItem.addEventListener('mouseleave', (e) => this.touchEnd(e)) */


        })
    }

    touchStart = (i) => {
        /*         console.log(i) */
        return (event) => {
            this.dragableItem[i].classList.add('carousel__wrapper--dragable')
            this.currentIndex = i;
            this.startPos = this.getPositionX(event);
            this.isDragging = true;
            this.animationID = requestAnimationFrame(this.animation)
        }
    }

    touchEnd = (e) => {


        cancelAnimationFrame(this.animationID)
        this.isDragging = false;
        this.dragableItem[this.currentIndex].classList.remove('carousel__wrapper--dragable')
        const activeSlide = document.querySelector(".carousel__item--active");
        if (this.currentTranslation <= 0 && activeSlide.nextElementSibling && Math.abs(this.currentTranslation) > Math.abs(this.prevTranslation) + (activeSlide.clientWidth / 4.5)) {
            this.toggleAciveElement(activeSlide, activeSlide.nextElementSibling)
        } else if (this.currentTranslation <= 0 && activeSlide.previousElementSibling && Math.abs(this.currentTranslation) < Math.abs(this.prevTranslation) - (activeSlide.clientWidth / 4.5)) {
            this.toggleAciveElement(activeSlide, activeSlide.previousElementSibling)
        }
        this.getTransformation(e);
        console.log('ok')

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

    setSliderPosition = () => this.main.style.transform = `translateX(${this.currentTranslation}px)`


    getPositionX = (event) => event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;



    getToggleBtns = () => {
        this.arrow[0].addEventListener("click", (e) => {
            this.left(e);
        });

        this.arrow[1].addEventListener("click", (e) => {
            this.rigth(e);
        });
    }




    rigth = (e) => {
        const activeSlide = document.querySelector(".carousel__item--active");

        if (activeSlide.nextElementSibling) {
            this.toggleAciveElement(activeSlide, activeSlide.nextElementSibling)
            this.getTransformation(e)
        } else {
            this.toggleAciveElement(activeSlide, this.content[0])
            this.getTransformation(e)
        }

    }


    left = () => {
        const activeSlide = document.querySelector(".carousel__item--active");
        if (activeSlide.previousElementSibling) {

            this.toggleAciveElement(activeSlide, activeSlide.previousElementSibling)
            this.getTransformation(e)
        } else {
            this.toggleAciveElement(activeSlide, this.main.lastElementChild)
            this.getTransformation(e)
        }
    }

    toggleAciveElement = (active, unActive) => {
        active.classList.remove("carousel__item--active");
        unActive.classList.add("carousel__item--active");
    }

    activeSlide = () => document.querySelector(".carousel__item--active");

    getTransformation = (e) => {
        /*  console.log('ok') */
        /*  console.log(e) */
        const activeSlide = document.querySelector(".carousel__item--active");
        /* console.log(activeSlide) */
        this.currentIndex = this.content.indexOf(activeSlide);
        this.slideNumber.textContent = this.currentIndex + 1;
        this.prevTranslation = this.currentIndex * -activeSlide.clientWidth;
        this.currentTranslation = -this.currentIndex * activeSlide.clientWidth;
        e ? this.main.style.transform = `translate(-${this.currentIndex}00%)` : (this.main.style.transform = `translate(${this.currentTranslation}px)`)
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
    slider.resizeWindow();
    slider.getToggleBtns();
    slider.initDrag();
    slider.contextMenu();

})