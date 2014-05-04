// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
	// Let's determine the type of object we're dealing with so we know how to handle it.
	var objType = getType(obj);
	if (objType === "Null") { //special handling for null objects
		return 'null';
	} else if (objType === "Undefined") { //special handling for undefined values
		return;
	} else if (objType === "Number" || objType === "Boolean") {
		return obj.toString();
	} else if (objType === "String") { //strings must be quoted
		return '"' + obj.toString() + '"';
	} else if (objType === "Array") { //Step through array
		var arrayJSON = "[";
		obj.forEach(function (element) {
			arrayJSON += stringifyJSON(element) + ",";
		});
		if (arrayJSON.charAt(arrayJSON.length - 1) === ",") { //trim trailing comma
			arrayJSON = arrayJSON.slice(0, -1);
		}
		arrayJSON += "]";
		return arrayJSON;
	}

};

var getType = function(obj) {
	var fullType = Object.prototype.toString.call(obj);
	return fullType.split(" ")[1].slice(0, - 1);
};
