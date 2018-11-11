var maxWidth = screen.width;
var maxHeight = screen.height;

function Player(){
	this.len = maxWidth / 40;
	if(maxHeight > maxWidth){
		this.len = maxHeight / 30;
	}

	
	this.x = window.innerWidth / 2 - this.len / 2;
	this.y = window.innerHeight/ 2 - this.len / 2;

	this.draw = function(){
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.len, this.len);
		this.update();
	}
	this.update = function(){
		this.x = window.innerWidth / 2 - this.len / 2;
	}
}

function Block(){
	
	this.xlen = maxWidth / 30;
	if(maxHeight > maxWidth){
		this.xlen = maxHeight / 22.5;
	}
	this.x = maxWidth;
	this.spaceLen = Math.random() * window.innerHeight / 2 + window.innerHeight / 6;
	this.spaceBegin = Math.random() * (window.innerHeight - this.spaceLen);
	this.ySecond = this.spaceBegin + this.spaceLen;

	this.draw = function(){
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, 0, this.xlen, this.spaceBegin);
		ctx.fillRect(this.x, this.ySecond, this.xlen, canvas.height - this.ySecond);
		this.update();
	}

	this.update = function(){
		this.x -= maxWidth / 1500;
		if(maxHeight > maxWidth){
			this.x -= maxWidth / 500;
		}
	}
}