var partialHTMLString = '' + 
	'hat else can you ask for?<\/div><\/div><\/div><div class=\"hdp-facts zsg-content-component z-moreles'+
	's\"><div class=\"fact-group-container zsg-content-component top-facts\"><h4 itemprop=\"category\" cl'+
	'ass=\"zsg-content_collapsed\">Facts<\/h4><ul class=\"zsg-list_square zsg-lg-1-2 zsg-sm-1-1\"><li>Lot'+
	': 6,534 sqft<\/li><li>Single Family<\/li><li>Built in 1980<\/li><li>3 days on Zillow<\/li><li>Views:'+
	' 543 all time views<\/li><\/ul><ul class=\"zsg-list_square zsg-lg-1-2 zsg-sm-1-1\"><li>8 shoppers sa'+
	'ved this home<\/li><li>Last sold: Oct 2004 for $573,000<\/li><li>Pr$624,995<\/div><\/li><\/ul><ul cl'+
	'ass=\"attributes\"><li class=\"prop-cola\">3 bd, 2 ba, 2,010 sqft<\/li><\/ul><div class=\"specialDat'+
	'a zsg-fineprint\"><\/div><\/div><\/div><a class=\"close-bubble\"><span class=\"zsg-icon-x-thin\"><\/'+
	'span><\/a><div id=\"bubble-photoex-down\" class=\"photoex hide\"><div class=\"photoex-photos hide\">'+
	'<\/div><div class=\"mapsViews hide\"><\/div><\/div><\/div><div class=\"map-bubble-beak\"><\/div><\/d'+
	'iv><\/div>" }, "minibubble": { "id":19816799, "statusType":1, "lat":37271780, "lng":-121811509, "dat'+
	'a":{"bed":3,"miniBubbleType":1,"image":"http:\/\/photos3.zillowstatic.com\/p_a\/ISlqyazvlsmduz000000'+
	'0000.jpg","sqft":2010,"label":"$625K","isPropertyTypeVacantLand":false,"datasize":8,"title":"$625K",'+
	'"bath":2.0} } , "enrollmentId":"", "sortControl":"<ul id=\"property-sort-control\" class=\"zsg-tabs '+
	'zsg-tabs_lg\"><li class=\"\"><a href=\"\/homes\/for_sale\/San-Jose-CA\/33839_rid\/37.278611669169564'+
	',-121.79861783981323,37.264951340310034,-121.8243670463562_rect\/14_zm\/1_p\/\" data-value=\"feature'+
	'd\">Featured<\/a><\/li><li class=\"zsg-tab_active\"><a href=\"\/homes\/for_sale\/San-Jose-CA\/33839_'+
	'rid\/days_sort\/37.278611669169564,-121.79861783981323,37.264951340310034,-121.8243670463562_rect\/1'+
	'4_zm\/1_p\/\" data-value=\"days\">Newest<\/a><\/li><li class=\"second-unselected\"><a href=\"\/homes'+
	'\/for_sale\/San-Jose-CA\/33839_rid\/priced_sort\/37.278611669169564,-121.79861783981323,37';

var propertyInfoFromHTML = {
	zipid: 19816799,
	location: {
		type: 'Point',
		coordinates: [-121.811509, 37.271780] //lng, lat
	},
	bed: 3,
	bath: 2,
	image: 'http:\/\/photos3.zillowstatic.com\/p_a\/ISlqyazvlsmduz0000000000.jpg',
	sqft: 2010,
	price: 625000,
	postingDate: '04/09/2015'
};

module.exports.html = partialHTMLString;
module.exports.propertyInfo = propertyInfoFromHTML;
