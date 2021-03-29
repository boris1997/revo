class Slider {

    constructor(content, main, arrow, toggleBtn, toggleMoveGif, stopperFactor) {

        this.content = content,
            this.main = main,
            this.arrow = arrow,
            this.toggleBtn = toggleBtn,
            this.toggleMoveGif = toggleMoveGif,
            this.isDragging = false,
            this.currentIndex = 0,
            this.startPos = 0,
            this.translateStepX = 0,
            this.currentTranslationX = 0,
            this.currentTranslationY,
            this.margin = 0,
            this.elemntsMargins = 0,
            this.prevTranslation = 0,
            this.animationID = 0,
            this.stopperFactor = stopperFactor;
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
            dragableItem.addEventListener('mouseleave', (e) => this.isDragging && this.touchEnd(e))

        })
    }

    touchStart = (i) => {

        // Начало тач события 
        return (event) => {

            this.main.classList.remove('carousel__content--smooth');  // удаляем плавность при движении, чтобы не было задержек
            this.startPos = this.getPositionX(event); // узнаем стартовую позицию мыши
            this.isDragging = true; // инициализируем перетаскивание
            this.animationID = requestAnimationFrame(this.animation) // запускаем анимацию
        }
    }


    touchEnd = (e) => {
        // Остановка тач события


        cancelAnimationFrame(this.animationID)  // отмена анимацию
        this.isDragging = false; // отсановка перетаскивания
        this.main.classList.add('carousel__content--smooth');  // возвращаем плавность для событий на клик стрелки 

        // Изменям индекс в зависимости от текущей трансформации
        if (this.currentIndex < this.content.length) {
            Math.abs(this.currentTranslationX) > ((Math.abs(this.prevTranslation) + this.translateStepX / 3)) && (this.currentIndex++);
        }
        if (this.currentIndex >= 0) {
            Math.abs(this.currentTranslationX) < ((Math.abs(this.prevTranslation) - this.translateStepX / 3)) && (this.currentIndex--);
        }


        this.setPrevTranslation();            // Устанавливаем предыдущий транслэйте
        this.setCurrentXTranslation();        // Устанавливаем текущий транслэйте
        this.changeArrowActivity();           // Изменяем активность кнопопк
        this.setSliderPositionX(this.main);   // Устанавливаем транслэйт для слайдера
        this.getUnactiveElts();               // меняем опасити элементов 
    }

    touchMove = (e) => {

        // тач событие

        if (this.isDragging) { // если драг активен

            let currentPosition = this.getPositionX(e); // узнаем  позицию мыши
            // останавливаем транслэйт при выходе из контейнера 
            if (Math.abs(this.currentTranslationX) + 100 <= (this.translateStepX * this.content.length) + this.elemntsMargins && this.currentTranslationX < 2) {
                (this.currentTranslationX = ((this.prevTranslation * this.main.clientWidth / 100) + currentPosition - this.startPos) / this.main.clientWidth * 100);
            }
        }
    }
    animation = () => {
        // анимация если драг активен
        this.setSliderPositionX(this.main);
        if (this.isDragging) requestAnimationFrame(this.animation)
    }

    setSliderPositionX = (element) => element.style.transform = `translateX(${this.currentTranslationX}%)` // Устанавливаем транслэйт для элемента по x координате

    setSliderPositionY = (element) => element.style.transform = `translateY(${-this.currentTranslationY}%)` // Устанавливаем транслэйт для элемента по y координате


    getPositionX = (event) => event.type.includes('mouse') ? event.pageX : event.touches[0].clientX; // Позиция мыши/пальца

    absToPercent = (absolute, container) => absolute / container * 100  // Перевод в проценты


    initArrowsBtns = () => {
        this.arrow[0].addEventListener("click", () => this.left()); // левая стрелка

        this.arrow[1].addEventListener("click", () => this.rigth()); // праввая стрелка
    }

    initToggleBtns = () => {

        this.toggleBtn.map((item, i) => item.addEventListener("click", () => {
            this.currentIndex = i;
            this.setCurrentXTranslation();// Меняем текущий транслэйт слайдер 
            this.setSliderPositionX(this.main);  // Устанавливаем транслэйт для слайдера
            this.setCurrentYTranslation();// Меняем текущий транслэйт движущегося элемента
            this.setSliderPositionY(this.toggleMoveGif);// Устанавливаем транслэйт для движущегося элемента
            this.setSlideNumber(this.toggleMoveGif)// Устанавливаем номер слайда
        }))
    }

    setSlideNumber = (elem) => elem.textContent = this.currentIndex + 1  // Устанавливаем номер слайда

    rigth = () => {
        if (Math.abs(this.currentTranslationX) * 2 + 100 <= (this.translateStepX * this.content.length) + this.elemntsMargins) {
            this.currentIndex++;
            this.setPrevTranslation();  // Устанавливаем предыдущий транслэйт
            this.setCurrentXTranslation();  // Устанавливаем текущий транслэйт
            this.changeArrowActivity();  // Изменяем активность кнопопк
            this.setSliderPositionX(this.main);// Устанавливаем транслэйт для слайдера
            this.getUnactiveElts();  // меняем опасити элементов 
        }

    }


    left = () => {
        if (Math.abs(this.currentTranslationX) > 0) {
            this.currentIndex--
            this.setPrevTranslation();      // Устанавливаем предыдущий транслэйт
            this.setCurrentXTranslation();  // Устанавливаем текущий транслэйт
            this.changeArrowActivity();  // Изменяем активность кнопопк
            this.setSliderPositionX(this.main);// Устанавливаем транслэйт для слайдера
            this.getUnactiveElts();  // меняем опасити элементов 
        }
    }

    changeArrowActivity = () => {

        // меняем активность стрелок
        Math.abs(this.currentTranslationX) > 0 ? (this.arrow[0].classList.contains('carousel__toggle-btn--unactive') && this.arrow[0].classList.remove('carousel__toggle-btn--unactive')) : this.arrow[0].classList.add('carousel__toggle-btn--unactive');
        if (Math.abs(this.currentTranslationX) + Math.abs(this.currentTranslationX) + 100 >= (this.translateStepX * this.content.length) + this.elemntsMargins) {
            this.arrow[1].classList.add('carousel__toggle-btn--unactive');
        } else {
            this.arrow[1].classList.remove('carousel__toggle-btn--unactive');

        }
    }

    setPrevTranslation = () => this.prevTranslation = (this.currentIndex * -(this.content[0].clientWidth + this.margin)) / this.main.clientWidth * 100;// Устанавливаем предыдущий трансл


    setCurrentXTranslation = () => this.currentTranslationX = (this.currentIndex) * -this.translateStepX; //Меняем текущий X транслэйт

    setCurrentYTranslation = () => this.currentTranslationY = (this.currentIndex) * -this.translateStepY; //Меняем текущий Y транслэйт


    getUnactiveElts = () => this.content.map(item => {
        // меняем опасити элементов 
        const translationtoAbs = (Math.abs(this.currentTranslationX) * this.main.clientWidth / 100).toFixed();
        console.log(translationtoAbs)
        console.log('ok')
        if (this.main.clientWidth < ((item.offsetLeft + this.margin) - translationtoAbs) || item.offsetLeft - translationtoAbs < 0) {
            console.log('ok')
            item.classList.add('carousel__item--unActive')
        } else {
            (item.classList.contains('carousel__item--unActive') && item.classList.remove('carousel__item--unActive'))
        }

    })

    getMargin = () => {
        // Узнаем отутупы для правельного транслэйта
        this.margin = +getComputedStyle(this.content[0]).marginLeft.split('px').join('');
        this.elemntsMargins = this.absToPercent((this.margin * this.content.length), this.getTotalElementsWidth()) - this.stopperFactor;

    }

    getTranslateStepX = () => this.translateStepX = (this.content[0].clientWidth + this.margin) / this.main.clientWidth * 100  // Узнаем шаг для X транслэйта


    getTranslateStepY = () => this.translateStepY = 100; // Узнаем шаг для Y транслэйта


    getTotalElementsWidth = () => (this.content[0].clientWidth + this.margin) * this.content.length // Узнаем общую ширину для всех эелементов слайдера

}



