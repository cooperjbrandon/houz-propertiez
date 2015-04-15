var request, clc, moment, rabbit, beginSetup, handlePropertyInfo;

request = require('request');
clc = require('cli-color');
rabbit = require('./rabbit-management');
moment = require('moment');

beginSetup = rabbit.beginSetup;
handlePropertyInfo = rabbit.handlePropertyInfo;

var beginFetchOfProperty = function(message, headers, deliveryInfo, messageObject) {
	fetchProperty(message.zipid);
};

var fetchProperty = function(zipid) {
	var url = 'http://www.zillow.com/homes/'+zipid+'_zpid/';
	request.get(url, function(error, response, body) {
		if (error) {
			console.log("Got error: " + error.message);
		} else {
			handlePropertyInfo(parsePropertyInfo(body));
		}
	});
};

var parsePropertyInfo = function(html) {
	var propertyInfoStr, sanitizedPropertyInfo, propertyInfoObj, formattedInfo, doReturn = true;

	var startingIndex = html.indexOf('"minibubble"');
	var endingIndex = html.indexOf('"enrollmentId"');
	while (html[endingIndex] !== '}') {
		endingIndex--; //keeping going untill hitting a }
	}
	try {
		propertyInfoStr = html.slice(startingIndex, endingIndex+1);
		sanitizedPropertyInfo = sanitizePropertyInfo(propertyInfoStr);
		propertyInfoObj = JSON.parse('{'+sanitizedPropertyInfo+'}');
		formattedInfo = formatPropertyInfo(propertyInfoObj);
		formattedInfo.postingDate = getPostingDate(html);
	} catch(err) {
		console.log('Error parsing JSON: '+ err);
		console.log(propertyInfoStr);
		doReturn = false;
	} finally {
		if (doReturn) { return formattedInfo; }
	}
};

var sanitizePropertyInfo = function(propInfo) {
	return propInfo.replace(/\\/g, '')
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
			coordinates: [determineLng(propertyInfoObj.minibubble.lng), determineLat(propertyInfoObj.minibubble.lat)]
		},
		bed: propertyInfoObj.minibubble.data.bed,
		bath: propertyInfoObj.minibubble.data.bath,
		image: propertyInfoObj.minibubble.data.image,
		sqft: propertyInfoObj.minibubble.data.sqft,
		price: determinePrice(propertyInfoObj.minibubble.data.title)
	};
	//see houz-config for output object
};

var determineLng = function(lng) {
	var lngstr = '' + lng;
	return parseFloat(lngstr.slice(0,4) + '.' + lngstr.slice(4));
};

var determineLat = function(lat) {
	var latstr = '' + lat;
	return parseFloat(latstr.slice(0,2) + '.' + latstr.slice(2));
};

var determinePrice = function(priceStr) {
	// either '700K' or '2.79M' (M or K)
	var priceNum = JSON.parse(priceStr.slice(1,-1));
	return priceStr.slice(-1) === 'K' ? priceNum * 1000 : priceNum * 1000000;
};

var getPostingDate = function(html) {
	var endingIndex = html.indexOf(' days on Zillow');
	if (endingIndex === -1) {
		if (html.indexOf('Less than 1 day on Zillow') > -1) {
			return moment().subtract(1, 'days').format('MM/DD/YYYY');
		} else {
			return '1/1/2000';
		}
	}
	var carrotIndex = endingIndex - 1;

	while(html[carrotIndex] !== '>') {
		carrotIndex--;
	}

	var days = parseInt(html.slice(carrotIndex + 1, endingIndex));
	return moment().subtract(days, 'days').format('MM/DD/YYYY');
};

beginSetup(beginFetchOfProperty);
