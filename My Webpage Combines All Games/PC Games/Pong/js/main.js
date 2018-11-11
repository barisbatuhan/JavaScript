// CANVAS OBJECT
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
var fps = 1;

// GAME DECLARATIONS
var b;
var block1, block2;
var score1 = 0, score2 = 0;
var beginLen = 0;
// to check if the short sides are hitten or not
var b1up = false, b2up = false, b1down = false, b2down = false;

// SCREEN SIZE MANAGEMENT

var cw, ch, cnh;
var desktop;
if(screen.height > screen.width) desktop = false;
else desktop = true;

function canvasInit(){

	if(desktop){
		
		if(0.9 * 0.5625 * window.innerWidth <= window.innerHeight){
			canvas.width = 0.9*window.innerWidth;
			canvas.height = 0.5625 * canvas.width;
		}

		else{
			canvas.height = 0.9 * window.innerHeight;
			canvas.width = 1.77 * canvas.height;
		}

	}

	else{
		
		canvas.width = 0.9 * window.innerWidth;
		canvas.height = 0.5625 * canvas.width;

	}

	cw = canvas.width;
	ch = canvas.height;
	cnh = ch / 10;
	beginLen = window.innerHeight / 2 - ch / 2;
}

// HELPERS

function increasex(num){
	var increase1 = Math.abs(block1.y - block1.prevy) / (8 * b.vel);
	var increase2 = Math.abs(block2.y - block2.prevy) / (8 * b.vel);
	var rand1 = Math.random() + 0.5;

	if(num === 1){
		
		if(increase1 * rand1 >= 1){
			return increase1 * rand1;
		}
		
		else{
			return 1;
		}
	}
	
	else{
		
		if(increase2 * rand1 >= 1){
			return increase2 * rand1;
		}
		
		else{
			return 1;
		}
	}

}

function increasey(num){
	var increase1 = Math.abs(block1.y - block1.prevy) / (8 * b.vel);
	var increase2 = Math.abs(block2.y - block2.prevy) / (8 * b.vel);
	var rand2 = (Math.random() + 0.5) * sign();

	if(num === 1){

		if(Math.abs(increase1 * rand2) >= 1){
			return increase1 * rand2;
		}
		
		else{
			return 1 * sign();
		}
	}

	else{
		if(Math.abs(increase2 * rand2) >= 1){
			return increase2 * rand2;
		}
		
		else{
			return 1 * sign();;
		}
	}
}

var sign = function(){
	var rand = parseInt(Math.random() * 2);
	if(rand === 1) return 1;
	else return -1;
}

// OBJECTS

function Ball(){
	
	this.len = cw / 40;
	this.x = cw / 2 - this.len / 2;
	this.y = (cnh + ch) / 2 - this.len / 2;
	
	this.velx = (Math.random() + 1) * sign() * cw / 800;
	this.vely = (Math.random() + 1) * sign() * ch / 800;
	this.vel = Math.sqrt(Math.pow(this.velx, 2) + Math.pow(this.vely, 2));

	this.draw = function(){
		ctx.fillStyle = "#3B3B3B";
		ctx.fillRect(this.x, this.y, this.len, this.len);
		this.update();
	}

	this.update = function(){
		this.x += this.velx;
		this.y += this.vely;
		this.vel = Math.sqrt(Math.pow(this.velx, 2) + Math.pow(this.vely, 2));
		// if ball hits to the sides of block 1
		// long
		if(this.y > block1.y - this.len 
		   && this.y + this.len < block1.y + block1.leny){
			if(!b1up && !b1down && this.x < block1.x + block1.lenx){
				this.velx *= -increasex(1);
				this.vely *= increasey(1);
				b1up = true;
				b1down = true;
				b2up = false;
				b2down = false;
			}
		}
		//short
		else if(b.x < block1.x + block1.lenx && b.x + b.len > block1.x){
			if(!b1up && b.y < block1.y + block1.leny && b.y + b.len > block1.y){
				b.velx *= -increasex(1);
				b.vely *= increasey(1);
				b1up = true;
				b2up = false;
				b2down = false;
			}
			else if(!b1down && b.y > block1.y + block1.leny && b.y < block1.y + block1.leny){
				b.velx *= -increasex(1);
				b.vely *= increasey(1);
				b1down = true;
				b2up = false;
				b2down = false;
			}
		}

		// if ball hits to the sides of block 2
		//long
		if(this.y > block2.y - this.len 
			&& this.y + this.len < block2.y + block2.leny){
			if(!b2up && !b2down && this.x + this.len > block2.x){
				this.velx *= -1;
				b2up = true;
				b2down = true;
				b1up = false;
				b1down = false;
			}
		}	
		//short	
		else if(b.x < block2.x + block2.lenx && b.x + b.len > block2.x){
			if(!b2up && b.y < block2.y + block2.leny && b.y + b.len > block2.y){
				b.velx *= -increasex(2);
				b.vely *= increasey(2);
				b2up = true;
				b1up = false;
				b1down = false;
			}
			else if(!b2down && b.y > block2.y + block2.leny && b.y < block2.y + block2.leny){
				b.velx *= -increasex(2);
				b.vely *= increasey(2);
				b2down = true;
				b1up = false;
				b1down = false;
			}
		}

		// if the ball passes the blocks
		if(this.x < 0){
			score1++;
			this.x = cw / 2 - this.len / 2;
			this.y = (cnh + ch) / 2 - this.len / 2;
			this.velx = (Math.random() + 0.5) * sign() * cw / 1000;
			this.vely = (Math.random() + 0.5) * sign() * ch / 1000;
			b1up = false;
			b1down = false;
			b2up = false;
			b2down = false;
		}

		else if(this.x > cw - this.len){
			score2++;
			this.x = cw / 2 - this.len / 2;
			this.y = (cnh + ch) / 2 - this.len / 2;
			this.velx = (Math.random() + 0.5) * sign() * cw / 1000;
			this.vely = (Math.random() + 0.5) * sign() * ch / 1000;
			b1up = false;
			b1down = false;
			b2up = false;
			b2down = false;
			draw();
		}

		// if the block touches to the upper and lower sides of the area
		else if(this.y < cnh || this.y > ch - this.len){
			this.vely *= -1;
		}
	}
}