document.addEventListener('DOMContentLoaded', () => {

    // Coffee Slider
    const arrowCof = [...document.querySelectorAll(".coffee__toggle-btn")];
    const contentCof = [...document.querySelectorAll(".coffee__item")];
    const mainCof = document.querySelector(".coffee__body-wrapper");
    const stopperFactorCof = 0;

    const sliderCoffee = new Slider(contentCof, mainCof, arrowCof, null, null, stopperFactorCof);

    sliderCoffee.getMargin();
    sliderCoffee.getUnactiveElts();
    sliderCoffee.getTranslateStepX();
    sliderCoffee.initArrowsBtns();
    sliderCoffee.initDrag();
    sliderCoffee.contextMenu();



    // Combo Slider

    const arrowCom = [...document.querySelectorAll(".combo__toggle-btn")];
    const contentCom = [...document.querySelectorAll(".combo__item")];
    const mainCom = document.querySelector(".combo__body-wrapper");
    const stopperFactorCom = 4;
    const sliderCombo = new Slider(contentCom, mainCom, arrowCom, null, null, stopperFactorCom);

    sliderCombo.getMargin();
    sliderCombo.getUnactiveElts();
    sliderCombo.getTranslateStepX();
    sliderCombo.initArrowsBtns();
    sliderCombo.initDrag();
    sliderCombo.contextMenu();



    // Giftset Slider

    const contentGif = [...document.querySelectorAll(".giftset__body-wrapper")];
    const mainGif = document.querySelector(".giftset__body");
    const toggleBtnGif = [...document.querySelectorAll(".togglers__item")];
    const toggleMoveGif = document.querySelector(".togglers__item-move");
    const sliderGiftset = new Slider(contentGif, mainGif, null, toggleBtnGif, toggleMoveGif, null);

    sliderGiftset.getMargin();
    sliderGiftset.getTranslateStepX();
    sliderGiftset.getTranslateStepY(toggleMoveGif, mainGif);
    sliderGiftset.initToggleBtns();

})