"use strict";

// Get the canvas and its context
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 514;
document.getElementById("canvas").appendChild(canvas);

// Initial coordinates for bug
var bug = {
    x: 400,
    y: 250
};

var bugImage = new Image();
bugImage.onload = function () {
    ctx.drawImage(bugImage, bug.x, bug.y, 40, 40);
};
bugImage.src = "bug.png";

// Get the background image element
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "leafbackground.jpg";

// Get the bug image element
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
    bugReady = true;
};
bugImage.src = "bug.png";

// Bug object and game variables
var bug = {};
var score = 0;
var interval = 2000; 
var speed = 0;
var resetSpeedBtn = document.getElementById("resetSpeed");
var resetScoreBtn = document.getElementById("resetScore");
var displayScore = document.getElementById("score");

// Reset the game when the player catches a bug
var reset = function () {
    var bugWidth = 40;
    var bugHeight = 40;
    var maxX = canvas.width - bugWidth;
    var maxY = canvas.height - bugHeight;
    
    bug.x = 32 + Math.floor(Math.random() * (maxX - 64));
    bug.y = 32 + Math.floor(Math.random() * (maxY - 64));
    
    interval = 2000;
};

// Update function to updated game based on elapsed time
var update = function (deltaTime) {
    
    if(speed>=10)
    {
     interval-=100;
    
    }
    else if(speed>=20) 
    {
        interval-=150;
    }

    interval -= deltaTime;
    if (interval <= 0) {
        var bugWidth = 40;
        var bugHeight = 40;
        var maxX = canvas.width - bugWidth;
        var maxY = canvas.height - bugHeight;
        
        bug.x = 32 + Math.floor(Math.random() * (maxX - 64));
        bug.y = 32 + Math.floor(Math.random() * (maxY - 64));
        interval = 2000; 
    }

}

// Render the background image, bug image, and display score
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    }

    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y, 40, 40);
    }

  
    displayScore.textContent = "Score: " + score;
}

//keyboard control
canvas.addEventListener("click", function(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
  
    
    if (mouseX >= bug.x && mouseX <= bug.x + 40 &&
        mouseY >= bug.y && mouseY <= bug.y + 40) {
     score++;
     speed+=1;
     reset();
    }
})

resetSpeedBtn.addEventListener("click", function() {
    interval = 2000;
    speed = 0;
   
})

resetScoreBtn.addEventListener("click", function() {
    score = 0;
    speed = 0;
})

// Main game loop
var lastTime = Date.now();
var main = function () {
    var now = Date.now();
    var deltaTime = now - lastTime;
    lastTime = now;
    update(deltaTime);
    render();
   
    requestAnimationFrame(main);
}

// Ensuring compatibility with web browsers
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//Intialization and start
reset();
main();