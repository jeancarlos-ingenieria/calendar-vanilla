const actualYear = 2025
const locale = 'es'

const months = [...Array(12).keys()]
const weekDays = [...Array(7).keys()]
const intlWeekDays = new Intl.DateTimeFormat(locale, { weekday: 'long' })
const intl = new Intl.DateTimeFormat(locale, {
  month: 'long'
})

const weekDayNames = weekDays.map(weekDayIndex => {
  const date = new Date(2024, 6, weekDayIndex + 1)
  const weekDayName = intlWeekDays.format(date)
  return weekDayName
})

const renderedWeekDays = weekDayNames.map(weekDayName => `<li class="day-name">${weekDayName[0].toUpperCase()}</li>`).join('')

const calendar = months.map(monthKey => {
  const monthName = intl.format(new Date(actualYear, monthKey))
  const nextMonthIndex = (monthKey + 1) % 12
  const daysOfMonth = new Date(actualYear, nextMonthIndex, 0).getDate()
  const startsOn = new Date(actualYear, monthKey, 1).getDay()
  return { monthName, daysOfMonth, startsOn }
})

const html = calendar.map(({ monthName, daysOfMonth, startsOn }) => {
  const days = [...Array(daysOfMonth).keys()]
  const firstDayAttributes = `class='first-day' style='--first-day-start: ${startsOn}'`
  const renderedDays = days.map(
    (day, index) =>
        `<li ${index === 0 ? firstDayAttributes : ''}>${day + 1}</li>`
  )
    .join('')
  const monthNameRender = monthName.charAt(0).toUpperCase() + monthName.slice(1)
  const title = `<h2><strong>${monthNameRender}</strong> ${actualYear}</h2>`
  return `<div>${title}<ol>${renderedWeekDays}${renderedDays}</ol></div>`
}).join('')

document.querySelector('h1').innerHTML = `Calendario de ${actualYear}`
document.querySelector('main').innerHTML = html
