var tailX1=[], tailY1=[], tailX2=[], tailY2=[];

var col = document.getElementsByClassName("pri");
var dir1 = "", dir2="";
var lfx = 0, lfy = 0;
var gameover = false, s1wins = false, s2wins = false;
var temp11 = 0, temp12 = 0, temp13 = 0, temp14 = 0, a1 = 0;
var temp21 = 0, temp22 = 0, temp23 = 0, temp24 = 0, a2 = 0;
var tail1 = 0; tail2 = 0;
var pressed="no";

function Randint(d){
    var rand = Math.floor(Math.random()*d) + 1;
    return rand;
}

var highscore = 0;
var singleplay = false;

window.onload = setInterval(function Score(){
    if(singleplay){
        document.getElementById("score").innerHTML = "Your Score: " + tail1;
    }
    else{
        document.getElementById("score").innerHTML = "Green snake: " + tail1 + " --- VS --- " + "Red Snake: " + tail2;
    }
}, 150);



