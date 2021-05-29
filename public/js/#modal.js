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