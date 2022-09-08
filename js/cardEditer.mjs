import BTNS from './BTNS.mjs'
import HRS from './HRS.mjs'

export default function editer() {

    const card = this.parentElement.parentElement

    const cardInfo = this.parentElement
    const cardTitle = this.parentElement.children[0]

    const cardHours = card.children[1]
    const numberHours = cardHours.children[0].children[1]
    const h1 = cardHours.children[0]

    if (cardHours.children[0].children[0].style.display == 'inline') {

        BTNS('hide', this)
        h1.style.justifyContent = 'flex-start'

    } else {
        h1.style.justifyContent = 'space-around'

        BTNS('show', this)

    }

}
