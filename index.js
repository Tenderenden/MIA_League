class ImageInstance {
    constructor(pos_x, pos_y, id_name){
        this.id = id_name;
        this.posx = pos_x;
        this.posy = pos_y;
        this.element = null;
        this.style = null;
        this.id_name = 'id'+this.id;
    }
    createOnSite(){
        this.element = document.getElementById(this.id);
        if(this.element == null){
            this.element = document.createElement('div');
            this.element.setAttribute("id", this.id_name);
        }
        document.body.appendChild(this.element);
        this.styleElement();
        document.body.appendChild(this.style);
    }

    styleElement(){
        var on_site = document.getElementById(this.id_name);
        var xpos = (this.posx - on_site.offsetLeft - 20);
        var ypos = (this.posy - on_site.offsetTop - 20);
        
        this.style = document.createElement('style');
        this.style.setAttribute("id", this.id_name);
        this.style.innerHTML = '#id' + this.id + ' {position: fixed; width: 40px; height: 40px; border: 2px solid black; transform: translate(' + xpos + 'px, ' + ypos + 'px);';
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
    console.log('x:', mouseX, ' y:', mouseY);
    // showAnim(mouseX, mouseY);
    // createInClick(mouseX, mouseY);
    /* elements.push("el"+elements.length);
    console.log(elements)
    const el = document.createElement('div');
    el.textContent = elements[elements.length - 1];
    document.body.appendChild(el); */
    const new_el = new ImageInstance(mouseX, mouseY, counter);
    new_el.createOnSite();
    counter++;
    elements.push(new_el);
    setTimeout(removeOneElem, 2000);
}

function removeOneElem(id){
    if(elements.length){
        elements[0].removeThis();
        elements.shift();
    }
}


var audio = new Audio('mia_cut.mp3');

