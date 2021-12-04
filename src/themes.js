///////////////////////////////
function switchTheme () {
    let calendarTheme = document.body;
	calendarTheme.classList.toggle('dark-theme');
	calendarTheme.classList.toggle('light-theme');
    console.log(calendarTheme);
};


const switchThemeButton = document.querySelector('.theme-switcher__button');
switchThemeButton.addEventListener('click', switchTheme);
///////////////////////////////