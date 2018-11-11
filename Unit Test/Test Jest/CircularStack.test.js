
var CircularStack = require('../src/CircularStack');

describe("A CircularStack object with size 5 is created", function(){
	
	var cStack;
	var pos;

	beforeEach(function(){
		cStack = new CircularStack(5);
		pos = cStack._curentPosition;
	});

	it("push method is called and current position increased", 
	function(){
		
		var text = "this will be pushed into the stack";
		cStack.push(text);
		if(pos === 4){
			var newPos = 0;
		}
		else{
			var newPos = pos + 1;
		}
		
		expect(cStack._curentPosition).toBe(newPos);
	});
});

describe("A CircularStack object with size 3 is created", function(){
	
	beforeEach(function(){
		cStack = new CircularStack(3);
		pos = cStack._curentPosition;
	});

	it("pop method is called with no object inside, null is returned", 
	function(){
		var lastItem = cStack.pop();
		expect(lastItem).toEqual(null);
	});
});

