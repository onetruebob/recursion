// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
  var returnElements = [];
};

var hasClassName = function (element, name) {
	var classes = element.classList;

	if (classes.length === 0) {
		return false;
	} else {
		var nameMatch = false;

		for(var i = 0; i < classes.length && !nameMatch; i++) {
			if (classes[i] === name) {nameMatch = true};
			console.dir(classes[i]);
		}

		return nameMatch;
	}
};