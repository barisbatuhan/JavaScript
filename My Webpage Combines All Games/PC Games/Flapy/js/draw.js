var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
var fps = 1;
var bird = new Player();
var blockarray = [];

function score(){
	ctx.font = "600 30px Arial";
	ctx.fillStyle = "red";
	ctx.fillText("Score: " + passed, 10, 30);
}

function canvasSet(){
	canvas.height = window.innerHeight * 0.995;
	canvas.width = window.innerWidth;
	ctx.fillStyle='skyblue';
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillRect(0,0,canvas.width,canvas.height);
}

function draw(){
	canvasSet();
	var downLimit = function(){
		if(blockarray.length < 7) return 0;
		else return blockarray.length - 7;
	}

	for(var i = downLimit(); i < blockarray.length; i++){
		blockarray[i].draw();
	}

	bird.draw();
	score();

	if(!isAlive()){
		clearInterval(process);
	}
}

function update(){
	blockCreator();
}

var process;
window.onload = function(){
	process = setInterval(function(){
		draw();
		update();
	}, 1);
}
