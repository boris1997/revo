const footerYear = document.querySelector('.footer-contacts__year ')

const getedYear = () => footerYear.textContent = `${new Date().getFullYear()}`


getedYear()