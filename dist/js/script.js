class Styles {
    static addTransition(element, type, dur, effect) {
        console.log(element, type, dur, effect)
        element.style.transition = `${type} ${dur} ${effect}`
    }
}

class ClassToggle {
    static addClass(element, clas) { element.classList.add(clas) }
    static removeClass(element, clas) { element.classList.remove(clas) }
    static toggleClass(element, clas) { element.classList.toggle(clas) }
}

class Xhr {
    static makeRequest(tempParams) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(tempParams))
        return xhr.onload = function () {
            if (xhr.responseText === 'success') {
                console.log('ok')
                return
            } else {
                console.log('some')
            }
        }
    }
}
class Modal {

    constructor(body, popup, popupModal, popupModalWrapper, wrapperMargin, btnPopup, closeBtn, formInputs, popupModalActive, popupHidden, bodyNoScroll, staticForm) {
        this.body = body;
        this.popup = popup;
        this.popupModal = popupModal;
        this.popupModalWrapper = popupModalWrapper;
        this.wrapperMargin = wrapperMargin;
        this.btnPopup = btnPopup;
        this.closeBtn = closeBtn;
        this.formInputs = formInputs;
        this.popupModalActive = popupModalActive;
        this.popupHidden = popupHidden;
        this.bodyNoScroll = bodyNoScroll;
        this.staticForm = staticForm;
/*         this.textBtn = textBtn;
 */        this.initEvents()
    }

    initEvents = () => {
        console.log(this.btnPopup)
        this.initArrayBtnPopup();
        this.initCloseBtn();
    }


    initCloseBtn = () => {
        this.popup.addEventListener('click', (e) => {
            console.log(e.target)

            if (e.target.classList.contains('popup__modal--active') || e.target.classList.contains('popup__modal-close') || e.target.dataset.modal === 'close') {
                e.stopPropagation()
                console.log(e.target.classList, this.popupModal)

                this.popupModal.map((popupModal, i) => {
                    console.log(popupModal.classList.contains(this.popupModalActive))
                    if (popupModal.classList.contains(this.popupModalActive)) {
                        console.log(this.body)
                        ClassToggle.removeClass(this.body, this.bodyNoScroll);
                        this.removeNoScrollStyles(this.body);
                        /*  !popupModal.classList.contains(this.staticForm) && this.removeNoScrollStyles(popupModal); */
                        console.log(popupModal)
                        !popupModal.classList.contains(this.staticForm) && ClassToggle.removeClass(popupModal, this.popupModalActive);
                        ClassToggle.addClass(this.popup, this.popupHidden)
                    }
                })

            }
        })
    }

    initArrayBtnPopup = () => {
        this.btnPopup.map((btnPopup, i) => {
            console.log(btnPopup, btnPopup.type)
            if (btnPopup.type === 'submit') {
                console.log('ok')
                /* console.log(this.btnPopup[i], this.popupModal[i]) */
                this.popupModal.map((popupModal, i) => {
                    popupModal.dataset.modal === 'form' && this.submitForm(popupModal)
                })
            } else {
                btnPopup.addEventListener('click', () => {
                    this.popupModal.map((popupModal, i) => {
                        // console.log(popupModal.children[0])
                        Styles.addTransition(popupModal.children[0], 'all', '0.5s', 'ease-in-out')

                        if (btnPopup.dataset.modal === popupModal.dataset.modal) {
                            popupModal.dataset.modal === 'form' && this.submitForm(popupModal)
                            /* this.addNoScrollStyles(popupModal) */
                            window.innerWidth - this.body.offsetWidth > 0 && this.addMarginToBlock(this.popupModalWrapper[i])
                            !this.body.classList.contains(this.bodyNoScroll) && (this.addNoScrollStyles(this.body), ClassToggle.addClass(this.body, this.bodyNoScroll))
                            ClassToggle.addClass(popupModal, this.popupModalActive);
                            console.log('ok')
                            this.popup.classList.contains(this.popupHidden) && ClassToggle.removeClass(this.popup, this.popupHidden)

                        }
                    })
                    /*      this.changeTextVisibility(this.text[i], item);
                         this.textBtn && this.changeBtnText(item) */
                })
            }
        }
        )
    }

