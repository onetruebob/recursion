// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	var returnObj, testChar, nextChar;

	json = json.trim();
	testChar = json.CharAt(0);
	nextChar = json.CharAt(1);

	if (testChar = '{') {
		returnObj = parseObject(json);
	} else if (testChar = '[') {
		returnObj = parseArray(json);
	} else if (testChar = '"' || testChar = "'") {
		returnObj = parseString(json);
	} else {
		returnObj = parseNum(json);
	}

	return returnObj;
};

var parseObject = function(json) {

};

var parseArray = function(json) {

};

var parseString = function(json) {

};

var parseNum = function(json) {

};