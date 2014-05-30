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
	} else if (testChar == 't' || testChar == "T" ||
				testChar == 'f' || testChar == 'F') {
		returnObj = parseBoolean(json);
	} else if (testChar == 'n' || testChar == 'N') {
		returnObj = parseNull(json);
	} else {
		returnObj = parseNum(json);
	}

	return returnObj;
};

var parseObject = function(json) {
	var returnObj = {};
	var objectProperties = splitValues(stripContainerChars(json, '{', '}'));

	for (var i = 0; i < objectProperties.length; i++) {
		var propComponents = splitObjComponents(objectProperties[i]);
		returnObj[parseJSON(propComponents.key)] = parseJSON(propComponents.value);
	};


	return returnObj;
};

var parseArray = function(json) {
	var returnObj = [];
	var arrayComponents = splitValues(stripContainerChars(json, '[', ']'));

	for (var i = 0; i < arrayComponents.length; i++) {
		returnObj.push(parseJSON(arrayComponents[i]));
	};

	return returnObj;
};

var parseString = function(json) {
	json = stripContainerChars(json, '"', '"');

	return escapeString(json);
};

var escapeString = function (str) {
	var escapedStr = '';

	//strip escape chars from return val
	for (var i = 0; i < str.length; i++) {
		if(str.charAt(i) == '\\') {
			if (i + 1 < str.length) {
				escapedStr = escapedStr + str.charAt(i + 1);
				i++;
			}
		} else {
			escapedStr = escapedStr + str.charAt(i);
		}
	};

	return escapedStr;
};

var parseBoolean = function (json) {
	json = json.toLowerCase();
	if (json == 'true') {
		return true;
	} else if (json == 'false') {
		return false;
	}
	//Otherwise return a parsing error
};

var parseNull = function (json) {
	json = json.toLowerCase();
	if (json == 'null') {
		return null;
	}
	//Otherwise return a parsing error
};

var parseNum = function(json) {
	return Number(json);
};

var splitValues = function(json) {
	var values = [];
	var startIdx = 0;
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

var stripContainerChars = function (json, initial, final) {
	var firstChar = json.charAt(0);
	if (firstChar == initial && validateLastChar(json, final)) {
		return json.substring(1, json.length - 1);
	} else {
		throw SyntaxError();
	}
};

var validateLastChar = function (json, final) {
	var state = 'searching';
	var currChar = '';

	for (var i = 0; i < json.length; i++) {
		currChar = json.charAt(i);
		if (state == 'searching') {
			if (i == json.length - 1 && currChar == final) {
				return true;
			} else if (currChar == '"') {
				state = 'in string';
			}
		} else if (state = 'in string') {
			if (currChar == '"' && json.charAt(i - 1) != '\\') {
				state = 'searching';
			} else if (i == json.length - 1) {
				return false;
			}
		}
	};

	return true;
};

var splitObjComponents = function(json) {
	var components = {};
	var startIdx = 0;
	var state = 'getting key';
	var currChar;

	for (var i = 0; i < json.length; i++) {
		currChar = json.charAt(i);
		if (state == 'getting key') {
			if (currChar == ':') {
				components.key = json.substr(startIdx, i - startIdx);
				startIdx = i + 1;
				components.value = json.substr(startIdx, json.length - i);
				break;
			} else if (currChar == '"') {
				state = 'in string';
			}
		} else if (state == 'in string') {
			if (currChar == '"' && json.charAt(i - 1) != '\\') {
				state = 'getting key';
			}
		}
	};

	return components;
}