    addNoScrollStyles = (element) => {
        console.log('pk')
        element.style.paddingRight = window.innerWidth - this.body.offsetWidth + /* 12 +  */'px';
        element.style.width = '100vw'; // ? 
    }

    addMarginToBlock = (element) => {
        ClassToggle.addClass(element, this.wrapperMargin)
    }

    removeNoScrollStyles = (element) => {
        element.style.paddingRight = 0 + 'px';
        element.style.width = '100%';
    }


    submitForm = (popupModalForm) => {
        console.log(popupModalForm)
        popupModalForm.addEventListener('submit', (e) => {
            console.log('ok')
            e.preventDefault()
            let tempParams = {
                name: this.formInputs[0].value,
                phone: this.formInputs[1].value
            }
            Xhr.makeRequest(tempParams);
            !popupModalForm.classList.contains(this.staticForm) && ClassToggle.removeClass(popupModalForm, this.popupModalActive)
            this.popup.classList.contains(this.popupHidden) && ClassToggle.removeClass(this.popup, this.popupHidden)
            this.clearFields(this.formInputs)
            this.popupModal.map((popupModal, i) => {
                if (popupModal.dataset.modal === 'success') {
                    console.log(this.staticForm)
                    ClassToggle.addClass(popupModal, this.popupModalActive);
                }
                console.log(e.target, popupModal)
            })
        })
    }

    clearFields = (fields) => {
        console.log(fields)
        fields.map((field, i) => field.value = '')
    }

}


document.addEventListener('DOMContentLoaded', () => {

    // Coffee Slider
    const popupMain = document.getElementById("popup-main");
    if (popupMain !== null) {
        let body = document.querySelector(".body");
        let popup = document.querySelector(".popup");
        let popupModal = [...document.querySelectorAll(".popup__modal")];
        let popupModalWrapper = [...document.querySelectorAll(".popup__modal-wrapper")];
        let btnPopup = [...document.querySelectorAll(".btn__popup")];
        let closeBtn = [...document.querySelectorAll(".popup__modal-close")];
        let formInputs = [...document.querySelectorAll(".contact-form__input")];
        let popupModalActive = 'popup__modal--active';
        let popupHidden = 'popup--hidden';
        let bodyNoScroll = 'body--noscroll';
        let wrapperMargin = 'popup__modal-wrapper--margin'
        console.log(closeBtn)
        new Modal(body, popup, popupModal, popupModalWrapper, wrapperMargin, btnPopup, closeBtn, formInputs, popupModalActive, popupHidden, bodyNoScroll);
    }



    // const citiesList = document.querySelector(".cities__list-hidden");
    // const citiesBtn = document.querySelector(".cities__link");
    // const citiesBtnActive = 'cities__link--hide';
    // const textToggleBtn = ['Все города', 'Свернуть']
    // console.log(citiesList)
    // citiesList !== null && new Accordion(citiesBtn, citiesList, citiesBtnActive, textToggleBtn);


})
const footerYear = document.querySelector('.footer-contacts__year ')

const getedYear = () => footerYear.textContent = `${new Date().getFullYear()}`


getedYear()
// class Mail {
//     constructor(btn, name, amount, phone) {
//         this.btn = btn,
//             this.name = name,
//             this.amount = amount,
//             this.phone = phone

//     }

//     сontactData = () => ({
//         name: {
//             value: this.name.value,
//             item: this.name,
//             re: /^[a-zA-Zа-яА-Я0-9]{2,16}$/
//         },
//         phone: {
//             value: this.phone.value,
//             item: this.phone,
//             re: /^[78]{1}[9]{1}[0-9]{9}$/
//         }
//     })

//     contactDataArray = () => Object.entries(this.сontactData())

