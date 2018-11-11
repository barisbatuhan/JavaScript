
var DictToArray = require('../src/DictToArray');

describe("A dict type object is created", function(){

	beforeEach(function(){
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
		
		var fakeConverter = new DictToArray();
		fakeConverter.IsFunctionType = jasmine.createSpy("IsFunctionType-spy").
										and.callFake(function(){
			return false;
		});
		this.return = fakeConverter.ConvertDictionaryToObjectArray(this.dict, this.name, this.value);
		expect(this.return).toEqual(jasmine.any(Array));
	});
});


