const monthAndYear = document.querySelector(".calendar__months-year");
const calendarDays = document.querySelector(".calendar__days");

const date = new Date();
const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

let firstDayIndex = date.getDay() - 1;
const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay() - 1;

date.setDate(1);

const monthsArr = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];

const weekdaysArr = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье"
];

monthAndYear.innerHTML = monthsArr[date.getMonth()] + ` ${date.getFullYear()}`;

let days = "";
let indexWeekadys = 0;

while (firstDayIndex > 0) {
    days += `<div><p>${weekdaysArr[indexWeekadys]}, ${prevLastDay - firstDayIndex + 1}</p></div>`;
    firstDayIndex--;
    indexWeekadys++;
}

for (let i = 1; i <= lastDay; i++) {
    if ( indexWeekadys < 7) {
    days += `<div><p>${weekdaysArr[indexWeekadys]}, ${i}</p></div>`;
    indexWeekadys++;
    } else {
        days += `<div><p>${i}</p></div>`;
    }
}

const daysNextMonths = 7 - lastDayIndex - 1;

for (let j = 1; j <= daysNextMonths; j++) {
    days += `<div><p>${j}</p></div>`;
}

calendarDays.innerHTML = days;



