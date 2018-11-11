// CANVAS OBJECT
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
var fps = 5;

// GAME DECLARATIONS
var floors = [];
var p;
var block = [8];
for (var i = 0; i < 8; i++) {
	block[i] = [];
}
var score = 0;
var ends = [];
var inter;
var players = [];

// SCREEN SIZE MANAGEMENT
var maxWidth = screen.width;
var maxHeight = screen.height;
var cw, ch;
var desktop;
if(screen.height > screen.width) desktop = false;
else desktop = true;

function canvasInit(){
	canvas.width = 0.9*window.innerWidth;
	canvas.height = 0.5625 * canvas.width;
	cw = canvas.width;
	ch = canvas.height;
}

// OBJECTS
function player(){
	
	this.len = 0.1*ch;
	this.x = cw / 2 - this.len / 2;
	this.y = ch - (ch / 9 + this.len) / 2;

	this.boundaries = function(){
		if(this.x < 0) this.x = ch / 180;
		else if(this.x + this.len > cw) this.x = cw - this.len - ch / 180;
		else if(this.y < 0) this.y = ch / 180;
		else if(this.y + this.len > ch) this.y = ch - this.len - ch / 180;
	}

	this.draw = function(){
		this.boundaries();
		ctx.fillStyle = "yellow";
		ctx.fillRect(this.x, this.y, this.len, this.len);
	}
}

function blocks(lr, moveFps, blockNr){
	
	this.speed = moveFps;
	this.leny = 0.1 * ch;
	this.y = blockNr * (ch / 9) + (ch / 9 - this.leny) / 2;
	this.lenx = parseInt(Math.random() * 4 + 2) * this.leny;
	if(lr === 0) this.x = -this.lenx;
	else this.x = cw;

	this.update = function(){
		if(lr === 0) this.x += moveFps;
		else this.x -= moveFps;
	}

	this.draw = function(){
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.lenx, this.leny);
		this.update();
	}
}

function areas(y){
	this.x = 0
	this.y = y * ch / 9;
	this.ylen = ch / 9;
	this.xlen = canvas.width;
	this.color;

	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.xlen, this.ylen);
	}
}

function endPlaces(num){
	this.lenx = 0.2 * ch;
	this.leny = 0.1 * ch;
	this.x = cw * num / 4 - this.lenx / 2;
	this.y = ch / 180;
	this.full = false;

	this.draw = function(){
		ctx.fillStyle = "orange";
		ctx.fillRect(this.x, this.y, this.lenx, this.leny);
	}
}

// PROCESSES
function blockCheck(){
	for (var i = 0; i < 8; i++) {	
		var speed;
		var dir;
		if(i === 0 || i === 4) continue;
		else{
			
			if(i === 1){
				speed = ch / 360;
				dir = 0;
			}
			else if(i === 2){
				speed = ch / 216;
				dir = 1;
			}
			else if(i === 3){
				speed = ch / 720;
				dir = 0;
			}
			else if(i === 5){
				speed = ch / 271;
				dir = 0;
			}
			else if(i === 6){
				speed = ch / 430;
				dir = 1;
			}
			else if(i === 7){
				speed = ch / 542;
				dir = 0;
			}

			var dist1 = Math.random() * ch + ch / 2;
			var dist2 = Math.random() * ch + ch;
			if(block[i].length <= 0){
				var b = new blocks(dir, speed, i);
				block[i].push(b);
			}
			else if((i === 1 || i === 3) &&
				block[i][block[i].length - 1].x > dist2){
				var b = new blocks(dir, speed, i);
				block[i].push(b);
			}

			else if((i === 5 || i === 7) &&
				block[i][block[i].length - 1].x > dist1){
				var b = new blocks(dir, speed, i);
				block[i].push(b);
			}

			else if((i === 2 || i === 6) &&
				block[i][block[i].length - 1].x +
				block[i][block[i].length - 1].lenx < cw - dist2){
				var b = new blocks(dir, speed, i);
				block[i].push(b);
			}
		}
	}
}

