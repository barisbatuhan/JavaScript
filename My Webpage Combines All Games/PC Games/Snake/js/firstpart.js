var ispressed= false;
var h;
var w;

function Inactivate(){
    
    var fpart = document.getElementById("first");
    fpart.style.display = "none";
    var spart = document.getElementById("second");
    spart.style.display = "none";
    var tpart = document.getElementById("third");
    tpart.style.display = "none";
    var lpart = document.getElementById("later");
    lpart.style.display = "none";
    var zpart = document.getElementById("last");
    zpart.style.display = "none";
}

function firstpass(){
    var ppart = document.getElementById("preview");
    ppart.style.display = "none";
    var fpart = document.getElementById("first");
    fpart.style.display = "block";
}

function fsubmit(){
    var fpart = document.getElementById("first");
    fpart.style.display = "none";
    var spart = document.getElementById("second");
    spart.style.display = "block";
}

function Next(){
    var spart = document.getElementById("second");
    spart.style.display = "none";
    var tpart = document.getElementById("third");
    tpart.style.display = "block";
}

function h10(){
    h = 10;
}

function h20(){
    h = 20;
}

function h30(){
    h = 30;
}

function HvsW(){
    w = h/2;
}

function HW(){
    w = h;
}

function WvsH(){
    w = 2*h;
}

function SingleP(){
    x1 = parseInt(w/2), y1 = parseInt(h/2), x2 = 0, y2 = 0;
    singleplay = true;
}

function Submition(){
    
    var tpart = document.getElementById("third");
    tpart.style.display = "none";
    var lpart = document.getElementById("later");
    lpart.style.display = "block";
    Starting();
}