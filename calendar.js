function el(id){return document.getElementById(id)}
const monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"]
let today=new Date()
let viewMonth=today.getMonth()
let viewYear=today.getFullYear()

function renderCalendar(month, year){
  el('monthYear').textContent = `${monthNames[month]} ${year}`
  const daysContainer = el('days')
  daysContainer.innerHTML = ''
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month+1, 0).getDate()
  const prevDays = firstDay
  // previous month days (muted)
  const prevMonthLast = new Date(year, month, 0).getDate()
  for(let i=prevMonthLast - prevDays +1; i<=prevMonthLast; i++){
    const d = document.createElement('div')
    d.className='day other'
    d.textContent = i
    daysContainer.appendChild(d)
  }
  for(let d=1; d<=daysInMonth; d++){
    const cell = document.createElement('div')
    cell.className = 'day'
    cell.textContent = d
    const cellDate = new Date(year, month, d)
    if(cellDate.toDateString() === today.toDateString()) cell.classList.add('today')
    cell.addEventListener('click', ()=>{
      document.querySelectorAll('.day').forEach(n=>n.classList.remove('selected-day'))
      cell.classList.add('selected-day')
      el('selected').textContent = `Selected: ${monthNames[month]} ${d}, ${year}`
    })
    daysContainer.appendChild(cell)
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  el('prev').addEventListener('click', ()=>{
    viewMonth--
    if(viewMonth<0){viewMonth=11;viewYear--}
    renderCalendar(viewMonth, viewYear)
  })
  el('next').addEventListener('click', ()=>{
    viewMonth++
    if(viewMonth>11){viewMonth=0;viewYear++}
    renderCalendar(viewMonth, viewYear)
  })
  renderCalendar(viewMonth, viewYear)
})
