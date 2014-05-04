// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
	// Let's determine the type of object we're dealing with so we know how to handle it.
	var objType = typeof obj;
	if (obj === null) { //special handling for null objects
		return 'null';
	} else if (objType === "undefined") { //special handling for undefined values
		return;
	} else if (objType === "number" || objType === "boolean") {
		return obj.toString();
	} else if (objType === "string") { //strings must be quoted
		return '"' + obj.toString() + '"';
	}

};
