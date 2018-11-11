
var DashboardProfiler = require('../src/DashboardProfiler');
//Mocha tools:
var assert = require('assert');
var chai = require('chai');
//Chai tools:
var expect = chai.expect;

describe("A DashboardProfiler object is created", function(){
	
	before(function(){
		this.dashObject = new DashboardProfiler();
		this.dashObject.startTimer();
	});

	it("getTimeDifferenceString is called and returned a string", function(){
		
		var difference = this.dashObject.getTimeDifferenceString();
		// Mocha Control:
		assert.equal(typeof difference, "string");
		//Chai Control:
		expect(difference).to.include.all.string(":");
	})
});

describe("A DashboardProfiler object with over-limited date values is created", 
	function(){
	
	var dateInfo = [], dateValues = [];

	before(function(){
		this.dashObject = new DashboardProfiler();
		dateInfo = [2012, 25, 62, 84, 125, 61, 1276];
	});

	it("All the range passing values are normalized (setTimeStartHelper method check)", 
		function(){
		
		var dateValues = this.dashObject.setTimeStartHelper(dateInfo[0], dateInfo[1], 
			dateInfo[2], dateInfo[3], dateInfo[4], dateInfo[5],dateInfo[6]);

		expect(dateValues[1] > 0 && dateValues[1] < 13).to.equal(true);
		expect(dateValues[2] > 0 && dateValues[2] < 32).to.equal(true);
		expect(dateValues[3] > 0 && dateValues[3] < 60).to.equal(true);
		expect(dateValues[4] > 0 && dateValues[4] < 60).to.equal(true);
		expect(dateValues[5] > 0 && dateValues[5] < 60).to.equal(true);
		expect(dateValues[6] > 0 && dateValues[6] < 1000).to.equal(true);
	});
});


describe("A DashboardProfiler object custom date values is created", function(){
	
	var dateInfo = [], dateValues = [];

	before(function(){
		this.dashObject = new DashboardProfiler();
		dateInfo = [2012, 25, 62, 84, 125, 61, 1276];
		//dateInfo = [2012, 11, 8, 5, 5, 11, 276];
	});

	it("After normalization, the startTimer is initialized without any change", 
		function(){
		
		var dateValues = this.dashObject.setTimeStartHelper(dateInfo[0], dateInfo[1], 
			dateInfo[2], dateInfo[3], dateInfo[4], dateInfo[5],dateInfo[6]);

		this.dashObject.setTimeStart(dateInfo[0], dateInfo[1], dateInfo[2], 
							dateInfo[3], dateInfo[4], dateInfo[5],dateInfo[6]);

		var startTime = this.dashObject.getTimeStart();

		expect(dateValues[0]).to.equal(startTime.getFullYear());
		expect(dateValues[1]).to.equal(startTime.getMonth());
		expect(dateValues[2]).to.equal(startTime.getDate());
		expect(dateValues[3]).to.equal(startTime.getHours());
		expect(dateValues[4]).to.equal(startTime.getMinutes());
		expect(dateValues[5]).to.equal(startTime.getSeconds());
		expect(dateValues[6]).to.equal(startTime.getMilliseconds());
	});
});

