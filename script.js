const monthAndYear = document.querySelector(".calendar__months-year");
const calendarDays = document.querySelector(".calendar__days");

const date = new Date();
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
console.log(lastDay);

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
    "Декабрь",
];

monthAndYear.innerHTML = monthsArr[date.getMonth()] + ` ${date.getFullYear()}`;

let days = "";


for (let i = 1; i <= lastDay; i++) {
    days += `<div><p>${i}</p></div>`;
}
calendarDays.innerHTML = days;



