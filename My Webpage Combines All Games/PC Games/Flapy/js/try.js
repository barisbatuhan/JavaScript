var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
var cw, ch;
var desktop;
var bird, blockArr = [];
var passed = 0;

// TYPE OF THE DEVICE IS INITIALIZED
if(screen.height > screen.width) desktop = false;
else desktop = true;

function canvasInit(){
	canvas.width = 0.9*window.innerWidth;
	if(desktop) canvas.height = 0.5625 * canvas.width;
	else canvas.height = 1.77 * canvas.width;
	cw = canvas.width;
	ch = canvas.height;
}

function blockCreator(){
	
	var l = blockArr.length;
	if(l === 0){
		var block = new Block();
		blockArr.push(block);
	}
	else{
		var distance;
		if(desktop) distance = 3 * cw / 5;
		else distance = cw / 3;
		if(blockArr[l - 1].x < distance){
			var block = new Block();
			blockArr.push(block);
		}
	}
}

function score(){
	var checkBlock = blockArr.length - 1;
	if(desktop){
		if(blockArr.length > 1){
			checkBlock = blockArr.length - 2;
		}
	}
	var blockX = blockArr[checkBlock].x + blockArr[checkBlock].xlen;
	if(passed <= checkBlock){
		if(blockX < bird.x) passed++;
	}
	ctx.font = "600 30px Arial";
	ctx.fillStyle = "red";
	ctx.fillText("Score: " + passed, 10, 30);
}

function frame(){
	ctx.clearRect(0, 0, cw, ch);
	ctx.fillStyle = "skyblue";
	ctx.fillRect(0, 0, cw, ch);
}

function isAlive(){

	if(passed <= blockArr.length){
		if(blockArr[passed].x <= bird.x + bird.len){
			if(blockArr[passed].x + blockArr[passed].xlen >= bird.x){
				if(blockArr[passed].firstY > bird.y){
					return false;
				}
				else if(blockArr[passed].secondY < bird.y + bird.len){
					return false;
				}
			}
		}
	}
	
	return true;
}

function Bird(){
	
	this.time = 0;
	this.vel = 0;
	if(desktop){
		this.len = ch / 21;
		this.maxVel = -ch / 100;
		this.gravity = ch / 170;
	} 
	else{
		this.len = ch / 25;
		this.maxVel = -ch / 120;
		this.gravity = ch / 170;
	} 
	this.x = (cw - this.len) / 2;
	this.y = (ch - this.len) / 2;

	this.draw = function(){
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.len, this.len);
		this.update();
	}

	this.update = function(){
		this.vel = this.maxVel + this.gravity * this.time;
		this.y += 0.75 * this.vel * this.time;
		if(this.y >ch - this.len){
			this.y = ch - this.len;
		}
	}
}

function Block(){
	
	this.x = cw;
	if(desktop){
		this.xlen = ch / 12;
		this.minSpace = ch / 6;
		this.vel = cw / 600;
	} 
	else{
		this.xlen = ch / 18;
		this.minSpace = ch / 6;
		this.vel = cw / 300;
	} 

	var space = (Math.random() * ch) / 2 + this.minSpace;
	this.firstY = Math.random() * (ch - space);
	this.secondY = this.firstY + space;

	this.draw = function(){
		ctx.fillStyle = "darkgreen";
		ctx.fillRect(this.x, 0, this.xlen, this.firstY);
		ctx.fillRect(this.x, this.secondY, this.xlen, ch - this.secondY);
		this.update();
	}
	
	this.update = function(){
		this.x -= this.vel;
	}
}

function gameBegins(){
	restart();
	document.getElementById("btn").style.display = "none";
	bird = new Bird();
	blockCreator();
	var inter = setInterval(function(){
		blockCreator();
		frame();
		var downLim;
		
		if(blockArr.length < 6) downLim = 0;
		else downLim = blockArr.length - 6;
		for (var i = downLim; i < blockArr.length; i++) {
			blockArr[i].draw();
		}

		bird.draw();
		bird.time += 0.02;
		score();

		var border = blockArr.length - 1;
		if(desktop) border = passed;
		if(blockArr[border].x <= bird.x + bird.len){
			if(blockArr[border].x + blockArr[border].xlen >= bird.x){
				if(blockArr[border].firstY > bird.y){
					gameEnds(inter);
				}
				else if(blockArr[border].secondY < bird.y + bird.len){
					gameEnds(inter);
				}
			}
		}
	}, 0.5);
}

function restart(){
	bird = "";
	blockArr = [];
	passed = 0;
}

function gameEnds(inter){
	clearInterval(inter);
	var btn = document.getElementById("btn");
	frame();
	btn.innerHTML =  "Your score: " + passed + "<br /> <br /> Retry?";
	btn.style.display = "block";
}

window.onload = function(){
	canvasInit();
	frame();
}
