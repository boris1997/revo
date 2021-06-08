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

