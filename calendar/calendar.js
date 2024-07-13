const calendarDates = document.getElementById("calendarDates");

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let date = today.getDate();
let day = today.getDay();

function leadingZero(month) {
    return month < 10 ? '0' + month : month;
}

function render() {
    renderTitle();
    renderCalendar();
}

function renderTitle() {
    document.getElementById("currentMonth").innerText = `${year}년 ${leadingZero(month + 1)}월`
}

function prev() {
    if(month - 1 < 0) {
        year -= 1;
        month = 11;
    } else {
        month = month - 1;
    }
    render();
}

function next() {
    if(month + 1 > 11) {
        year += 1;
        month = 0;
    } else {
        month = month + 1;
    }
    render();
}

function renderCalendar() {
    document.getElementById("calendarDates").innerText = '';

    const firstDate = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDayOfWeek = firstDate.getDay();

    fillEmptyDiv(startDayOfWeek);
    fillDaysDiv(totalDays);
}

function fillEmptyDiv(startDayOfWeek) {
    for(let i = 0; i < startDayOfWeek; i++) {
        const empty = document.createElement("div");
        empty.classList.add("date", "empty");
        calendarDates.appendChild(empty);
    }
}

function fillDaysDiv(totalDays) {
    for(let i = 1; i <= totalDays; i++) {
        const date = document.createElement("div");
        date.classList.add("date", isToday(i));
        date.innerText = i;
        calendarDates.appendChild(date);
    }
}

function isToday(date) {
    if(year !== new Date().getFullYear()) return;
    if(month !== new Date().getMonth()) return;
    if(date !== new Date().getDate()) return;
    return "today";
}

function init() {
    render();
    document.getElementById("prevBtn").addEventListener('click', prev)
    document.getElementById("nextBtn").addEventListener('click', next);
}

init();
