// todo: função que mostra as horas na tela baseada no tempo informado que por padrão é o daily

// todo: um event listener que ao ser executado executa essa função novamente porém com o novo tempo.

export function consult() {
    const nHours = document.querySelectorAll('.activity .activity-hours h1')

    for (let cardHour of nHours) {
        let cardName = cardHour.parentElement.parentElement.children[0].children[0].innerHTML
        cardHour.innerHTML = localStorage.getItem(cardName.toLowerCase())
    }
}

export function setHours() {
    const nHours = document.querySelectorAll('.activity .activity-hours h1')

    for (let cardHour of nHours) {
        let cardName = cardHour.parentElement.parentElement.children[0].children[0].innerHTML
        localStorage.setItem(cardName.toLowerCase(), cardHour.innerHTML)
    }
}

export function clean() {
    localStorage.clear()
}

// toda vez que abre a página ele checa o objeto daily (ou outro) e preenche o ultimo registro de horas para cada card baseado no nome do card

// toda vez que atualizar a página ele set a hora atual relacionada ao daily (ou outro) na base de dados ( ele basicamente atualiza o objeto daily com os novos cardHours)

// key => daily = object ->  cardName: work, hours: cardHour