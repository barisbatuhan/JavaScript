// KEYBOARD CONTROLS

window.addEventListener('keypress', function(e){
	
	if(e.keyCode === 119){			// UP
		p.y -= ch / 9;
	}
	else if(e.keyCode === 97){		// LEFT
		p.x -= 0.1 * ch;
	}
	else if(e.keyCode === 100){		// RIGHT
		p.x += 0.1 * ch;
	}
	else if(e.keyCode === 115){		// DOWN
		p.y += ch / 9;
	}
	
}, false);

// TOUCH SCREEN CONTROLS

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            p.x -= 0.1 * ch; 
        } else {
            p.x += 0.1 * ch;
        }                       
    } else {
        if ( yDiff > 0 ) {
            p.y -= ch / 9;
        } else { 
           p.y += ch / 9;
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};