//     sendMail() {
//         console.log(this.btn)
//         this.btn.addEventListener('click', (e) => {
//             console.log('ok')
//             this.mailValidation(e)
//         })
//         document.addEventListener('keydown', (e) => {
//             e.code === 'Enter' && this.mailValidation(e)
//         })

//     }

//     mailValidation(e) {
//         e.preventDefault()
//         if (this.validateData()) {
//             console.log('ok')
//             this.contactDataArray().map(contactItem => contactItem[1].item.nextElementSibling.classList.contains('contact__invalid--show') && contactItem[1].item.nextElementSibling.classList.remove('contact__invalid--show'))


//             let tempParams = {
//                 name: this.name.value,
//                 phone: this.phone.value,
//             }

//             console.log(tempParams)
//             // this.makeRequest(this, tempParams)

//             /*  emailjs.send('service_989hbji', 'template_ljjqzp6', tempParams).then(res => res) */
//         }

//     }

//     makeRequest = (slider, tempParams) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('POST', '/');
//         xhr.setRequestHeader('content-type', 'application/json');
//         xhr.onload = function () {
//             if (xhr.responseText === 'success') {
//                 const order = document.querySelector('.order');
//                 order.classList.add('modal--active');

//                 slider.removeFields()
//             } else {
//                 console.log('some')
//             }
//         }
//         xhr.send(JSON.stringify(tempParams))
//     }

//     removeFields = () => this.contactDataArray().map((contactItem, i) => contactItem[1].item.value = '')


//     validateData = () => {
//         console.log(this.contactDataArray())
//         return this.contactDataArray().every((contactItem, i) => contactItem[1].re.test(contactItem[1].value) ? true : this.setAlert(contactItem[1].item)) && true
//     }

//     setAlert(item) {
//         console.log(item)
//         item.nextElementSibling.classList.add('contact-form__invalid--show')
//         setTimeout(() => {
//             item.nextElementSibling.classList.remove('contact-form__invalid--show')
//         }, 10000)
//     }

// }



// document.addEventListener('DOMContentLoaded', () => {
//     const btn = document.querySelector('.contact-form__btn');
//     const name = document.getElementById('name');
//     const phone = document.getElementById('phone');
//     const mail = new Mail(btn, name, null, phone);
//     mail.sendMail();
// })


/* import Styles from './utilities' */
class Sidebar {
    constructor(page, sections, menuItems, mobileMenuItems, hamburgerMenu, sidebar, sidebarBody, sidebarOverlay) {
        this.page = page,
            this.sections = sections,
            this.menuItems = menuItems,
            this.mobileMenuItems = mobileMenuItems,
            this.index = 0,
            this.sidebar = sidebar,
            this.hamburgerMenu = hamburgerMenu,
            this.sidebarBody = sidebarBody,
            this.sidebarOverlay = sidebarOverlay
    }
    sidebarManipulation = () => {

        console.log('ok')
        window.onresize = () => {
            if (window.innerWidth > 1224 && this.sidebar.classList.contains('page__sidebar--active')) {
                this.sidebar.classList.contains('sidebar--full-page') && this.page.classList.toggle('page_screen_full')
                this.removeSidebar()
            }

        }
        this.sidebarOverlay.onclick = () => this.removeSidebar();
        this.hamburgerMenu.onclick = (e) => this.toggleSidebar();
        this.mobileMenuItems.map(item => item.onclick = () => this.removeSidebar())
    }



    toggleSidebar = () => {
        console.log('ok')
        this.sidebar.classList.contains('sidebar--full-page') && this.page.classList.toggle('page_screen_full')
        this.sidebar.classList.toggle('page__sidebar--active');
        this.page.classList.toggle('page--noScroll');
        this.sidebarBody.classList.toggle('sidebar__body--active');
        this.sidebarOverlay.classList.toggle('overlay--show');
        this.hamburgerMenu.classList.toggle('hamburger-menu__content--active');
        /*      window.scrollTo({
                 top: 0,
                 behavior: "smooth"
             }) */
    }

