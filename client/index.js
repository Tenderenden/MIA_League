class ImageInstance {
    constructor(pos_x, pos_y, id_name, delay=0){
        this.id = id_name;
        this.posx = pos_x;
        this.posy = pos_y;
        this.element = null;
        this.image = null;
        this.element_style = null;
        this.image_style = null;
        this.id_name = 'id'+this.id;
        this.delay = delay;
        
    }
    createOnSite(){
        this.element = document.getElementById(this.id);
        if(this.element == null){
            this.element = document.createElement('div');
            this.element.setAttribute("id", this.id_name);
            this.image = document.createElement('img');
            this.image.setAttribute('src', './usb_desc_backup.png');
            this.image.setAttribute('id', 'img'+this.id);
            // this.image.setAttribute("id", this.id_name);
            this.element.appendChild(this.image);
        }
        document.getElementById("main").appendChild(this.element);
        // document.body.appendChild(this.element);
        this.styleElement();
        document.getElementById("main").appendChild(this.element_style);
        // document.body.appendChild(this.style);
    }

    styleElement(){
        var on_site = document.getElementById(this.id_name);
        var xpos = (this.posx - on_site.offsetLeft - 128/2);
        var ypos = (this.posy - on_site.offsetTop - 128/2);
        
        this.element_style = document.createElement('style');
        this.element_style.setAttribute("id", this.id_name);
        this.element_style.innerHTML = `#id${this.id} {visibility: hidden; position: fixed; width: 128px; height: 128px; transform: translate(${xpos}px, ${ypos}px);}`;
        this.element_style.innerHTML += `#img${this.id}{animation-name: anima; animation-duration: 1.5s; animation-fill-mode: forwards; animation-delay: ${this.delay}ms;}`
    }

    removeThis(){
        this.element.remove();
        this.element_style.remove();
    }
}


var mouseX = 0;
var mouseY = 0;
let elements = [];
var counter = 0;

var confetti;

window.onload = function()
{
    document.addEventListener('click', printMousePos);
    const canvas = document.getElementById('main_canvas');
    confetti = new JSConfetti({canvas});
}

function createInClick(X, Y) {
    var znacznik = document.getElementById('ping')
    znacznik.className = 'ping_position_test';
    var xpos = (X - znacznik.offsetLeft - znacznik.offsetWidth/2);
    var ypos = (Y - znacznik.offsetTop - znacznik.offsetHeight/2);
    znacznik.style.transform = 'translate(' + xpos + 'px, ' + ypos + 'px)';
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
    var delay = 0;
    var new_element;
    for (let index = 0; index < number; index++) {
        var x = getRandom(0, 1820);
        var y = getRandom(0, 1080);
        var delay = getRandom(0, 2000);
        new_element = new ImageInstance(x, y, index, delay);
        new_element.createOnSite();
        elements.push(new_element);
        setTimeout(removeOneElem, 1500 + delay);
    }
}

function connect(){
    var socket = new WebSocket('ws://localhost:1337');
    socket.onopen = function(e) {
        console.log("Connected to server");
        socket.send('Connection from site');
    };

    socket.onclose = function(e) {
        console.log("Connection closed. Reconnect in 1s...")
        delete socket
        setTimeout(function() {
            connect();
        }, 1000);
    }

    socket.onmessage = function(e) {
        console.log('Message from server: ',e.data);
        if (e.data == "mia") {
            console.log("ping");
            showRandomPings(35);
        }
    }
};


/* function showconfetti(){
    var confetti = new JSConfetti();
    confetti.addConfetti();
} */
// window.setInterval(showRandomPings, 2000, 10);

connect();