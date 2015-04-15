var partialHTMLString = '' + 
	'p-facts\"><h4 itemprop=\"category\" class=\"zsg-content_collapsed\">Facts<\/h4><ul class=\"zsg-list_'+
	'square zsg-lg-1-2 zsg-sm-1-1\"><li>Lot: 6,097 sqft<\/li><li>Single Family<\/li><li>Built in 1925<\/l'+
	'i><li>14 days on Zillow<\/li><li>Views: 4,857 all time views<\/li><li>2 shoppers saved this home<\/l'+
	'i><\/ul><ul class=\"zsg-list_square zsg-lg-1-2 zsg-sm-1-1\"><li>Cooling: None<\/li><li>He"zsg-icon-f'+
	'or-sale\"><\/span><span class=\"type listing-label\">House For Sale<\/span><\/div><\/li><li><div cla'+
	'ss=\"zsg-h2 price\">$1,375,000<\/div><\/li><\/ul><ul class=\"attributes\"><li class=\"prop-cola\">3 '+
	'bd, 2 ba, 2,251 sqft<\/li><\/ul><div class=\"specialData zsg-fineprint\"><\/div><\/div><\/div><a cla'+
	'ss=\"close-bubble\"><span class=\"zsg-icon-x-thin\"><\/span><\/a><div id=\"bubble-photoex-down\" cla'+
	'ss=\"photoex hide\"><div class=\"photoex-photos hide\"><\/div><div class=\"mapsViews hide\"><\/div><'+
	'\/div><\/div><div class=\"map-bubble-beak\"><\/div><\/div><\/div>" }, "minibubble": { "id":19711663,'+
	' "statusType":1, "lat":37338595, "lng":-121874602, "data":{"bed":3,"miniBubbleType":1,"image":"http:'+
	'\/\/photos3.zillowstatic.com\/p_a\/IStst618e01o440000000000.jpg","sqft":2251,"label":"$1.38M","isPro'+
	'pertyTypeVacantLand":false,"datasize":8,"title":"$1.38M","bath":2.0} } , "enrollmentId":"", "sortCon'+
	'trol":"<ul id=\"property-sort-control\" class=\"zsg-tabs zsg-tabs_lg\"><li class=\"\"><a href=\"\/ho'+
	'mes\/for_sale\/San-Jose-CA\/33839_rid\/37.34540909280196,-121.86174631118774,37.331760894058526,-121'+
	'.88749551773071_rect\/14_zm\/1_p\/\" data-value=\"featured\">Featured<\/a><\/li><li class=\"zsg-tab_'+
	'active\"><a href=\"\/homes\/for_sale\/San-Jose-CA\/33839_rid\/days_sort\/37.34540909280196,-121.8617'+
	'4631118774,37.331760894058526,-121.88749551773071_rect\/14_zm\/1_p\/\" data-value=\"days\">Newest<\/'+
	'a><\/li><li class=\"second-unselected\"><a href=\"\/homes\/for_sale\/San-Jose-CA\/33839_rid\/priced_'+
	'sort\/37.34540909280196,-121.86174631118774,37.3317608940';

var propertyInfoFromHTML = {
	zipid: 19711663,
	location: {
		type: 'Point',
		coordinates: [-121.874602, 37.338595] //lng, lat
	},
	bed: 3,
	bath: 2,
	image: 'http:\/\/photos3.zillowstatic.com\/p_a\/IStst618e01o440000000000.jpg',
	sqft: 2251,
	price: 1380000,
	postingDate: '03/29/2015'
};

module.exports.html = partialHTMLString;
module.exports.propertyInfo = propertyInfoFromHTML;
