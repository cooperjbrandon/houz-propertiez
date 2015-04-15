//Libraries
var expect = require('chai').expect;
var sinon = require('sinon');
var moment = require('moment');

//helpers
var helpers = require('./helpers/setup-helper');

//files
var config = require('houz-config');
var expectedPropertyInfo1 = require('./html-stub/html1').propertyInfo;
var expectedPropertyInfo2 = require('./html-stub/html2').propertyInfo;
var expectedPropertyInfo3 = require('./html-stub/html3').propertyInfo;

var spy, stubqueue;

var messageFromRabbit = { zipid: 'zipid' };

const CREATIONDATE = '04/12/2015';

describe('Properties', function() {
	
	before('stub out request & amqp and begin connection', function() {
		stubqueue = helpers.before();
	});

	beforeEach(function() {
		spy = helpers.beforeEach();
	});

	afterEach(function() {
		helpers.afterEach();
	});

	after('restore all', function() {
		helpers.after();
	});

	it('recieves the correct message structure', function() {
		expect(messageFromRabbit).to.have.all.keys(config.messageExpectations.zipids);
	});
	
	it('publishes to the exchange each property for each zipid', function (done) {
		messageFromRabbit.zipid = '15539566';
		stubqueue.emit('message', messageFromRabbit);
		helpers.wait(function() {
			expect(spy.callCount).to.equal(1); //see html stub 1

			messageFromRabbit.zipid = '19816799';
			stubqueue.emit('message', messageFromRabbit);
			helpers.wait(function() {
				expect(spy.callCount).to.equal(2);
				
				messageFromRabbit.zipid = '19711663';
				stubqueue.emit('message', messageFromRabbit);
				helpers.wait(function() {
					expect(spy.callCount).to.equal(3);
					done();
				});
			});
		});
	});

	it('should publish to the exchange with the correct routingKey and message for each property', function (done) {
		messageFromRabbit.zipid = '15539566';
		stubqueue.emit('message', messageFromRabbit);
		helpers.wait(function() {
			testRoutingKeyandMessage(expectedPropertyInfo1, 0);
			
			messageFromRabbit.zipid = '19816799'; //now emit with new page
			stubqueue.emit('message', messageFromRabbit);
			helpers.wait(function() {
				testRoutingKeyandMessage(expectedPropertyInfo2, 1);

				messageFromRabbit.zipid = '19711663'; //now emit with new page
				stubqueue.emit('message', messageFromRabbit);
				helpers.wait(function() {
					testRoutingKeyandMessage(expectedPropertyInfo3, 2);
					done();
				});
			});
		});
	});

});

var testRoutingKeyandMessage = function(expectedProperty, startingPoint) {
	var expectedRoutingKey = config.routingKey.properties;
	var expectedMessageStructure = config.messageExpectations.properties;

	for (var i = startingPoint; i < spy.callCount; i++) {
		var args = spy.args[i];

		expect(args[0]).to.equal(expectedRoutingKey);
		correctStructureOfMessage(args[1], expectedMessageStructure, {propertyinfo: expectedProperty});
	};
};

var correctStructureOfMessage = function(message, expectedMessageStructure, expectedMessage) {
	//expectedMessageStructure comes from config, which is used in other repos as well
	//expected message is what we actually expect

	//the target object must both contain all of the passed-in keys AND the number of keys
	//in the target object must match the number of keys passed in (in other words, a target
	//object must have all and only all of the passed-in keys)
	expect(message).to.have.all.keys(expectedMessageStructure);

	//expect message days will never be aligned - add days from CREATIONDATE
	expectedMessage.propertyinfo.postingDate = moment(expectedMessage.propertyinfo.postingDate).add(moment().diff(CREATIONDATE, 'days'), 'days').format('MM/DD/YYYY');

	expect(message).to.deep.equal(expectedMessage);
};
