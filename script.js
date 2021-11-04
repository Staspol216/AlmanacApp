const monthAndYear = document.querySelector(".calendar__months-year");
const calendarDays = document.querySelector(".calendar__days");
const leftBtn = document.querySelector(".calendar__button-left");
const rightBtn = document.querySelector(".calendar__button-right");

const date = new Date();

function displayCalendar() {
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay() - 1;
    const daysNextMonths = 7 - lastDayIndex - 1;
    let firstDayIndex = date.getDay() - 1;

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
    monthAndYear.innerHTML = monthsArr[date.getMonth()] + ` ${date.getFullYear()}`;

    const weekdaysArr = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье"
    ];

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

    for (let j = 1; j <= daysNextMonths; j++) {
        days += `<div><p>${j}</p></div>`;
    }

    calendarDays.innerHTML = days;
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




