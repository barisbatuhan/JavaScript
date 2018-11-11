window.addEventListener('keypress', function(e){
	if(e.keyCode === 113){
		bird.time = 0;
	}
}, false);

window.addEventListener('touchstart', function(ev){
	bird.time = 0;
	ev.preventDefault();
}, false);
