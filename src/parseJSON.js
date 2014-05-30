// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	var returnObj, testChar, nextChar;

	json = json.trim();
	testChar = json.charAt(0);
	nextChar = json.charAt(1);

	if (testChar == '{') {
		returnObj = parseObject(json);
	} else if (testChar == '[') {
		returnObj = parseArray(json);
	} else if (testChar == '"' || testChar == "'") {
		returnObj = parseString(json);
	} else {
		returnObj = parseNum(json);
	}

	return returnObj;
};

var parseObject = function(json) {
	var returnObj = {};

	return returnObj;
};

var parseArray = function(json) {

};

var parseString = function(json) {

};

var parseNum = function(json) {
	return Number(json);
};

var splitValues = function(json) {
	var values = [];
	startIdx = 0;
	var state = 'collecting';
	var balanceCount = 0;
	var currChar;

	for (var i = 0; i < json.length; i++) {
		currChar = json.charAt(i);
		if (i == json.length - 1) {
			values.push(json.substr(startIdx, i + 1));
		} else if (state == 'collecting') {
			if (currChar == ',') {
				values.push(json.substr(startIdx, i - startIdx));
				startIdx = i + 1;
			} else if (currChar == '"') {
				state = 'in string';
			} else if (currChar == '{') {
				state = 'in object';
			} else if (currChar == '[') {
				state = 'in array';
			}
		} else if (state == 'in string') {
			if (currChar == '"' && json.charAt(i - 1) != '\\') {
				state = 'collecting';
			}
		} else if (state == 'in object') {
			if (currChar == '}' && json.charAt(i - 1) != '\\') {
				if (balanceCount == 0) {
					state = 'collecting';
				} else {
					balanceCount--;
				}
			} else if (currChar == '{' && json.charAt(i - 1) != '\\') {
				balanceCount++;
			}
		} else if (state == 'in array') {
			if (currChar == ']' && json.charAt(i - 1) != '\\') {
				if (balanceCount == 0) {
					state = 'collecting';
				} else {
					balanceCount--;
				}
			} else if (currChar == '[' && json.charAt(i - 1) != '\\') {
				balanceCount++;
			}
		}
	};

	return values;
};