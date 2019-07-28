const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let circles = [];
let colors = ["#001EBA", "#05147D", "#35459E", "#003B74", "#0B42FF"];
let gravity = 1.2;
let friction = 0.90;
init();
animation();

window.addEventListener('resize',function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

function init(){
    circles = [];
    for(var i = 0; i<350; i++) {
        const radius = Math.floor(Math.random()*24)+1;
        const x = Math.floor(Math.random()*(canvas.width-radius+1)+radius);
        const y = Math.floor(Math.random()*(((canvas.height/1.5)-radius+1)+radius));
        const color = colors[Math.floor(Math.random()*(colors.length-1))];
        circles.push(new Circle(x,y,radius,color))
    }
}

function Circle(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.vy = 2;
    this.vx = Math.floor((Math.random()- 0.5)*10)+1;
    this.radius = radius;
    this.color = color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    this.update = function(){
        if(this.y+this.radius+this.vy > canvas.height){
            this.vy = -this.vy * friction;
            this.vx = this.vx * friction;
        } else {
            this.vy += gravity;
        }
        if(this.x+this.radius+this.vx > canvas.width || this.x+this.vx < this.radius){
            this.vx = -this.vx * friction;
        } 
        this.y += this.vy;
        this.x += this.vx;
        this.draw();
    }
};

function animation(){
    requestAnimationFrame(animation);
    c.clearRect(0,0,innerWidth,innerHeight);
    circles.forEach(function(circle){
        circle.update();
    })
};