function isAlive(){
	var yline = parseInt(p.y * 9 / ch);
	var lower = function(){
		if(block[yline].length > 6) return block[yline].length - 6;
		else return 0;
	}
	
	if(yline === 1 || yline === 2 || yline === 3){
		
		var alive = false;
		var current;
		for (var i = lower(); i < block[yline].length; i++) {
			current = block[yline][i];
			if(current.x < p.x + p.len && current.x + current.lenx > p.x){
				alive = true;
			}
		}

		if(alive && yline === 2) p.x -= current.speed;
		else if(alive) p.x += current.speed;
		else {
			finish(false);
		}
	}

	else if(yline === 5 || yline === 6 || yline === 7){
		
		var alive = true;
		
		for (var i = lower(); i < block[yline].length; i++) {
			var current = block[yline][i];
			if(current.x < p.x + p.len && current.x + current.lenx > p.x){
				alive = false;
			}
		}

		if(!alive) finish(false);
	}

	else if(yline === 0){
		var alive = false;
		var num;
		for (var i = 0; i < 3; i++) {
			var current = ends[i];
			if(current.x <= p.x && current.x + current.lenx >= p.x + p.len){
				alive = true;
				num = i;
			}
		}

		if(alive && ends[num].full === false){
			players.push(p);
			p = new player();
			ends[num].full = true;
			score++;

			if(score === 3){
				finish(true);
			}
		}

		else{
			finish(false);
		}

	}
}

// DRAW METHODS
function frame(){
	ctx.clearRect(0, 0, cw, ch);
	ctx.fillStyle = "skyblue";
	ctx.fillRect(0, 0, cw, ch / 2);
	ctx.fillStyle = "#848484";
	ctx.fillRect(0, ch / 2, cw, ch / 2);
}

function Score(){
	ctx.font = "3vw Arial";
	ctx.fillStyle = "red";
	ctx.fillText("Score: " + score, cw * 0.01, cw * 0.04);
}

function floorInit(){
	
	for(let i = 0; i < 9; i++){	
		var temp = new areas(i);

		if(i === 0){
			temp.color = "#78AB46";
		}
		
		else if(i < 4){
			temp.color = "skyblue";
		}	
		
		else if(i === 4){
			temp.color = "#3F6826";
		}	
		else if(i < 8){
			temp.color = "#848484";
		}	

		else {
			temp.color = "#397D02";
		}		
		floors.push(temp);	
	}
}

function draw(){
	isAlive();
	frame();
	for(var i = 0; i < 9; i++){
		floors[i].draw();
	}
	blockCheck();
	
	var end1 = new endPlaces(1);
	var end2 = new endPlaces(2);
	var end3 = new endPlaces(3);
	ends.push(end1, end2, end3);

	for(var i = 0; i < 3; i++){
		ends[i].draw();
	}

	var lowerBound = function(){
		if(block[i].length > 6) return block[i].length - 6;
		else return 0;
	}

	for(var i = 0; i < 8; i++){
		for(var j = lowerBound(); j < block[i].length; j++){
			block[i][j].draw();
		}
	}
	for(var i = 0; i < players.length; i++){
		players[i].draw();
	}
	p.draw();
	Score();
}

// ON EVENT METHODS
function gameBegin(){
	
	floors = [];
	block = [8];
	for (var i = 0; i < 8; i++) {
		block[i] = [];
	}
	score = 0;
	ends = [];
	players = [];

	document.getElementById("btn").style.display = "none";
	document.getElementById("myCanvas").style.display = "block";
	canvasInit();
	floorInit();
	p = new player();
	inter = setInterval(draw, fps);
}

function finish(win){
	document.getElementById("myCanvas").style.display = "none";
	document.getElementById("btn").style.display = "block";
	var text = "You win :) </br> Restart?";
	if(!win){
		text = "You lose :( </br> Restart?";
	}
	document.getElementById("btn").innerHTML = text;
	clearInterval(inter);
}