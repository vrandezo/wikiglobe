// transform the JSON files from the 2d to the 3d format
var lang = 'wd';
var data = require('./' + lang + '.js');
console.log('loaded');
for (var rounding = 1; rounding < 7; rounding++) {
	if (rounding == 6) rounding = 10;
	console.log('processing ' + lang + ' ' + rounding);

	var temp = {};

	for (var location in data.geodata) {
		var x = (Math.round(data.geodata[location].x*rounding)/rounding).toFixed(1);
		var y = (Math.round(data.geodata[location].y*rounding)/rounding).toFixed(1);
		if (!(x in temp)) temp[x] = {};
		if (!(y in temp[x])) temp[x][y] = 0.0;
		temp[x][y] = (1-(1-temp[x][y])*0.9);
	}

	var result = [];
	for (x in temp) for (y in temp[x]) {
		result.push(parseFloat(x));
		result.push(parseFloat(y));
		result.push(parseFloat(temp[x][y].toFixed(2)));
	}
	console.log(result.length/3);

	var fs = require('fs');
	fs.writeFile('data-' + lang + rounding + '.json', JSON.stringify(result));
	console.log('saved');
}