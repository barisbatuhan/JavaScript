
function Start(){
    if(pressed == "no"){
    valueInt = setInterval(Flow, 150);
    pressed = "yes";
    } else{
        pressed = "no";
        clearInterval(valueInt);
    }
}

function MainMenu(){
    location.replace(location);
}

function Again(){
    if(!singleplay){
        x1 = parseInt(w/3), y1 = parseInt(h/3), x2 = parseInt(2*w/3), y2 = parseInt(2*h/3);
    }
    else{
        x1 = parseInt(w/2), y1 = parseInt(h/2), x2 = 0, y2 = 0;
    }
    for(var e = 0; e < w*h; e++){ 
        tailX1[e] = 0;
        tailY1[e] = 0;
        tailX2[e] = 0;
        tailY2[e] = 0;
    }
    frx = Randint(w-3), fry = Randint(h-3);
    dir1 = "", dir2="";
    lfx = 0, lfy = 0;
    gameover = false, s1wins = false, s2wins = false;
    temp11 = 0, temp12 = 0, temp13 = 0, temp14 = 0, a1 = 0;
    temp21 = 0, temp22 = 0, temp23 = 0, temp24 = 0, a2 = 0;
    tail1 = 0; tail2 = 0;
    var lpart = document.getElementById("later");
    lpart.style.display = "block";
    var zpart = document.getElementById("last");
    zpart.style.display = "none";
}

function Flow(){
    
    if(!gameover){
        Draw();
        Direc();
        Conditions();
        Move();
    }
}

document.onkeydown = function (event) {

    keyCode = window.event.keyCode;
    keyCode = event.keyCode;

    switch (keyCode) {

    case 65:
    if(dir1!="right"){
        dir1 = 'left'; 
    }
    break;

    case 68:
    if(dir1!="left"){
        dir1 = 'right';
    }
    break;

    case 87:
    if(dir1!="down"){
        dir1 = 'up'; 
    }
    break;

    case 83:
    if(dir1!="up"){
        dir1 = 'down';
    }
    break;

    case 37:
    if(dir2!="right"){
        dir2 = 'left'; 
    }
    break;
    case 39:
    if(dir2!="left"){
        dir2 = 'right';
    }
    break;
    case 38:
    if(dir2!="down"){
        dir2 = 'up'; 
    }
    break;
    case 40:
    if(dir2!="up"){
        dir2 = 'down';
    }
    break;
    }
}

function Fruit(){

	var a, b;
	
	do{
		a = Randint(w-3);
		b = Randint(h-3);
	} while (map[a][b] != " ");

	lfx = frx;
	lfy = fry;
	frx = a;
	fry = b;
}

function Direc(){
    if(dir1 == "up") y1--;
    else if(dir1 == "down") y1++;
    else if(dir1 == "left") x1--;
    else if(dir1 == "right") x1++;

    if(dir2 == "up") y2--;
    else if( dir2 == "down") y2++;
    else if(dir2 == "left") x2--;
    else if(dir2 == "right") x2++;
}

function First1(){
    tailX1[0] = x1;
    tailY1[0] = y1;
}

function First2(){
    tailX2[0] = x2;
    tailY2[0] = y2;
}

function Move() {

    for ( var a = 0; a < tail1; a++ ) {

		temp11 = tailX1[a+1];
		temp12 = tailY1[a+1];
		if ( a == 0 ) {
			tailX1[a+1] = tailX1[a];
			tailY1[a+1] = tailY1[a];
		}
		else {
			tailX1[a+1] = temp13;
			tailY1[a+1] = temp14;
		}
		temp13 = temp11;
        temp14 = temp12;
        tailX1[0] = x1;
        tailY1[0] = y1;
    }

    for ( var a = 0; a < tail2; a++ ) {

		temp21 = tailX2[a+1];
		temp22 = tailY2[a+1];
		if ( a == 0 ) {
			tailX2[a+1] = tailX2[a];
			tailY2[a+1] = tailY2[a];
		}
		else {
			tailX2[a+1] = temp23;
			tailY2[a+1] = temp24;
		}
		temp23 = temp21;
        temp24 = temp22;
        tailX2[0] = x2;
        tailY2[0] = y2;
    }
}

