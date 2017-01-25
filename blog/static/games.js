var c;
var ctx;
var enemynum;
var enemycounter;

var FPS;
var player
var enemies = []; 



function Initialise()
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
    enemies[i].y++;
    enemies[i].draw();
  }
}



function update(){
  // Add only 4 enemies to the screen
  if(enemynum<4)
  {
    enemycounter++;
    if(enemycounter > 100)
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
    draw: function() {
      if(this.y>400)
      {
        this.y=-this.height;
      }
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    })
  }
}


function MouseMove(e){

player.x = e.clientX-canvas.offsetLeft-player.height/2;
document.getElementById("testout").innerHTML=String(player.x)+",";
player.y = e.clientY-canvas.offsetTop-player.height/2; 
document.getElementById("testout").innerHTML+=String(player.y);

}
