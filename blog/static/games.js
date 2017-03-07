var c;
var ctx;
var enemynum;
var enemycounter;
var score;

var FPS;
var player;
var enemies = []; 

function Initialise()
{
  // Reset variables.
  score = 0;
  enemies = [];
  enemynum =0;
  enemycounter=0;
  
  if(c == null)
  {
    c=document.getElementById("canvas");
    ctx=c.getContext("2d");
    enemynum = 0;
    enemycounter=100;
    FPS = 60;
    canvas.addEventListener('mousemove', MouseMove, false);
    setInterval(function() {
    update();
    draw();
    }, 1000/FPS);  
  }
    player = {
    color: "#00A",
    x: 220,
    y: 270,
    width: 32,
    height: 32,
    draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};
}
  


function draw(){
ctx.clearRect(0, 0, 400, 400);
player.draw();
for(var i = 0; i<enemynum; i++)
  {
    enemies[i].y+=2;
    enemies[i].draw();
    collisions(i);  // Check collisions with current enemy.
  }
}


function collisions(i){
   
  var e = enemies[i];
  var p = player
  
  // Top Left
  
  if(p.x<e.hole && (p.y<(e.y+e.height)&&p.y>e.y))
  {
     //document.getElementById("testout").innerHTML=String("TL Collide");
     Finalise();
  }
  
  // Top Right
  
  if((p.x+p.width)>(e.hole+p.width+e.extragap) && ((p.y)<(e.y+e.height)&&p.y>e.y))
  {
     //document.getElementById("testout").innerHTML=String("TR Collide");
     Finalise();
  }  
  
  // Bottom Left
  
  if(p.x<e.hole && ((p.y+p.height)<(e.y+e.height)&&(p.y+p.height)>e.y))
  {
     //document.getElementById("testout").innerHTML=String("BL Collide");
     Finalise();
  }
  
  // Bottom Right
  
  if((p.x+p.width)>(e.hole+p.width+e.extragap) && ((p.y+p.height)<(e.y+e.height)&&(p.y+p.height)>e.y))
  {
     //document.getElementById("testout").innerHTML=String("BR Collide");
     Finalise();
  }
}



function update(){
  
  score++;
  // Add only 4 enemies to the screen
  if(enemynum<4)
  {
    enemycounter++;
    if(enemycounter > 50)
    // Spacing of enemies
    {
      enemycounter = 0;
      enemynum++;
    }  
  }
  
  for(var i = 0; i<enemynum; i++)
  {
    enemies.push({
    color: "#0F0",
    x: 0,
    y: -20,
    width: 400,
    height: 20,
    extragap: 20,
    hole: Math.floor(Math.random()*380),
    draw: function() {
      if(this.y>400)
      {
        this.hole = Math.floor(Math.random()*this.width-50);
        this.y=-this.height;
      }
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.hole, this.height);
      ctx.fillRect(this.hole+player.width+this.extragap, this.y, this.width, this.height);
      }
    });
  }
}


function MouseMove(e){

player.x = e.clientX-canvas.offsetLeft-player.height/2;
document.getElementById("testout").innerHTML=String(score);
player.y = e.clientY-canvas.offsetTop-player.height/2+$(document).scrollTop(); 

}

function Finalise(){
  
  alert("You lost, but scored " + score);
  Initialise();
}
