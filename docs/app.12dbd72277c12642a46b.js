/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/calendar.js":
/*!*************************!*\
  !*** ./src/calendar.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./src/fonts.css":
/*!***********************!*\
  !*** ./src/fonts.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fonts_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fonts.css */ "./src/fonts.css");
/* harmony import */ var _fonts_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fonts_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _calendar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar.js */ "./src/calendar.js");
/* harmony import */ var _calendar_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_calendar_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _themes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./themes.js */ "./src/themes.js");
/* harmony import */ var _themes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_themes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _themes_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./themes.scss */ "./src/themes.scss");
/* harmony import */ var _themes_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_themes_scss__WEBPACK_IMPORTED_MODULE_4__);






/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/themes.js":
/*!***********************!*\
  !*** ./src/themes.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

///////////////////////////////
function switchTheme () {
    let calendarTheme = document.body;
	calendarTheme.classList.toggle('dark-theme');
	calendarTheme.classList.toggle('light-theme');
};


const switchThemeButton = document.querySelector('.theme-switcher__button');
switchThemeButton.addEventListener('click', switchTheme);
///////////////////////////////

/***/ }),

/***/ "./src/themes.scss":
/*!*************************!*\
  !*** ./src/themes.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=app.12dbd72277c12642a46b.js.map