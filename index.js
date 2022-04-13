class ImageInstance {
    constructor(pos_x, pos_y, id_name){
        this.id = id_name;
        this.posx = pos_x;
        this.posy = pos_y;
        this.element = null;
        this.image = null;
        this.style = null;
        this.id_name = 'id'+this.id;
        
    }
    createOnSite(){
        this.element = document.getElementById(this.id);
        if(this.element == null){
            this.element = document.createElement('div');
            this.element.setAttribute("id", this.id_name);
            this.image = document.createElement('img');
            this.image.setAttribute('src', './usb_desc_backup.png');
            // this.image.setAttribute("id", this.id_name);
            this.element.appendChild(this.image);
        }
        document.body.appendChild(this.element);
        this.styleElement();
        document.body.appendChild(this.style);
    }

    styleElement(){
        var on_site = document.getElementById(this.id_name);
        var xpos = (this.posx - on_site.offsetLeft - 128/2);
        var ypos = (this.posy - on_site.offsetTop - 128/2);
        
        this.style = document.createElement('style');
        this.style.setAttribute("id", this.id_name);
        this.style.innerHTML = '#id' + this.id + ' {position: fixed; width: 128px; height: 128px; transform: translate(' + xpos + 'px, ' + ypos + 'px);';
    }

    removeThis(){
        this.element.remove();
        this.style.remove();
    }
}


var mouseX = 0;
var mouseY = 0;
let elements = [];
var counter = 0;

window.onload = function()
{
    document.addEventListener('click', printMousePos);
    // document.addEventListener('click', showAnim);
}

function createInClick(X, Y) {
    var znacznik = document.getElementById('ping')
    znacznik.className = 'ping_position_test';
    var xpos = (X - znacznik.offsetLeft - znacznik.offsetWidth/2);
    var ypos = (Y - znacznik.offsetTop - znacznik.offsetHeight/2);
    znacznik.style.transform = 'translate(' + xpos + 'px, ' + ypos + 'px)';
}


function showAnim(X, Y){
    var znacznik = document.getElementById('ping')
    znacznik.className = 'ping_show';
    var xpos = (X - znacznik.offsetLeft - znacznik.offsetWidth/2);
    var ypos = (Y - znacznik.offsetTop - znacznik.offsetHeight/2);
    znacznik.style.transform = 'translate(' + xpos + 'px, ' + ypos + 'px)';
    znacznik.style.visibility = 'visible';
    znacznik.style.animationIterationCount = 1;
    
    setTimeout(function() {
        znacznik.className = 'ping_hide';
    }, 2500); 
}
function printMousePos(event)
{
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    const new_el = new ImageInstance(mouseX, mouseY, counter);
    new_el.createOnSite();
    counter++;
    elements.push(new_el);
    setTimeout(removeOneElem, 1800);
}

function removeOneElem(id){
    if(elements.length){
        elements[0].removeThis();
        elements.shift();
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function showRandomPings(number){
    var x = 0;
    var y = 0;
    var new_element;
    for (let index = 0; index < number; index++) {
        var x = getRandom(0, 1920);
        var y = getRandom(0, 1080);
        new_element = new ImageInstance(x, y, index);
        new_element.createOnSite();
        elements.push(new_element);
        setTimeout(removeOneElem, 1500);
    }
}

var audio = new Audio('mia_cut.mp3');

