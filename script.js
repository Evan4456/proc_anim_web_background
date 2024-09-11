//get the canvas element
var canvas = document.getElementById("proc_anim");
canvas.width = document.body.clientWidth; 
canvas.height = document.body.clientHeight;
var ctx = canvas.getContext("2d");
 
var spine = [[200, 200], [200, 200], [200, 200], [200, 200], [200, 200]];


// setInterval(updatePos, 25);

function updatePos(p){

    var headpos = spine[0];
    var mousepos =  [p.pageX, p.pageY];


    for( var i = 1; i < 5; i ++){
        spine[i] = constrainDistance(spine[i], spine[i - 1], 20);
    
        ctx.beginPath();
        ctx.clearRect(0,0, canvas.width, canvas.height);
    
        ctx.arc(spine[i - 1][0], spine[i - 1][1], 5, 0, 2 * Math.PI); // draw the anchor

        ctx.stroke();

        ctx.beginPath();
        ctx.arc(spine[i][0],spine[i][0], 5, 0, 2 * Math.PI);
        ctx.stroke();

    }

    console.log("should be showing circles");
    // v = subVectors(cords, [p.pageX, p.pageY]);

    // mag = getMagnitude(v);

    // // constrain vector

    // v[0] = (v[0] / mag) * 20;
    // v[1] = (v[1] / mag) * 20;
  
    // ctx.beginPath();
    // ctx.clearRect(0,0, canvas.width, canvas.height);
  
    // ctx.arc(p.pageX, p.pageY, 5, 0, 2 * Math.PI); // draw the anchor

    // ctx.stroke();

    // ctx.beginPath();
    // ctx.arc(p.pageX + v[0], p.pageY + v[1], 5, 0, 2 * Math.PI);
    // ctx.stroke();

    

    // cords[0] = p.pageX + v[0];
    // cords[1] = p.pageY + v[1]

};

canvas.addEventListener('mousemove', updatePos, false);

console.log(getAngle([0,1], [1, 0]))

// proc anim untils

function constrainDistance(pos, anchor, constraint){
    return addVectors(anchor, scaleVector(subVectors(pos, anchor), constraint));
}

function constrainAngle(angle, anchor, constraint ){

}

//helper functions for vector math

function getAngle(pointA, pointB){
    return 1 / Math.tan( (pointB[1] - pointA[1]) / (pointB[0] - pointA[0]) );
}

function subVectors(pointA, pointB){
    return [(pointB[1] - pointA[1]) , (pointB[0] - pointA[0])];
}

function addVectors(pointA,  pointB){
    return [pointA[0] + pointB[0], pointA[1] + pointB[1] ];
}

function getMagnitude(pointA){
    return Math.sqrt((pointA[0] * pointA[0]) + (pointA[1] * pointA[1]));
}

function scaleVector(pointA, scalar){
    mag = getMagnitude(pointA);
    return [pointA[0] / mag * scalar, pointA[1] / mag * scalar];
}