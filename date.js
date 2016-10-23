'use strict';

function getMonth(m, y) {
	m = m || new Date().getMonth()

	console.log('first:', y)
	y = y || new Date().getFullYear();
	console.log('second', y)

	var month = [];

	var date = new Date(y, m, 1);

	for (var i=0; i<date.getDay(); i++){
		month.push('');
	}
	//find the length of days
	var date = new Date(y, m+1, 0);

	for (var i=0; i<date.getDate(); i++){
		month.push(i+1);
	}

	for (var i=date.getDay(); i <7; ++i){
		month.push('');
	}

	return month;
}

function getNameMonth(m) {
	m = m || new Date().getMonth()
	console.log(m)
	var monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];
	return monthNames[m];

for(i=0;i<months.length;i++)
{

if(i==11)
{

dat=months[0];

break;
}

if(months[i]==dat)
{

dat = months[i+1]

break;
}
}

}
module.exports = {
	getMonth: getMonth,
	getNameMonth: getNameMonth
}
function leapYear(year) {
if (year % 4 == 0) // basic rule
return true // is leap year
/* else */ // else not needed when statement is "return"
return false // is not leap year
}
function getDays(month, year) {
var ar = new Array(12)
ar[0] = 31 // January
ar[1] = (leapYear(year)) ? 29 : 28 // February
ar[2] = 31 // March
ar[3] = 30 // April
ar[4] = 31 // May
ar[5] = 30 // June
ar[6] = 31 // July
ar[7] = 31 // August
ar[8] = 30 // September
ar[9] = 31 // October
ar[10] = 30 // November
ar[11] = 31 // December
}
function getMonthName(month) {
// create array to hold name of each month
var ar = new Array(12)
ar[0] = "January"
ar[1] = "February"
ar[2] = "March"
ar[3] = "April"
ar[4] = "May"
ar[5] = "June"
ar[6] = "July"
ar[7] = "August"
ar[8] = "September"
ar[9] = "October"
ar[10] = "November"
ar[11] = "December"

}