
//vector class and helper methods
class Vector {
    constructor(x_, y_){
        this.x = x_;
        this.y = y_;
    }
   
    scaleVector(mag, scalar){
        this.x = this.x * (scalar / mag);
        this.y = this.y * (scalar / mag);
    }
}


function subVectors(pointA, pointB){
    return new Vector((pointB.x - pointA.x) , (pointB.y - pointA.y));
}

function addVectors(pointA,  pointB){
    return new Vector(pointA.x + pointB.x, pointA.y + pointB.y );    
}

function getMagnitude(pointA, pointB){
    return Math.sqrt(((pointB.x - pointA.x) * (pointB.x - pointA.x)) + ((pointB.y - pointA.y) * (pointB.y - pointA.y)));
}

function convertPoint(pointA){
    pointA.x = pointA.x - canvas.width / 2;
    pointA.y = (pointA.y * -1) + canvas.height;
}


//set up the canvas 

var canvas = document.getElementById("proc_anim");
canvas.width = document.body.clientWidth; 
canvas.height = document.body.clientHeight;
var ctx = canvas.getContext("2d");

//Global variables for how to draw the fish

seg_col = ["red", "blue", "green", "yellow","red", "blue", "green", "yellow" ];
link_len = [64, 64, 64, 64, 64, 64, 64, 64, 64];
link_width = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
seg_radius = [68, 81, 84, 83, 77, 64, 51, 38, 32, 19];

chain = [ new Vector(0,0), new Vector(0,45),new Vector(125,50), new Vector(200,100), new Vector(400,150), new Vector(0,0), new Vector(0,0), new Vector(0,0), new Vector(0,0), new Vector(0,0)];

mouse = new Vector(0,0);

function updateMousePos(p){
    mouse.x = p.pageX;
    mouse.y = p.pageY;
}

function resovleBody(){
    chain[0] = new Vector( mouse.x, mouse.y);

    for(var i = 1; i < chain.length; i++){
        between_vector = subVectors(chain[i - 1], chain[i]);

        mag = getMagnitude(new Vector(0,0), between_vector);

        between_vector.scaleVector(mag, link_len[i - 1]);

        chain[i] = addVectors(between_vector, chain[i - 1]);
    }
}

function drawBody(){
    ctx.beginPath();
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.stroke();

    for(var i = 1; i < chain.length; i++){
        ctx.strokeStyle = seg_col[i - 1];
        ctx.lineWidth = link_width[i - 1];
        ctx.beginPath();
        ctx.moveTo(chain[i - 1].x, chain[i - 1].y);
        ctx.lineTo(chain[i].x, chain[i].y);
        ctx.stroke();
    }

    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";

    for(var i = 0; i < chain.length; i++){
        ctx.beginPath();
        ctx.arc(chain[i].x, chain[i].y, seg_radius[i], 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    //draw fins hopefully

    ctx.strokeStyle = "lightblue";
    ctx.fillStyle = "yellow";
    ctx.lineWidth = 2;

    for(var i = 1; i < chain.length; i++){
        ctx.beginPath();
        ctx.moveTo(chain[i - 1].x, chain[i - 1].y);
        ctx.quadraticCurveTo(chain[i - 1].x + link_len[i] , chain[i - 1].y + link_len[i] ,chain[ i ].x, chain[i].y);
        ctx.fill();
        ctx.stroke();
    }
}

function mainLoop(){
    resovleBody();
    drawBody();
}

canvas.addEventListener('mousemove', updateMousePos, false);

setInterval(mainLoop, 10);

// function animLoop(){
//     mainLoop();
//     requestAnimationFrame(animLoop);
// }

// requestAnimationFrame(animLoop);