function Block(num){
	this.lenx = cw / 32;
	this.leny = ch / 4;
	this.y = (ch + cnh) / 2 - this.leny / 2;
	this.prevy = this.y;
	if(num === 1){
		this.x = cw / 20 - this.lenx / 2;
	}
	else{
		this.x = 19 * cw / 20 - this.lenx / 2;
	}

	this.draw = function(){
		ctx.fillStyle = "#3B3B3B";
		ctx.fillRect(this.x, this.y, this.lenx, this.leny);
		this.update();
	}

	this.update = function(){
		
		if(num !== 1 && b.x > cw / b.vel){
			if(b.y < this.y){
				this.y -= Math.abs(b.vel) / 2.5;
			}
			else if(b.y + b.len > this.y + this.leny){
				this.y += Math.abs(b.vel) / 2.5;
			}
		}
	}
}

// CONTROLS

onmousemove = function(){
	var gety = event.clientY;
	block1.prevy = block1.y;
	block2.prevy = block2.y;
	if(gety > beginLen + cnh + ch / 8 
		&& gety < beginLen + ch - ch / 8){
		block1.y = gety - beginLen - ch / 8;
	}

	else if(gety < beginLen + cnh + ch / 8){
		block1.y = cnh;
	}

	else{
		block1.y = ch - ch / 4;
	}
}

var src = document.getElementById("myCanvas");

src.addEventListener('touchmove', function(e) {
	var deltaY;
	block1.prevy = block1.y;
	block2.prevy = block2.y;
  	// Compute the change in X and Y coordinates. 
  	// The first touch point in the changedTouches
  	// list is the touch point that was just removed from the surface.
  	deltaY = e.touches[0].clientY;

	if(deltaY > beginLen + cnh + ch / 8 
		&& deltaY < beginLen + ch - ch / 8){
		block1.y = deltaY - beginLen - ch / 8;
	}

	else if(deltaY < beginLen + cnh + ch / 8){
		block1.y = cnh;
	}

	else{
		block1.y = ch - ch / 4;
	}
});

// DRAWINGS

function stadium(){

	ctx.clearRect(0, 0, cw, ch);
	
	ctx.strokeStyle = "#4D4D4D";
	ctx.beginPath();
	ctx.moveTo(cw / 2, cnh);
	ctx.lineTo(cw / 2, ch);
	ctx.lineWidth = cw / 200;
	ctx.stroke();
	ctx.closePath();
	
	ctx.fillStyle = "#4D4D4D";
	ctx.beginPath();
	ctx.arc(cw / 2, (ch + cnh) / 2, cw / 8, 0, 2*Math.PI);
	ctx.fill();
	ctx.closePath();

	ctx.fillStyle = "#B9B4B4";
	ctx.beginPath();
	ctx.arc(cw / 2, (ch + cnh) / 2, cw / 8.3, 0, 2*Math.PI);
	ctx.fill();
	ctx.closePath();

	ctx.strokeStyle = "#4D4D4D";
	// dashes are 1st and spaces are 2nd
	ctx.setLineDash([cw / 50, cw / 100]); 
	ctx.beginPath();
	ctx.moveTo(cw / 20, cnh);
	ctx.lineTo(cw / 20, ch);
	ctx.lineWidth = cw / 200;
	ctx.stroke();
	ctx.closePath();

	ctx.strokeStyle = "#4D4D4D";
	ctx.beginPath();
	ctx.moveTo(19 * cw / 20, cnh);
	ctx.lineTo(19 * cw / 20, ch);
	ctx.lineWidth = cw / 200;
	ctx.stroke();
	ctx.closePath();

	ctx.setLineDash([0, 0]);
	ctx.strokeStyle = "#3B3B3B";
	ctx.lineWidth = cw / 100;
	ctx.strokeRect(0, cnh, cw, ch - cnh);
}

function score(){
	
	var fontSize  = cw / 20;
	ctx.font = fontSize + "px Orbitron";
	ctx.fillStyle = "#3B3B3B";
	ctx.textAlign = "center"; 
	ctx.fillText(score1 + " --- VS --- " + score2, cw / 2, ch / 15);	
}

// ON EVENT METHODS
var inter;
function gameBegin(){
	document.getElementById("btn").style.display = "none";
	document.getElementById("myCanvas").style.display = "block";
	canvasInit();
	block1 = new Block(1);
	block2 = new Block(2);
	b = new Ball();
	draw();
	setTimeout(function(){
		inter = setInterval(function(){
			draw();
		}, fps);
	}, 500);
}

function draw(){
	stadium();
	score();
	block1.draw();
	block2.draw();
	b.draw();
}