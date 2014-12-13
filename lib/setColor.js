var constants = require('./constants');
var setMode = require('./setMode');
var red = 128;
var green = 0;
var blue = 0;

module.exports = function(keyboard, region, red, green, blue){
	if (!region) throw "missing region";

	if (typeof constants.regions[region] === 'undefined') throw "invalid region";


	var activate = new Buffer(8);
	// header
	activate[0] = 1;
	activate[1] = 2;
	activate[2] = 64; // set
	activate[3] = constants.regions[region];
	activate[4] = red;
	activate[5] = green;
	activate[6] = blue;
	activate[7] = 236;  // EOR (end of request)

	keyboard.sendFeatureReport(activate);
	setMode(keyboard, keyboard.currentMode || 'normal');

	// keyboard.current[region] = {
	// 	intensity: intensity,
	// 	color: color
	// };
	return keyboard;
};