export default function HRS(card) {
    if (card == undefined) {
        const h = document.querySelectorAll('.activity .activity-hours h1')
        const p = document.querySelectorAll('.activity .activity-hours p')
        for (let each of h) {
            each.children[1].innerHTML += 'hrs'
        }
        for (let each of p) {
            each.children[0].innerHTML += 'hrs'
        }

    } else {
        const h = card.children[0].children[1]
        h.innerHTML += 'hrs'
    }

}