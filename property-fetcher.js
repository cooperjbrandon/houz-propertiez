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
	try {
		var propertyInfoStr = html.slice(startingIndex, endingIndex+1);
		// var sanitizedPropertyInfo = sanitizePropertyInfo(propertyInfoStr);
		var propertyInfoObj = JSON.parse('{'+propertyInfoStr+'}');
		return formatPropertyInfo(propertyInfoObj);
	} catch(err) {
		console.log('Error parsing JSON: '+ err);
		console.log(propertyInfoStr);
	}
};

var sanitizePropertyInfo = function(propInfo) {
	return propInfo.replace('"lat":/', '"lat":').replace('"lng":/', '"lng":');
};

var formatPropertyInfo = function(propertyInfoObj) {
	/* input object:
	{
		"minibubble": {
		"id":63065270,
		"statusType":1,
		"lat":37326918,
		"lng":-121905723,
		"data": {
			"bed":3,
			"miniBubbleType":1,
			"image":"http:\\/\\/photos2.zillowstatic.com\\/p_a\\/IStgkrhj0yauk21000000000.jpg",
			"sqft":1463,
			"label":"$700K",
			"isPropertyTypeVacantLand":false,
			"datasize":8,
			"title":"$700K",
			"bath":3.0
		} 
	}
	*/
	return {
		zipid: propertyInfoObj.minibubble.id,
		location: {
			type: 'Point',
			coordinates: [propertyInfoObj.minibubble.lng/100000, propertyInfoObj.minibubble.lat/100000]
		}
		bed: propertyInfoObj.minibubble.data.bed,
		bath: propertyInfoObj.minibubble.data.bath,
		image: propertyInfoObj.minibubble.data.image,
		sqft: propertyInfoObj.minibubble.data.sqft,
		price: determinePrice(propertyInfoObj.minibubble.data.title)
	};

	/* output object:
	{
		zipid:63065270,
		location: {
			type: "Point",
			coordinates: [-121.905723, 37.326918] //lng, lat
		},
		bed: 3,
		bath: 3,
		image: "http:\\/\\/photos2.zillowstatic.com\\/p_a\\/IStgkrhj0yauk21000000000.jpg",
		sqft: 1463,
		price: 700000
	}
	*/
};

var determinePrice = function(priceStr) {
	// either '700K' or '2.79M' (M or K)
	var priceNum = JSON.parse(priceStr.slice(0,-1));
	return priceStr.slice(-1 === 'K') ? priceNum * 1000 : priceNum * 1000000;
};

beginSetup(beginFetchOfProperty);
