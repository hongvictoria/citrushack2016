'use strict';

function getMonth() {
	var month = [];

	var date = new Date(2016, 09, 1);

	for (var i=0; i<date.getDay(); i++){
		month.push('');
}
//find the length of days
var date = new Date(2016, 10, 0);

for (var i=0; i<date.getDate(); i++){
	month.push(i+1);
}

for (var i=date.getDay(); i <7; ++i){
	month.push('');
}

return month;
}

module.exports = getMonth;