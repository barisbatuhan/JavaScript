function direct(id){

	document.getElementById("about").style.display = "none";
	document.getElementById("frame").style.display = "none";
	document.getElementById("home").style.display = "none"; 

	if(id === "home"){
		document.getElementById("frame").style.transform = "none";
		document.getElementById("frame").style.src = "";
		document.getElementById("home").style.display = "block";
	}
	else if(id === "snake"){
		document.getElementById("frame").style.transform = "none";
		document.getElementById("frame").src = "../PC Games/Snake/index.html";
		document.getElementById("frame").style.display = "block";
	}
	else if(id === "bird"){
		document.getElementById("frame").style.transform = "none";
		document.getElementById("frame").src = "../PC Games/Flapy/index.html";
		document.getElementById("frame").style.display = "block";
	}
	else if(id === "pong"){
		document.getElementById("frame").style.transform = "none";
		document.getElementById("frame").src = "../PC Games/Pong/index.html";
		document.getElementById("frame").style.display = "block";
	}
	else if(id === "frog"){
		document.getElementById("frame").style.transform = "none";
		document.getElementById("frame").src = "../PC Games/Frog/index.html";
		document.getElementById("frame").style.display = "block";
	}
}

setInterval(function(){
	var topbar = document.getElementsByClassName("topbar");
	var linksbar = document.getElementsByClassName("linksbar");
	var creditsbar = document.getElementsByClassName("creditsbar");

	if(window.innerHeight >= window.innerWidth){
		document.getElementById("home").style.fontSize = "2vw";
		for(var i = 0; i < topbar.length; i++){
			topbar[i].style.fontSize = "2vw";
			topbar[i].style.lineHeight = '500%';
		}
		for(var i = 0; i < linksbar.length; i++){
			linksbar[i].style.fontSize = "2vw";
			linksbar[i].style.lineHeight = '400%';
		}
		for(var i = 0; i < creditsbar.length; i++){
			creditsbar[i].style.fontSize = "2vw";
			creditsbar[i].style.lineHeight = '400%';
		}
	}
	else{
		document.getElementById("home").style.fontSize = "2.5vh";
		for(var i = 0; i < topbar.length; i++){
			topbar[i].style.fontSize = "3vh";
			topbar[i].style.lineHeight = '300%';
		}
		for(var i = 0; i < linksbar.length; i++){
			linksbar[i].style.fontSize = "3vh";
			linksbar[i].style.lineHeight = '200%';
		}
		for(var i = 0; i < creditsbar.length; i++){
			creditsbar[i].style.fontSize = "3vh";
			creditsbar[i].style.lineHeight = '200%';
		}
	}
}, 100);
