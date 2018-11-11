
var CircularStack = require('../src/CircularStack');

describe("A CircularStack object with size 5 is created", function(){
	
	beforeEach(function(){
		this.cStack = new CircularStack(5);
		this.pos = this.cStack._curentPosition;
	});

	it("push method is called and current position increased", 
	function(){
		
		var text = "this will be pushed into the stack";
		this.cStack.push(text);
		if(this.pos === 4){
			var newPos = 0;
		}
		else{
			var newPos = this.pos + 1;
		}
		
		expect(this.cStack._curentPosition).toBe(newPos);
	});
});

describe("A CircularStack object with size 3 is created", function(){
	
	beforeEach(function(){
		this.cStack = new CircularStack(3);
		this.pos = this.cStack._curentPosition;
	});

	it("pop method is called with no object inside, null is returned", 
	function(){
		var lastItem = this.cStack.pop();
		expect(lastItem).toEqual(null);
	});
});


