
var monkey , monkey_running,monkey_stop
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,bananaGroup
var score=0
gameState="play"
var restart,restartImage
var gameOver,gameOverImage
var invisibleground
function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 
  groundImage= loadImage("ground.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 gameOverImage= loadImage("gameOver.png")
  restartImage= loadImage("restart.png")
}



function setup() {
  createCanvas(600,200)
  ground = createSprite(200,180,400,10);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  
  monkey = createSprite(50,180,20,25)
  monkey.addAnimation("monkey",monkey_running)
  scale=0.1;
  
  invisibleGround = createSprite(200,345,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  
  gameOver = createSprite(200,200,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(200,330,10,10);
  restart.addImage(restartImage);
  restart.scale = 0.2;
  restart.visible = false;

  bananaGroup = createGroup();


}


function draw() {
background(220)
  if(gameState==="play"){
   score = score + Math.round(getFrameRate()/60);
    ground.velocityX=-4
    if(ground.x<100){
   ground.x = ground.width/2;
  } 
      monkey.velocityY = monkey.velocityY+0.5;
    
  if(keyDown("space")&&monkey.y>=315){
    monkey.velocityY = -12;
  }
      monkey.collide(invisibleGround);
  obstacles();
    bananas();
    
    if(monkey.isTouching(bananaGroup)){
    points = points+1;
    monkey.scale=0.2;
      bananaGroup.destroyEach();
    }  
 if(monkey.isTouching(obstaclesGroup)){
  gameState = "end";
 } 
  }
  console.log(ground.x);
  drawSprites();
  
  textSize(20);
  text("SCORE: "+score,280,20);
  text("POINTS: "+points,10,20);
  
   if(gameState === "end"){
   
   gameOver.visible = true;
     retry.visible = true;
   
   monkey.velocityY=0;
   ground.velocityX = 0;
   
obstaclesGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);   monkey.changeAnimation("monkeyStop",monkeyStop);
   
  obstaclesGroup.setVelocityXEach(0);
 bananaGroup.setVelocityXEach(0);

   }
  
   if(mousePressedOver(retry)){
    restart();
  }
}
function obstacles(){

   if(frameCount % 80 === 0){
var obstacle = createSprite(400,326,10,10);
   obstacle.addImage("obstacle",obstacleImage);
   obstacle.scale = 0.15;
   obstacle.velocityX = -(4+score/100);
   obstacle.lifetime = 100;
             
     
 var rand = Math.round(random(1,4));
     
 switch(rand){
      
  case 1: obstacle.scale = 0.1;
                     break;
  case 2:obstacle.scale = 0.20;
                    break;
  case 3: obstacle.scale = 0.25;
                     break;
  case 4: obstacle.scale = 0.15;
   break;
  default:break;
     }   
     obstaclesGroup.add(obstacle);
 }
}
function restart(){
        gameState = "play";
        retry.visible = false;
        gameOver.visible = false;
        obstaclesGroup.destroyEach();
        monkey.changeAnimation("monkey",monkey_running);
        monkey.scale=0.1;
        score = 0;
        points = 0;
}
function bananas(){
  if(frameCount % 80 === 0){
        var banana = createSprite(400,230,10,10);
        banana.addImage(bananaImage);
        banana.velocityX= -(4+score/100);
        banana.scale=0.09;
        bananaGroup.add(banana);
  }
}