    removeSidebar = () => {
        this.sidebar.classList.contains('sidebar--full-page') && this.page.classList.remove('page_screen_full')

        this.sidebar.classList.remove('page__sidebar--active');
        this.page.classList.remove('page--noScroll');
        this.sidebarBody.classList.remove('sidebar__body--active');
        this.sidebarOverlay.classList.remove('overlay--show');
        this.hamburgerMenu.classList.remove('hamburger-menu__content--active');
    }

    menuItemsInit = () => {
        this.menuItems.map((menuItem, i) => menuItem.onclick = () => { this.changeItemStyle(i) })
        /*   this.menuItems.map((menuItem, i) => menuItem.onmouseover = () => { this.hoverItemStyleOver(menuItem) })
          this.menuItems.map((menuItem, i) => menuItem.onmouseout = () => { this.hoverItemStyleOut(menuItem) }) */
    }

    changeItemStyle = (i) => {
        console.log('object')
        const activeMenuItem = document.querySelector('.menu__items--active');
        activeMenuItem.classList.remove('menu__items--active');
        this.menuItems[i].classList.add('menu__items--active');
        /* this.menuItems.map((menuItem, z) => i !== z && (console.log(z))) */
    }


}


document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('.page');
    const sections = [...document.querySelectorAll('.section')];
    const menuItems = [...document.querySelectorAll('.menu__items')];
    const mobileMenuItems = [...document.querySelectorAll('.mobile-menu__item')];
    const sidebar = document.querySelector('.page__sidebar');
    const sidebarBody = document.querySelector('.sidebar__content');
    const sidebarOverlay = document.querySelector('.overlay');
    const hamburgerMenu = document.querySelector('.hamburger-menu__content');
    const scroll = new Sidebar(page, sections, menuItems, mobileMenuItems, hamburgerMenu, sidebar, sidebarBody, sidebarOverlay);

    scroll.menuItemsInit();
    scroll.sidebarManipulation()

})

class Slider {

    constructor(content, main, arrow, slideResizeOberverObj, toggleBtn, toggleMoveGif, stopperFactor, slideNumber, toggleResizeOberverObj) {

        this.content = content,
            this.main = main,
            this.arrow = arrow,
            this.slideResizeOberverObj = slideResizeOberverObj,
            this.toggleResizeOberverObj = toggleResizeOberverObj,
            this.toggleBtn = toggleBtn,
            this.toggleMoveGif = toggleMoveGif,
            this.slideNumber = slideNumber,
            this.isDragging = false,
            this.currentIndex = 0,
            this.startPos = 0,
            this.translateStepX = 0,
            this.currentTranslationX = 0,
            this.currentTranslationMove,
            this.margin = 0,
            this.elemntsMargins = 0,
            this.prevTranslation = 0,
            this.animationID = 0,
            this.stopperFactor = stopperFactor,
            this.oserver = null;
    }




    /*                                                ТАЧ СОБЫТИЕ                                             */

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


