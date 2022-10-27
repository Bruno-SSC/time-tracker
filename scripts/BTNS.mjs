import addHours from './cardEditer.mjs'
import subHours from './cardEditer.mjs'

export default function BTNS(oper, elem) {
    const div = document.getElementsByClassName('activity-hours')

    if (elem != undefined && oper == 'show') {
        let div = elem.parentElement.parentElement
        let plusBTNS = div.children[1].children[0].children[0]
        let minusBTNS = div.children[1].children[0].children[2]

        plusBTNS.style.display = 'inline'
        minusBTNS.style.display = 'inline'
    } else if (elem != undefined && oper == 'hide') {
        let div = elem.parentElement.parentElement
        let plusBTNS = div.children[1].children[0].children[0]
        let minusBTNS = div.children[1].children[0].children[2]

        plusBTNS.style.display = 'none'
        minusBTNS.style.display = 'none'
    }

    for (let each of div) {
        let plusBTNS = each.children[0].children[0]
        let minusBTNS = each.children[0].children[2]

        if (oper == 'hide' && elem == undefined) {
            plusBTNS.style.display = 'none'
            minusBTNS.style.display = 'none'
        }
    }

}
