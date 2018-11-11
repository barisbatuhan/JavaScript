var cols;
var winwid, winhei;
var leng, padi, cols, cols2, subleng, mobilpadi;
var div, div1;
var x1, y1, x2, y2;
var map, frx, fry;

winwid = window.innerWidth;
winhei = window.innerHeight;

function Starting() {
   
    if(winhei >= winwid){
        leng = winwid;
        padi = (winhei-winwid+100)/2;
        subleng = (leng-100)/w;
    }
    else{
        leng = winhei;
        padi = (winwid-winhei+100)/2;
        subleng = (leng-100)/h;
    }
    
    leng = leng-100;
    
    if ((w/h == 2) && (winwid > winhei)) {
        leng = 2*leng;
        padi = padi/8;
    }
    
    if((h/w == 2) && (winwid > winhei) ){
        leng = leng/2;
        padi = padi*4/3;
    }
    
    if((h > w) && (winwid < winhei)){
        subleng = subleng - subleng*(1*winwid / 3 / winhei);
        leng = subleng*w;
    }
    
    mobilpadi = (winwid-leng)*2/5;

        for(var i=0; i < h; i++){
            div = document.createElement('div');
            div.className = "pri";
            document.body.appendChild(div);
        } 
        cols = document.getElementsByClassName("pri");
     
        for(var i = 0; i < h; i++) {

            for( var j = 0; j < w; j++) {          
                
                cols2 = cols[i];
                div1 = document.createElement('div');
                div1.className = "sec";
                if(((i == 0) || (i == h-1)) || ((j==0) || (j == w-1))){
                    div1.style.backgroundColor = 'black';
                }
                cols2.appendChild(div1);
            }
        } 
            
        $('.pri').css('width', leng);
        $('.pri').css('height', subleng);
        $('.sec').css('width', subleng - 2);
        $('.sec').css('height', subleng - 2);

        Cont();

        $('.btn').css('width', leng/2);
        $('#score').css('width', leng);
        $('#rtext').css('width', leng/2 + 2);
        $('#restart').css('width', leng/4);
        $('#restart2').css('width', leng/4 - 7);
        $('.mainmenu').css('width', leng/4 - 7);
        $('#restart').css('margin-left', 0);
        $('#restart2').css('margin-left', 0);

    if(!singleplay){
        x1 = parseInt(w/3), y1 = parseInt(h/3), x2 = parseInt(2*w/3), y2 = parseInt(2*h/3);
    }
    map = new Array(w);
    for (var i = 0; i < w ; i++) {
        map[i] = new Array(h);
    }
    for(var e = 0; e < w*h; e++){ 
        tailX1[e] = 0;
        tailY1[e] = 0;
        tailX2[e] = 0;
        tailY2[e] = 0;
    }
    frx = Randint(w-3), fry = Randint(h-3);
    Start();

}

function Cont(){
        
    if(winhei < winwid){
        $('.pri').css('margin-left', padi);
        $('#btn1').css('margin-left', padi);
        $('#score').css('margin-left', padi);
        $('#rtext').css('margin-left', padi);
    }
    else{
        $('.pri').css('margin-left', mobilpadi);
        $('#btn1').css('margin-left', mobilpadi);
        $('#score').css('margin-left', mobilpadi);
        $('rtext').css('margin-left', mobilpadi);
    }
}
