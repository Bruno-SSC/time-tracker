// imports
import { consult, setHours, clean } from "./CRUD.mjs";
import editer from "./cardEditer.mjs";
import BTNS from './BTNS.mjs'
import HRS from "./HRS.mjs";
import addPlusMinusFunc from "./opHrs.mjs";

// value editer
export const activity = document.querySelectorAll('.activity .activity-info p:nth-child(2)')
for (let each of activity) each.addEventListener('click', editer)

// BTNS function 
addPlusMinusFunc() 


// hiding BTNS
BTNS('hide')

// todo -> criar uma função que leia todos os card e guarde os dados em um objeto com cardName: cardHours e key daily

const timeZones = document.getElementById('report-time')
const daily = timeZones.children[0]
const weekly = timeZones.children[1]
const monthly = timeZones.children[2]

daily.addEventListener('click', function () {
    // consulta o objeto daily e preenche os cards conforme o nome do mesmo

})

weekly.addEventListener('click', function () {
    // consulta o objeto weekly e preenche os cards conforme o nome do mesmo

})

monthly.addEventListener('click', function () {
    // consulta o objeto monthly e preenche os cards conforme o nome do mesmo

})


// Formating HRS
HRS()