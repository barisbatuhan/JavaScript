
var DictToArray = require('../src/DictToArray');

//Mocha tools:
var assert = require('assert');
var chai = require('chai');
var sinon = require('sinon');

//Chai tools:
var expect = chai.expect;
var should = chai.should;

describe("A dict type object is created", function(){


	before(function(){
		this.dict = {
			name: "Barış",
			surname: "Topal",
			age: 21,
			email: "bbt@bbt.net"
		};
		
		this.name = "defines";
		this.value = "info";
		this.return = [];
	});

	it("ConvertDictionaryToObjectArray method called and an array object returned", function(){
		
		var fakeObject = new DictToArray();
		fakeObject.IsFunctionType = sinon.fake.returns(false);
		this.return = fakeObject.ConvertDictionaryToObjectArray(this.dict, this.name, this.value);
		expect(this.return).to.be.an('array');
	});
});

