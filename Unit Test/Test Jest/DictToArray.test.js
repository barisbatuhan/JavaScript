
const DictToArray = require('../src/DictToArray');

describe("A dict type object is created", function(){

	var dict, name, value, rtrn = [];
	beforeAll(function(){
		dict = {
			name: "Barış",
			surname: "Topal",
			age: 21,
			email: "bbt@bbt.net"
		};
		
		name = "defines";
		value = "info";
		rtrn = [];
	});

	it("ConvertDictionaryToObjectArray method called and an array object returned", function(){
		
		var fakeObject = new DictToArray();
		fakeObject.IsFunctionType = jest.fn(function(){
			return false;
		});

		rtrn = fakeObject.ConvertDictionaryToObjectArray(dict, name, value);
		expect(typeof rtrn).toEqual('object');
	});
});

