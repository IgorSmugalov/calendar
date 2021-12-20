/////////////////////////////////////////////////////////////

let globalCurrentYear = new Date().getFullYear();
let globalCurrentMonth = new Date().getMonth();
const monthList = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


//////////////////////////////////////////////////////////////

function printMonthAndYear(month, year) { // Выводит месяц и год на странице
	let monthName = monthList[month];
	let monthOutput = document.querySelector('.calendar__current-month');
	monthOutput.innerText = `${monthName} ${year} `;
};

function findCurrentDate() {
	const currentDate = new Date().getDate();
	const currentMonth = new Date().getMonth();
	const currentYear = new Date().getFullYear();
	return {
		currentDate,
		currentMonth,
		currentYear
	};
}

function createCalendarGrid() { //создаеn сетку координат 7 недель по 6 дней из div под даты
	const calendarDates = document.querySelector('#calendar');
	calendarDates.innerHTML = '';
	for (let dayGrid = 1; dayGrid <= 7 * 6; dayGrid++) {
		const date = document.createElement('div');
		date.classList.add('calendar__dates-item');
		date.setAttribute('id', `date${dayGrid}`);
		calendarDates.append(date);
	};
	return calendarDates;
};

function calculateCalendarParameters(month, year) {
	const numWeekDays = [7, 1, 2, 3, 4, 5, 6];
	const firstDay = new Date(year, month, 1);
	const numWeekdayForFirstMonthDay = numWeekDays[firstDay.getDay()];
	const daysInPreviousMonth = new Date(year, month, 0).getDate();
	const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
	const includedDaysFromPreviousMonth = Math.abs(1 - numWeekdayForFirstMonthDay);
	const firstIncludedDayFromPreviousMonth = daysInPreviousMonth - includedDaysFromPreviousMonth + 1;
	const includedDaysFromNextMonth = 43 - (numWeekdayForFirstMonthDay + daysInCurrentMonth);
	return {
		daysInPreviousMonth,
		daysInCurrentMonth,
		includedDaysFromPreviousMonth,
		firstIncludedDayFromPreviousMonth,
		includedDaysFromNextMonth,
		numWeekdayForFirstMonthDay,
	};
};

function fillCalendarVer3(month, year) {
	const calendarParameters = calculateCalendarParameters(month, year);
	const currentDate = findCurrentDate();
	let dateCoordinate = 1;
	let datesForPreviewMonth = calendarParameters.firstIncludedDayFromPreviousMonth;
	for (; datesForPreviewMonth <= calendarParameters.daysInPreviousMonth; datesForPreviewMonth++, dateCoordinate++) {
		const outerDatePreviewMoth = document.querySelector(`#date${dateCoordinate}`);
		outerDatePreviewMoth.append(datesForPreviewMonth);
		outerDatePreviewMoth.classList.add('calendar__dates--outer-date');
	}
	let datesForCurrentMonth = 1;
	for (; datesForCurrentMonth <= calendarParameters.daysInCurrentMonth; datesForCurrentMonth++, dateCoordinate++) {
		document.querySelector(`#date${dateCoordinate}`).append(datesForCurrentMonth);
	}
	let datesForNextMonth = 1;
	for (; datesForNextMonth <= calendarParameters.includedDaysFromNextMonth; datesForNextMonth++, dateCoordinate++) {
		const outerDateNextMonth = document.querySelector(`#date${dateCoordinate}`);
		outerDateNextMonth.append(datesForNextMonth);
		outerDateNextMonth.classList.add('calendar__dates--outer-date');
	}
	if (month == currentDate.currentMonth & year == currentDate.currentYear) {
		const currentDateCoordinate = currentDate.currentDate + calendarParameters.includedDaysFromPreviousMonth;
		const currentDateContainer = document.querySelector(`#date${currentDateCoordinate}`);
		currentDateContainer.classList.add('calendar__dates--current-data')
		const currentDateBacklight = document.createElement('div');
		currentDateBacklight.classList.add('calendar__dates--current-data-backlight');
		currentDateContainer.append(currentDateBacklight);
	}
};

function CreateCalendar(month, year) {
	findCurrentDate();
	printMonthAndYear(month, year);
	createCalendarGrid(month, year);
	fillCalendarVer3(month, year);
};

CreateCalendar(globalCurrentMonth, globalCurrentYear);


function nextMounth() { // Следующий месяц по кнопке >
	if (globalCurrentMonth < 11 && globalCurrentMonth >= 0) {
		globalCurrentMonth++;
	} else {
		globalCurrentMonth = 0;
		globalCurrentYear = globalCurrentYear + 1;
	}
	CreateCalendar(globalCurrentMonth, globalCurrentYear);
};


function prevMounth() { // Предыдущий месяц по кнопке <
	if (globalCurrentMonth > 0 && globalCurrentMonth < 12) {
		globalCurrentMonth--;
	} else {
		globalCurrentMonth = 11;
		globalCurrentYear = globalCurrentYear - 1;
	}
	CreateCalendar(globalCurrentMonth, globalCurrentYear);
};

const switchToNextMounth = document.querySelector('.calendar__arrow--next');
switchToNextMounth.addEventListener('click', nextMounth);

const switchToPreviewMounth = document.querySelector('.calendar__arrow--preview');
switchToPreviewMounth.addEventListener('click', prevMounth);
