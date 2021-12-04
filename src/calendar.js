//////////////////////////////////////////////////////////////
function findCurrentDate() {
	let currentDate = new Date().getDate();
	let currentMonth = new Date().getMonth();
	let currentYear = new Date().getFullYear();
	return {
		currentDate,
		currentMonth,
		currentYear
	};
}
/////////////////////////////////////////////////////////////

let globalCurrentYear = new Date().getFullYear();
let globalCurrentMonth = new Date().getMonth();


//////////////////////////////////////////////////////////////

function printMonthAndYear(month, year) { // Выводит месяц и год на странице
	let monthList = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	let monthName = monthList[month];
	let monthOutput = document.querySelector('.calendar__current-month');
	monthOutput.innerText = `${monthName} ${year} `;
};

function createCalendarGrid() { //создаеn сетку координат 7 недель по 6 дней из div под даты
	let calendarDates = document.querySelector('#calendar');
	calendarDates.innerHTML = '';
	for (let dayGrid = 1; dayGrid <= 7 * 6; dayGrid++) {
		let date = document.createElement('div');
		date.classList.add('calendar__dates-item');
		date.setAttribute('id', `date${dayGrid}`);
		calendarDates.append(date);
	};
	return calendarDates;
};

function calculateCalendarParameters(month, year) {
	let numWeekDays = [7, 1, 2, 3, 4, 5, 6];
	let firstDay = new Date(year, month, 1);
	let numWeekdayForFirstMonthDay = numWeekDays[firstDay.getDay()];
	let daysInPreviousMonth = new Date(year, month, 0).getDate();
	let daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
	let daysInNextMonth = new Date(year, month + 2, 0).getDate();
	let includedDaysFromPreviousMonth = Math.abs(1 - numWeekdayForFirstMonthDay);
	let includedDaysFromNextMonth = 43 - (numWeekdayForFirstMonthDay + daysInCurrentMonth);
	return {
		daysInPreviousMonth,
		daysInCurrentMonth,
		daysInNextMonth,
		includedDaysFromPreviousMonth,
		includedDaysFromNextMonth,
		numWeekdayForFirstMonthDay,
	};
};

function fillCalendarVer2(month, year) {
	const calendarParameters = calculateCalendarParameters(month, year);
	const currentDate = findCurrentDate();
	let dateCoordinate = 1;
	for (let dateOutput = calendarParameters.daysInPreviousMonth - calendarParameters.includedDaysFromPreviousMonth + 1; dateOutput <= calendarParameters.daysInPreviousMonth; dateOutput++) {
		document.querySelector(`#date${dateCoordinate}`).append(dateOutput);
		document.querySelector(`#date${dateCoordinate}`).classList.add('calendar__dates--outer-date');
		dateCoordinate++;
	}
	for (let dateOutput = 1; dateOutput <= calendarParameters.daysInCurrentMonth; dateOutput++) {
		document.querySelector(`#date${dateCoordinate}`).append(dateOutput);
		if (dateOutput == currentDate.currentDate & month == currentDate.currentMonth & year == currentDate.currentYear) {
			document.querySelector(`#date${dateCoordinate}`).classList.add('calendar__dates--current-data');
			let currentDateContainer = document.querySelector(`#date${dateCoordinate}`);
			let currentDateBacklight = document.createElement('div');
			currentDateBacklight.classList.add('calendar__dates--current-data-backlight');
			currentDateContainer.append(currentDateBacklight);

		}
		calendarParameters.numWeekdayForFirstMonthDay++;
		dateCoordinate++;
	}
	for (let dateOutput = 1; dateOutput <= calendarParameters.includedDaysFromNextMonth; dateOutput++) {
		document.querySelector(`#date${dateCoordinate}`).append(dateOutput);
		document.querySelector(`#date${dateCoordinate}`).classList.add('calendar__dates--outer-date');
		dateCoordinate++;
	}
};

function CreateCalendar(month, year) {
	findCurrentDate();
	printMonthAndYear(month, year);
	createCalendarGrid(month, year);
	fillCalendarVer2(month, year);
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
