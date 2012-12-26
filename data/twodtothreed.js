// transform the JSON files from the 2d to the 3d format
var langs = ['en','fr','ca'];

var temp = {};
var load = function(lang) {
	var size=0;
	console.log(lang);
	var data = require('./' + lang + '.js');
	for (var location in data.geodata) {
		var rounding = 2;
		var x = (Math.round(data.geodata[location].x*rounding)/rounding).toFixed(1);
		var y = (Math.round(data.geodata[location].y*rounding)/rounding).toFixed(1);
		if (!(x in temp)) temp[x] = {};
		if (!(y in temp[x])) {
			temp[x][y] = {};
			for (var index in langs) temp[x][y][langs[index]] = 0.0;
		}
		console.log(temp);
		temp[x][y][lang] = (1-(1-temp[x][y][lang])*0.9);
		console.log(temp);
		if (size++>2) break;
	}
}
for (lang in langs) load(langs[lang]);

var outerresult = [];
for (lang in langs) {
	var result = [];
	for (x in temp) for (y in temp[x]) {
		result.push(parseFloat(x));
		result.push(parseFloat(y));
		result.push(parseFloat(temp[x][y][langs[lang]].toFixed(2)));
		//result.push(0);
	}
	outerresult.push([langs[lang], result]);
	console.log(result.length);
}

var fs = require('fs');
fs.writeFile('geodata.json', JSON.stringify(outerresult));

console.log('saved');