    contextMenu = () => {
        window.oncontextmenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false
        }
    }


    animation = () => {
        // анимация если драг активен
        this.setSliderPositionX(this.main, this.currentTranslationX);
        if (this.isDragging) requestAnimationFrame(this.animation)
    }


    touchStart = (i) => {

        // Начало тач события 
        return (event) => {

            this.main.classList.remove('carousel__content--smooth'); // удаляем плавность при движении, чтобы не было задержек
            this.startPos = this.getPositionX(event);                // узнаем стартовую позицию мыши
            this.isDragging = true;                                  // инициализируем перетаскивание
            this.animationID = requestAnimationFrame(this.animation) // запускаем анимацию
        }
    }


    touchMove = (e) => {

        // тач событие

        if (this.isDragging) { // если драг активен

            let currentPosition = this.getPositionX(e); // узнаем  позицию мыши
            // останавливаем транслэйт при выходе из контейнера 

            console.log(((this.translateStepX * this.content.length) + this.elemntsMargins).toFixed());
            console.log((Math.abs(this.currentTranslationX) + 100).toFixed());
            if ((Math.abs(this.currentTranslationX) + 100).toFixed() <= ((this.translateStepX * this.content.length) + this.elemntsMargins).toFixed() && this.currentTranslationX < 2) {
                this.currentTranslationX = this.absToPercent(((this.prevTranslation * this.main.clientWidth / 100) + currentPosition - this.startPos), this.main.clientWidth);
            }
        }
    }


    touchEnd = (e) => {
        // Остановка тач события


        cancelAnimationFrame(this.animationID)                          // отмена анимацию
        this.isDragging = false;                                        // отсановка перетаскивания
        this.main.classList.add('carousel__content--smooth');           // возвращаем плавность для событий на клик стрелки 

        // Изменям индекс в зависимости от текущей трансформации
        if (this.currentIndex < this.content.length) {
            Math.abs(this.currentTranslationX) > ((Math.abs(this.prevTranslation) + this.translateStepX / 3)) && (this.currentIndex++);
        }
        if (this.currentIndex >= 0) {
            Math.abs(this.currentTranslationX) < ((Math.abs(this.prevTranslation) - this.translateStepX / 3)) && (this.currentIndex--);
        }


        this.setPrevTranslation();                                      // Устанавливаем предыдущий транслэйте
        this.setCurrentXTranslation();                                  // Устанавливаем текущий транслэйте
        this.changeArrowActivity();                                     // Изменяем активность кнопопк
        this.setSliderPositionX(this.main, this.currentTranslationX);   // Устанавливаем транслэйт для слайдера
        this.getUnactiveElts();                                         // меняем опасити элементов 
    }




    /*                                                СОБЫТИЕ НА КЛИК СТРЕЛОК                                             */

    initArrowsBtns = () => {
        this.arrow[0].addEventListener("click", () => this.left()); // левая стрелка

        this.arrow[1].addEventListener("click", () => this.rigth()); // праввая стрелка
    }

    rigth = () => {
        if (this.currentIndex < this.getMainToContentIndex()) {
            this.currentIndex++;
            this.setPrevTranslation();            // Устанавливаем предыдущий транслэйт
            this.setCurrentXTranslation();        // Устанавливаем текущий транслэйт
            this.changeArrowActivity();           // Изменяем активность кнопопк
            this.setSliderPositionX(this.main, this.currentTranslationX);   // Устанавливаем транслэйт для слайдера
            this.getUnactiveElts();               // меняем опасити элементов 
        }

    }


    left = () => {
        if (Math.abs(this.currentTranslationX) > 0) {
            this.currentIndex--
            this.setPrevTranslation();            // Устанавливаем предыдущий транслэйт
            this.setCurrentXTranslation();        // Устанавливаем текущий транслэйт
            this.changeArrowActivity();           // Изменяем активность кнопопк
            this.setSliderPositionX(this.main, this.currentTranslationX);   // Устанавливаем транслэйт для слайдера
            this.getUnactiveElts();               // меняем опасити элементов 
        }
    }




    /*                                                СОБЫТИЕ НА КЛИК КНОПОК                                         */

    initToggleBtns = () => {
        this.toggleBtn.map((item, i) => item.addEventListener("click", () => {
            !this.toggleMoveGif.classList.contains('togglers__item-move--smooth') && this.toggleClasses(this.toggleMoveGif, 'togglers__item-move--smooth')
            this.currentIndex = i;
            this.setCurrentXTranslation();                                  // Меняем текущий транслэйт слайдер 
            this.setSliderPositionX(this.main, this.currentTranslationX);  // Устанавливаем транслэйт для слайдера
            console.log(item)
            this.setSlideText(this.slideNumber, item)
            if (this.direction() === 'column') {
                this.setSliderPositionY(this.toggleMoveGif, this.setCurrentFullBodyTranslation(100))   // Меняем текущий транслэйт движущегося элемента и станавливаем транслэйт для движущегося элемента
            } else {
                this.setSliderPositionX(this.toggleMoveGif, this.setCurrentFullBodyTranslation(100))
            }
        }))
    }




    direction = () => window.getComputedStyle(this.toggleBtn[0].parentElement).flexDirection;



    /*                                                ОБЩИЕ МЕТОДЫ                                         */


    /*                                                СМЕНА АКТИВНОСТИ СТРЕЛОК                                        */

    changeArrowActivity = () => {

        // меняем активность стрелок

        console.log(this)
        // Левая стрелка
        if (Math.abs(this.currentTranslationX) > 0) {
            this.arrow[0].classList.contains('carousel__toggle-btn--unactive') && this.arrow[0].classList.remove('carousel__toggle-btn--unactive')
        } else {
            !this.arrow[0].classList.contains('carousel__toggle-btn--unactive') && this.arrow[0].classList.add('carousel__toggle-btn--unactive');
        }


        // Правая стрелка
        if (this.currentIndex === this.getMainToContentIndex()) {
            this.arrow[1].classList.add('carousel__toggle-btn--unactive');
        } else {
            this.arrow[1].classList.remove('carousel__toggle-btn--unactive');
        }
    }




    /*                                                МЕНЯЕМ ПРОЗРАЧНОСТЬ ВЫПАДАЮЩИХ ЭЛЕМЕНТОВ                                      */

    getUnactiveElts = () => this.content.map((item, i) => {
        // меняем опасити элементов 
        const translationtoAbs = this.percentToAbsolute(Math.abs(this.currentTranslationX), this.main.clientWidth).toFixed();
        if (this.main.clientWidth <= ((item.offsetLeft + this.margin + i) - translationtoAbs) || item.offsetLeft + i - translationtoAbs < 0) {
            item.classList.add('carousel__item--unActive')
        } else {
            (item.classList.contains('carousel__item--unActive') && item.classList.remove('carousel__item--unActive'))
        }

    })




    /*                                                resizeObserver API                                     */


    slideRzeObrCallback = (entries) => {

        // Настройка слайдера после изменения ширина слайда(в процентом соотношении)
        this.getTranslateStepX(); // Узнаем шаг для X транслэйта

        // Уменьшаем индекс при переполнении
        if (this.currentIndex > this.getMainToContentIndex()) {
            const decresseIndex = this.currentIndex - this.getMainToContentIndex();
            this.currentIndex -= decresseIndex;
        }
        console.log(this.currentIndex)
        this.setPrevTranslation();           // Устанавливаем предыдущий транслэйт
        this.getMainToContentIndex()         // Узнаем насколько могут переполнятся элементы с контейнера слайдера, берется как отношенее элеметов в контецнера слайдера к общему количеству элементов в слайдере
        this.setCurrentXTranslation();       // Устанавливаем текущий транслэйт
        this.changeArrowActivity();          // Изменяем активность кнопопок
        this.setSliderPositionX(this.main, this.currentTranslationX);  // Устанавливаем транслэйт для слайдера
        this.getUnactiveElts();              // меняем опасити элементов 

    }

    slideResizeObserver = () => {

        // resizeInteraction событие, которое срабатывает при измненнении ширины элемента
        this.resizerSlide = new ResizeObserver(this.slideRzeObrCallback);
        this.resizerSlide.observe(this.slideResizeOberverObj)
    }

    toggleContainerRzeObrCallback = () => {
        this.toggleMoveGif.classList.contains('togglers__item-move--smooth') && this.toggleClasses(this.toggleMoveGif, 'togglers__item-move--smooth')
        if (this.direction() === 'column') {
            this.setSliderPositionY(this.toggleMoveGif, this.setCurrentFullBodyTranslation(100))   // Меняем текущий транслэйт движущегося элемента и станавливаем транслэйт для движущегося элемента
        } else {
            this.setSliderPositionX(this.toggleMoveGif, this.setCurrentFullBodyTranslation(100))
        }

    }




    toggleContainerResizeObserver = () => {
        this.resizerToggler = new ResizeObserver(this.toggleContainerRzeObrCallback);
        console.log(this.toggleResizeOberverObj)
        this.resizerToggler.observe(this.toggleResizeOberverObj)
    }



    /*                                               ТЕХНИЧЕСКИЕ МЕТОДЫ                                  */

    toggleClasses = (element, classList) => element.classList.toggle(classList)




    /*                                               СМЕНА КЛАССОВ                                 */




    getMainToContentIndex = () => this.content.length - ((this.absToPercent(this.main.clientWidth, this.getTotalElementsWidth()).toFixed() / 100) * this.content.length).toFixed()  // индекс отношения контэйнера слайдера к его контентой части


    setSliderPositionX = (element, translation) => element.style.transform = `translateX(${translation}%)`  // Устанавливаем транслэйт для элемента по x координате

    setSliderPositionY = (element, translation) => element.style.transform = `translateY(${translation}%)` // Устанавливаем транслэйт для элемента по y координате


    getPositionX = (event) => event.type.includes('mouse') ? event.pageX : event.touches[0].clientX; // Позиция мыши/пальца


    // Переводы чисел

    absToPercent = (absolute, container) => absolute / container * 100  // Перевод в проценты

    percentToAbsolute = (percent, container) => percent / 100 * container  // Перевод в абсолюбное значение


    setSlideText = (slide, elem) => slide.textContent = elem.textContent // Устанавливаем номер слайда


    setPrevTranslation = () => this.prevTranslation = this.currentIndex * - this.absToPercent(this.content[0].clientWidth + this.margin, this.main.clientWidth);// Устанавливаем предыдущий трансл


    setCurrentXTranslation = () => this.currentTranslationX = (this.currentIndex) * -this.translateStepX; //Меняем текущий X транслэйт

    setCurrentFullBodyTranslation = (translate) => (this.currentIndex) * translate; //Меняем текущий Y транслэйт


    getMargin = () => {
        // Узнаем отутупы для правельного транслэйта
        this.margin = +getComputedStyle(this.content[0]).marginLeft.split('px').join('');
        this.elemntsMargins = this.absToPercent((this.margin * this.content.length), this.getTotalElementsWidth()) - this.stopperFactor;

    }

    getTranslateStepX = () => this.translateStepX = (this.content[0].clientWidth + this.margin) / this.main.clientWidth * 100  // Узнаем шаг для X транслэйта



    getTotalElementsWidth = () => (this.content[0].clientWidth + this.margin) * this.content.length // Узнаем общую ширину для всех эелементов слайдера

}



