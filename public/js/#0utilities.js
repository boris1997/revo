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