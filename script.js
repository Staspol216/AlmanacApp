const monthAndYear = document.querySelector(".calendar__months-year");
const leftBtn = document.querySelector(".calendar__button-left");
const rightBtn = document.querySelector(".calendar__button-right");
const daysCalendar = document.querySelector(".calendar__days");
const closeBtn = document.querySelector(".popup__close-btn");
const readyBtn = document.getElementById("readyBtn");
const deleteBtn = document.getElementById("deleteBtn");
const newEventPopup = document.querySelector(".popup");

const popupInput = document.querySelectorAll(".popup__input");
const popupInputDescr = document.querySelector(".popup__input-descr");



const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

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


function openPopup(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        console.log ("already exists");
    } else {
        newEventPopup.style.display = "block";
    }

}

function closePopup() {
    newEventPopup.style.display = "none";
    popupInput.forEach(function(text) {
        text.value = "";
    });
    displayCalendar();
}


function displayCalendar() {
    date.setDate(1);
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay() - 1;
    const daysNextMonths = 7 - lastDayIndex - 1;
    let firstDayIndex = date.getDay() - 1;

    monthAndYear.innerHTML = monthsArr[date.getMonth()] + ` ${date.getFullYear()}`;

    let indexWeekdays = 0;
    const sumAllDays = firstDayIndex + lastDay + daysNextMonths;
    let countPrevDays = firstDayIndex;

    daysCalendar.innerHTML = "";

    for (let i = 1; i <= sumAllDays; i++ ) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");

        let dayString = "";
        if (i < (firstDayIndex + 1)) {
            daySquare.innerHTML = `<p>${weekdaysArr[indexWeekdays]}, ${prevLastDay - countPrevDays + 1}</p>`;
            dayString = `${prevLastDay - countPrevDays + 1}/${month-1}/${year}`;
            countPrevDays--;
            indexWeekdays++;
        } else if (i <= lastDay && indexWeekdays < 7) {
            daySquare.innerHTML = `<p>${weekdaysArr[indexWeekdays]}, ${i - firstDayIndex}</p>`;
            dayString = `${i - firstDayIndex}/${month}/${year}`;
            indexWeekdays++;
        } else if (i <= lastDay + firstDayIndex) {
            daySquare.innerHTML = `<p>${i - firstDayIndex}</p>`;
            dayString = `${i - firstDayIndex}/${month}/${year}`;
        } else { 
            daySquare.innerHTML = `<p>${i - firstDayIndex - lastDay}</p>`;
            dayString = `${i - firstDayIndex - lastDay}/${month+1}/${year}`;
        }
        const eventForDay = events.find(e => e.date === dayString);
        if (eventForDay) {
            const eventP = document.createElement("p");
            eventP.classList.add("day__event");
            eventP.textContent = eventForDay.Event;
            const nameP = document.createElement("p");
            nameP.classList.add("day__name");
            nameP.textContent = eventForDay.Name;
            daySquare.appendChild(eventP);
            daySquare.appendChild(nameP);
        }
        daysCalendar.appendChild(daySquare);
        daySquare.addEventListener('click', () => openPopup(dayString));
    }
}

let allDays = document.querySelectorAll(".day");

leftBtn.addEventListener("click", function() {
    date.setMonth(date.getMonth() - 1);
    displayCalendar();
});

rightBtn.addEventListener("click", function() {
    date.setMonth(date.getMonth() + 1);
    displayCalendar();
});
closeBtn.addEventListener("click", closePopup);

readyBtn.addEventListener("click", function() {
    popupInput.forEach(function(text) {
        if (text.value) {
            text.classList.remove("error");
            let objDataInput = {};
            objDataInput.date = clicked;
            objDataInput.Event = popupInput[0].value;
            objDataInput.day = popupInput[1].value;
            objDataInput.Name = popupInput[2].value;
            events.push(objDataInput);
            localStorage.setItem("events", JSON.stringify(events));
            closePopup();
        } else {
            text.classList.add("error");
        }
    });
});





displayCalendar();