document.addEventListener('DOMContentLoaded', () => {



    // Giftset Slider

    const contentGif = [...document.querySelectorAll(".services__slide")];
    const mainGif = document.querySelector(".services__body");
    const toggleBtnGif = [...document.querySelectorAll(".togglers__item")];
    const toggleMoveGif = document.querySelector(".togglers__item-move");
    const slideNumber = document.querySelector(".togglers__slide-number");
    const toggleResizeOberverGif = document.querySelector(".togglers__resize-observer");
    const sliderGiftset = new Slider(contentGif, mainGif, null, null, toggleBtnGif, toggleMoveGif, null, slideNumber, toggleResizeOberverGif);

    sliderGiftset.getMargin();
    sliderGiftset.getTranslateStepX();
    sliderGiftset.initToggleBtns();
    sliderGiftset.toggleContainerResizeObserver();

})


/* const carousel = {
    type: "carousel",
    settings: {
        customSetting: {
            effects: "",
            touch: "true/false",
        },
        switchers: {
            dots: "true/false",
            arrows: "true/false",
        }
    }
}

const slider3d = {
    type: "3dslider",
    settings: {
        customSetting: {
            effects: "rota",
        },
        switchers: {
            dots:  "true/false",
            arrows: "true/false",
            togglers: "true/false",
        }
    }
}

const sliderGif = new Slider (

) */