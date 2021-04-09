
var monkey , monkey_running;
var invisibleGround,ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY = 1;
var END = 0;
var gameState = "PLAY";


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(windowWidth,windowHeight);

  monkey = createSprite(80,315,width/2,200);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,350,900,10);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  obstaclesGroup = new Group();
  FoodGroup = new Group();

  monkey.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  
  if(gameState === "PLAY"){
    
 //   ground.velocityX = -(4 + 3* score/100)
    //scoring
    //score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        
    }     
    
    
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
    
    spawnbanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
   else if (gameState === END) {
  
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
     
     
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }

  drawSprites(); 
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(800,320,10,40);
   obstacle.velocityX = -6
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
   obstacle.addImage(obstacleImage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle); 
 }
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
   banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
   // banana.depth = banana.depth + 1;
    monkey.depth = banana.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}

