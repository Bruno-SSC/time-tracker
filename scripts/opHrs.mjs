import { activity } from "./main.js"
import HRS from "./HRS.mjs"

export default function addPlusMinusFunc() {

    for (let each of activity) {
        var card = each.parentElement.parentElement
        const plusBTN = card.children[1].children[0].children[0]
        const minusBTN = card.children[1].children[0].children[2]
        plusBTN.addEventListener('click', addHour)
        minusBTN.addEventListener('click', subHour)

    }

    function addHour() {
        let x = parseInt(this.parentElement.children[1].innerHTML)
        x++
        this.parentElement.children[1].innerHTML = Math.abs(x)
        HRS(this.parentElement.parentElement)
    }
    function subHour() {
        let x = parseInt(this.parentElement.children[1].innerHTML)
        x--
        if (x < 0) {
            alert('você não pode voltar no tempo!')
        }
        this.parentElement.children[1].innerHTML = Math.abs(x)
        HRS(this.parentElement.parentElement)
    }
}
