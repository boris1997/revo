
class Slider {

    constructor(arrow, content, main, stopperFactor) {

        this.arrow = arrow,
            this.content = content,
            this.main = main,
            this.isDragging = false,
            this.currentIndex = 0,
            this.startPos = 0,
            this.translateStep = 0,
            this.currentTranslation = 0;
        this.margin = 0;
        this.elemntsMargins = 0;
        this.prevTranslation = 0;
        this.animationID = 0;
        this.stopperFactor = stopperFactor;
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
        this.content.map((dragableItem, i) => {

            dragableItem.addEventListener('dragstart', (e) => e.preventDefault())

            //touch event
            dragableItem.addEventListener('touchstart', this.touchStart(i), { passive: true })
            dragableItem.addEventListener('touchend', (e) => this.touchEnd(e))
            dragableItem.addEventListener('touchmove', this.touchMove, { passive: true })


            //mouse event
            dragableItem.addEventListener('mousedown', this.touchStart(i), { passive: true })
            dragableItem.addEventListener('mouseup', (e) => this.touchEnd(e))
            dragableItem.addEventListener('mousemove', this.touchMove, { passive: true })
            console.log('ok')
            dragableItem.addEventListener('mouseleave', (e) => this.isDragging && this.touchEnd(e))


        })
    }

    touchStart = (i) => {
        return (event) => {
            /*   this.dragableItem[i].classList.add('carousel__wrapper--dragable'); */
            this.main.classList.remove('carousel__content--smooth');
            this.startPos = this.getPositionX(event);
            this.isDragging = true;
            this.animationID = requestAnimationFrame(this.animation)
        }
    }


    touchEnd = (e) => {

        cancelAnimationFrame(this.animationID)
        this.isDragging = false;
        this.main.classList.add('carousel__content--smooth');
        console.log(this.currentIndex)
        console.log(this.content.length)
        if (this.currentIndex < this.content.length) {
            Math.abs(this.currentTranslation) > ((Math.abs(this.prevTranslation) + this.translateStep / 3)) && (this.currentIndex++, console.log('ok'));
        }
        if (this.currentIndex >= 0) {
            console.log(this.content.length - 1)
            Math.abs(this.currentTranslation) < ((Math.abs(this.prevTranslation) - this.translateStep / 3)) && (this.currentIndex--);
        }
        this.getTransformation()

    }

    touchMove = (e) => {
        if (this.isDragging) {

            let currentPosition = this.getPositionX(e);
            if (Math.abs(this.currentTranslation) + 100 <= (this.translateStep * this.content.length) + this.elemntsMargins && this.currentTranslation < 2) {
                console.log(Math.abs(this.currentTranslation));
                (this.currentTranslation = ((this.prevTranslation * this.main.clientWidth / 100) + currentPosition - this.startPos) / this.main.clientWidth * 100);
            }
        }
    }
    animation = () => {
        this.setSliderPosition();
        if (this.isDragging) requestAnimationFrame(this.animation)
    }

    setSliderPosition = () => {
        console.log(this.currentTranslation)
        this.main.style.transform = `translate(${this.currentTranslation}%)`
    }


    getPositionX = (event) => event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;

    absToPercent = (absolute, container) => absolute / container * 100


    getToggleBtns = () => {
        this.arrow[0].addEventListener("click", (e) => {
            this.left(e);
        });

        this.arrow[1].addEventListener("click", (e) => {
            this.rigth(e);
        });
    }




    rigth = (e) => {
        if (Math.abs(this.currentTranslation) * 2 + 100 <= (this.translateStep * this.content.length) + this.elemntsMargins) {
            this.currentIndex++
            this.getTransformation()
        }

    }


    left = (e) => {
        console.log(Math.abs(this.currentTranslation))
        if (Math.abs(this.currentTranslation) > 0) {
            this.currentIndex--
            this.getTransformation(e)
        }
    }



    getTransformation = () => {
        this.prevTranslation = (this.currentIndex * -(this.content[0].clientWidth + this.margin)) / this.main.clientWidth * 100;
        this.currentTranslation = (this.currentIndex) * -this.translateStep;
        Math.abs(this.currentTranslation) > 0 ? (this.arrow[0].classList.contains('carousel__toggle-btn--unactive') && this.arrow[0].classList.remove('carousel__toggle-btn--unactive')) : this.arrow[0].classList.add('carousel__toggle-btn--unactive');
        if (Math.abs(this.currentTranslation) + Math.abs(this.currentTranslation) + 100 >= (this.translateStep * this.content.length) + this.elemntsMargins) {
            this.arrow[1].classList.add('carousel__toggle-btn--unactive');
        } else {
            this.arrow[1].classList.remove('carousel__toggle-btn--unactive');

        }
        this.setSliderPosition()
        this.getUnactiveElts()
    }

    isUnactiveElts = () => this.content.some((item, i) => {
        console.log(item)
        return this.main.clientWidth < item.offsetLeft
    })

    getUnactiveElts = () => this.content.map(item => {
        const translationtoAbs = (Math.abs(this.currentTranslation) * this.main.clientWidth / 100).toFixed();

        if (this.main.clientWidth < ((item.offsetLeft + this.margin) - translationtoAbs) || item.offsetLeft - translationtoAbs < 0) {
            console.log('ok')
            item.classList.add('carousel__item--unActive')
        } else {
            console.log(item);
            (item.classList.contains('carousel__item--unActive') && item.classList.remove('carousel__item--unActive'))
        }

    })

    getMargin = () => {
        this.margin = +getComputedStyle(this.content[0]).marginLeft.split('px').join('');
        this.elemntsMargins = this.absToPercent((this.margin * this.content.length), this.getTotalElementsWidth()) - this.stopperFactor;
        console.log(this.margin)
    }

    getTranslateStep = () => {
        this.translateStep = (this.content[0].clientWidth + this.margin) / this.main.clientWidth * 100
    }

    getTotalElementsWidth = () => (this.content[0].clientWidth + this.margin) * this.content.length

}



document.addEventListener('DOMContentLoaded', () => {

    // Coffee Slider
    const arrowCof = [...document.querySelectorAll(".coffee__toggle-btn")];
    const contentCof = [...document.querySelectorAll(".coffee__item")];
    const mainCof = document.querySelector(".coffee__body-wrapper");
    const stopperFactorCof = 0;

    const sliderCoffee = new Slider(arrowCof, contentCof, mainCof, stopperFactorCof);

    sliderCoffee.getMargin();
    sliderCoffee.getUnactiveElts();
    sliderCoffee.getTranslateStep();
    sliderCoffee.getToggleBtns();
    sliderCoffee.initDrag();
    sliderCoffee.contextMenu();



    // Combo Slider

    const arrowCom = [...document.querySelectorAll(".combo__toggle-btn")];
    const contentCom = [...document.querySelectorAll(".combo__item")];
    const mainCom = document.querySelector(".combo__body-wrapper");
    const stopperFactorCom = 4;
    const sliderCombo = new Slider(arrowCom, contentCom, mainCom, stopperFactorCom);

    sliderCombo.getMargin();
    sliderCombo.getUnactiveElts();
    sliderCombo.getTranslateStep();
    sliderCombo.getToggleBtns();
    sliderCombo.initDrag();
    sliderCombo.contextMenu();

})