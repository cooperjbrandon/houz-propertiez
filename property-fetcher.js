var http, clc, rabbit, beginSetup, handlePropertyInfo;

http = require('http');
clc = require('cli-color');
rabbit = require('./rabbit-management');

beginSetup = rabbit.beginSetup;
handlePropertyInfo = rabbit.handlePropertyInfo;

var beginFetchOfProperty = function(message, headers, deliveryInfo, messageObject) {
	fetchProperty(message.zipid);
};

var fetchProperty = function(zipid) {
	var url = 'http://www.zillow.com/homes/'+zipid+'_zpid/';
	console.log(clc.green('SENDING REQUEST: zipid '+ zipid));
	http.get(url, function(result) {
		var html = '';
		console.log(clc.black.bgWhite('STATUS: ' + result.statusCode));
		result.on('data', function(chunk) {
			html += new Buffer(chunk).toString('utf8');
		});
		result.on('end', function() {
			var propertyInfo = parsePropertyInfo(html);
			handlePropertyInfo(propertyInfo);
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
};

var parsePropertyInfo = function(html) {
	var startingIndex = html.indexOf('"minibubble"');
	var endingIndex = html.indexOf('"enrollmentId"');
	while (html[endingIndex] !== '}') {
		endingIndex--; //keeping going untill hitting a }
	}
	var propertyInfoStr = html.slice(startingIndex, endingIndex+1);
	var sanitizedPropertyInfo = sanitizePropertyInfo(propertyInfoStr);
	try {
		var propertyInfoObj = JSON.parse('{'+sanitizedPropertyInfo+'}');
		return propertyInfoObj.minibubble;
	} catch(err) {
		console.log('Error parsing JSON: '+ err);
		console.log(propertyInfoStr);
	}
};

var sanitizePropertyInfo = function(propInfo) {
	return propInfo.replace('"lat":/', '"lat":').replace('"lng":/', '"lng":');
};

beginSetup(beginFetchOfProperty);
