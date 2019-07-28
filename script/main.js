const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

canvas.style.background = "black";

window.addEventListener('resize', function(){
    canvas.height = innerHeight;
    canvas.width = innerWidth;
})

var mouse = {
    x: innerWidth/2,
    y: innerHeight/2
}
const circle =  new Circle(innerWidth/2,0, 90,"red");
const circle2 =  new Circle(mouse.x,mouse.y,70,"blue");

window.addEventListener('mousemove', function(e){
    circle2.x = e.clientX;
    circle2.y = e.clientY;
})




const gravity = 1.1;
const friction = 0.98;
animate();
function Circle(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.vy = 1;
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
        if(this.y+this.radius > canvas.height){
            this.vy = -this.vy * friction;
        } else {
            this.vy += gravity;
        }
        this.y += this.vy;
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    circle.draw();
    circle.update();
    circle2.draw();

    const distance = getDistance(circle.x,circle.y,circle2.x,circle2.y);
    const hitbox = distance < circle2.radius+circle.radius;
    if(hitbox) {
        circle2.color = "green";
    } else {
        circle2.color = "blue";
    }
}

function getDistance(x1,y1,x2,y2) {
    const distanceX = x1 - x2;
    const distanceY = y1 - y2;
    // get distance between 2 points ==> use pythagore
    // c²= Math.sqrt(a²+b²)
    return Math.hypot(distanceX,distanceY)
}