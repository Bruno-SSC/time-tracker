const daily = document.getElementById('report-time').querySelector('p:nth-child(1)')
const weekly = document.getElementById('report-time').querySelector('p:nth-child(2)')
const monthly = document.getElementById('report-time').querySelector('p:nth-child(3)')

daily.addEventListener('click', ()=>{
    location.href = 'daily.html'
})
weekly.addEventListener('click', ()=>{
    location.href = 'index.html'
})
monthly.addEventListener('click', ()=>{
    location.href = 'monthly.html'
})