function Conditions(){

	if ( x1 == w-1 ) 
		x1 = 1;
	else if ( x1 == 0 )
		x1 = w-1;
	if ( y1 == 0 )
		y1 = h-1;
	else if ( y1 == h-1 )
        y1 = 1;
    
    if(!singleplay){
        if ( x2 == w-1 ) 
            x2 = 1;
        else if ( x2 == 0 )
            x2 = w-1;
        if ( y2 == 0 )
            y2 = h-1;
        else if ( y2 == h-1 )
            y2 = 1;
    }

	if ( x1 == frx && y1 == fry ) {
		tail1++;
        Fruit();
		if (a1 == 0) {
            First1();
            a1++;
        }
    }
    else if ( x2 == frx && y2 == fry ) {
		tail2++;
        Fruit();
		if (a2 == 0) {
            First2();
            a2++;
        }
	}
    
    else if ( map[x1][y1] == "o" || map[x1][y1] == "u" ){
        gameover = true;
        s2wins = true;
        Resulting();
    }

    else if ( map[x2][y2] == "o" || map[x2][y2] == "u" ){
        gameover = true;
        s1wins = true;
        Resulting();
    }

    else if (map[x1][y1] == "U")  { 
        gameover = true;
        Resulting();
    }
}

function Draw(){
    
    for(var i = 0; i < w; i++) {	
		for( var j = 0; j < h; j++) {
            
            if((i == 0 || i == w))
				map[i][j] = "-";
            
            else if((j == 0 || j == h))
                map[i][j] = "-";
            
            else map[i][j] = " ";
		}		
	}
	
	for ( var a1 = 0; a1 < tail1; a1++ ) {
        map[tailX1[a1+1]][tailY1[a1+1]] = "o";
    }
    for ( var a2 = 0; a2 < tail2; a2++ ) {
        map[tailX2[a2+1]][tailY2[a2+1]] = "u";
    }
    map[x1][y1] = "O";
    map[x2][y2] = "U";
    map[frx][fry] = "F";

    for(var i = 1; i < h-1; i++) {	
        for( var j = 1; j < w-1; j++) {
            
            var c = col[i].childNodes;
            
            if(map[j][i] == " ") {
                c[j].style.backgroundImage = "none";
                c[j].style.backgroundColor = "lightgrey";
            }
            else if(map[j][i] == "o") {
                c[j].style.backgroundImage = "url(img/s1body.png)";
                c[j].style.backgroundSize = "cover";
            }
        
            else if(map[j][i] == "O") {
                c[j].style.backgroundImage = "url(img/s1head.png)";
                c[j].style.backgroundSize = "cover";
            }
        
            else if(map[j][i] == "F") {
                c[j].style.backgroundImage = "url(img/food.ico)";
                c[j].style.backgroundSize = "cover";
            }

            else if(map[j][i] == "U") {
                if(!singleplay){
                    c[j].style.backgroundImage = "url(img/s2head.png)";
                    c[j].style.backgroundSize = "cover";
                }
                else{
                    c[j].style.backgroundColor = "black";
                }
            }

            else if(map[j][i] == "u") {
                c[j].style.backgroundImage = "url(img/s2body.png)";
                c[j].style.backgroundSize = "cover";
            }
        }
    }
}

function Resulting(){
    var lpart = document.getElementById("later");
    lpart.style.display = "none";
    var zpart = document.getElementById("last");
    zpart.style.display = "block";
    
    if(!singleplay) {
        if(s2wins) document.getElementById("rtext").innerHTML = "RED SNAKE WON!!!";
        else if(s1wins) document.getElementById("rtext").innerHTML = "GREEN SNAKE WON!!!";
        else document.getElementById("rtext").innerHTML = "THERE IS A TIE!!!";
    }
    else{
        if(highscore < tail1){
            highscore = tail1;
            document.getElementById("rtext").innerHTML = "You have a new high score: " + highscore;
        }
        else{
            document.getElementById("rtext").innerHTML = "High score: " + highscore + " - " + "You did: " + tail1;
        }
    }
}