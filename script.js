const monthAndYear = document.querySelector(".calendar__months-year");
const leftBtn = document.querySelector(".calendar__button-left");
const rightBtn = document.querySelector(".calendar__button-right");
const daysCalendar = document.querySelector(".calendar__days");


const newEventPopup = document.querySelector(".popup");
const popupInput = document.querySelectorAll(".popup__input");
const popupInputDescr = document.querySelector(".popup__input-descr");
const closeBtn = document.querySelector(".popup__close-btn");
const readyBtn = document.getElementById("readyBtn");
const deleteBtn = document.getElementById("deleteBtn");
const todayBtn = document.querySelector(".calendar__today-button");


const existEventPopup = document.querySelector(".popup_existEvent");
const popupNameEvent = document.querySelector(".popup__nameEvent");
const popupDateEvent = document.querySelector(".popup__dateEvent");
const popupNamesEvent = document.querySelector(".popup__namesEvent");
const popupDescrEvent = document.getElementById("descrExistEvent");
const closeBtnExistEvent = document.getElementById("closeBtnExistEvent");
const readyBtnExistEvent = document.getElementById("readyBtnExistEvent");
const deleteBtnExistEvent = document.getElementById("deleteBtnExistEvent");

let scrollCount = 0;
let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];

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

function openPopup(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        existEventPopup.style.display = "block";
        popupNameEvent.textContent = eventForDay.Event;
        popupDateEvent.textContent = eventForDay.day;
        popupNamesEvent.textContent = eventForDay.Name;
        popupDescrEvent.value = eventForDay.Descr;
    } else {
        newEventPopup.style.display = "block";
    }
}

function closePopup() {
    newEventPopup.style.display = "none";
    existEventPopup.style.display = "none";
    popupInput.forEach(function(text) {
        text.value = "";
    });
    popupInputDescr.value = "";
    displayCalendar();
}

function saveEvent() {
    popupInput.forEach(function(text) {
            let objDataInput = {};
            objDataInput.date = clicked;
            objDataInput.Event = popupInput[0].value;
            objDataInput.day = popupInput[1].value;
            objDataInput.Name = popupInput[2].value;
            objDataInput.Descr = popupInputDescr.value;
            events.push(objDataInput);
            localStorage.setItem("events", JSON.stringify(events));
            closePopup();
    });
}

function deleteEvent() {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closePopup();
}

function editDescr() {
    const eventForDay = events.find(e => e.date === clicked);
    eventForDay.Descr = popupDescrEvent.value;
    localStorage.setItem('events', JSON.stringify(events));
    closePopup();
}

function displayCalendar() {
    const date = new Date();
    if (scrollCount !== 0) {
        date.setMonth(new Date().getMonth() + scrollCount);
    }
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
            dayString = `${prevLastDay - countPrevDays + 1}/${date.getMonth()-1}/${date.getFullYear()}`;
            countPrevDays--;
            indexWeekdays++;
        } else if (i <= lastDay && indexWeekdays < 7) {
            daySquare.innerHTML = `<p>${weekdaysArr[indexWeekdays]}, ${i - firstDayIndex}</p>`;
            dayString = `${i - firstDayIndex}/${date.getMonth()}/${date.getFullYear()}`;
            indexWeekdays++;
        } else if (i <= lastDay + firstDayIndex) {
            daySquare.innerHTML = `<p>${i - firstDayIndex}</p>`;
            dayString = `${i - firstDayIndex}/${date.getMonth()}/${date.getFullYear()}`;
        } else { 
            daySquare.innerHTML = `<p>${i - firstDayIndex - lastDay}</p>`;
            dayString = `${i - firstDayIndex - lastDay}/${date.getMonth()+1}/${date.getFullYear()}`;
        }

        const eventForDay = events.find(e => e.date === dayString);
        const eventP = document.createElement("p");
        const nameP = document.createElement("p");
        if (eventForDay) {
            daySquare.style.backgroundColor = "#C2E4FE";
            eventP.classList.add("day__event");
            eventP.textContent = eventForDay.Event;
            nameP.classList.add("day__name");
            nameP.textContent = eventForDay.Name;
            daySquare.appendChild(eventP);
            daySquare.appendChild(nameP);
        } 

        daysCalendar.appendChild(daySquare);

        daySquare.addEventListener("mouseenter", function(event) {
            if (eventP.textContent || nameP.textContent) {
                event.target.style.backgroundColor = "#27A1FF";
            }
        });

        daySquare.addEventListener("mouseleave", function(event) {
            if (eventP.textContent || nameP.textContent) {
                event.target.style.backgroundColor = "#C2E4FE";
            }
        });
        daySquare.addEventListener('click', () => openPopup(dayString));
    }
}


leftBtn.addEventListener("click", function() {
    scrollCount--;
    displayCalendar();
});

rightBtn.addEventListener("click", function() {
    scrollCount++;
    displayCalendar();
});

todayBtn.addEventListener("click", function() {
    scrollCount = 0;
    displayCalendar();
});

closeBtn.addEventListener("click", closePopup);
readyBtn.addEventListener("click", saveEvent);
deleteBtn.addEventListener("click", deleteEvent);

deleteBtnExistEvent.addEventListener("click", deleteEvent);
closeBtnExistEvent.addEventListener("click", closePopup);
readyBtnExistEvent.addEventListener("click", editDescr);

displayCalendar();