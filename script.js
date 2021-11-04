const monthAndYear = document.querySelector(".calendar__months-year");
const calendarDays = document.querySelector(".calendar__days");
const leftBtn = document.querySelector(".calendar__button-left");
const rightBtn = document.querySelector(".calendar__button-right");
const daysCalendar = document.querySelector(".calendar__days");

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

let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];


function displayCalendar() {
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay() - 1;
    const daysNextMonths = 7 - lastDayIndex - 1;
    let firstDayIndex = date.getDay() - 1;

    date.setDate(1);

    monthAndYear.innerHTML = monthsArr[date.getMonth()] + ` ${date.getFullYear()}`;

    let indexWeekdays = 0;
    const sumAllDays = firstDayIndex + lastDay + daysNextMonths;
    let countPrevDays = firstDayIndex;

    daysCalendar.innerHTML = "";

    for (let i = 1; i <= sumAllDays; i++ ) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");

        const dayString = "";

        if (i < (firstDayIndex + 1)) {
            daySquare.innerHTML = `<p>${weekdaysArr[indexWeekdays]}, ${prevLastDay - countPrevDays + 1}</p>`;
            countPrevDays--;
            indexWeekdays++;
        } else if (i <= lastDay && indexWeekdays < 7) {
            daySquare.innerHTML = `<p>${weekdaysArr[indexWeekdays]}, ${i - firstDayIndex}</p>`;
            indexWeekdays++;
        } else if (i <= lastDay + firstDayIndex) {
            daySquare.innerHTML = `<p>${i - firstDayIndex}</p>`;
        } else { 
            daySquare.innerHTML = `<p>${i - firstDayIndex - lastDay}</p>`;
        }
        daysCalendar.appendChild(daySquare);
    }
}

leftBtn.addEventListener("click", function() {
    date.setMonth(date.getMonth() - 1);
    displayCalendar();
});

rightBtn.addEventListener("click", function() {
    date.setMonth(date.getMonth() + 1);
    displayCalendar();
});

displayCalendar();