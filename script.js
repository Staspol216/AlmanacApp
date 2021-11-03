let monthAndYear = document.querySelector(".calendar__months-year");

const date = new Date();

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

