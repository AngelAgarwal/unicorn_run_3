var ground;
var unicorn, unicornImage ,unicornImage2, unicornJump;
var mud,mudImg;
var mud2;

var life1, life2, life3;
var lifeImg;

var score = 0;
var heart = 3;

var enemyGroup;
var won, wonImg;
var gameState = "run";
var cloud, cloudImg;

var donut, donutImg;

function preload(){
   lifeImg = loadImage("life.png");
  
   mudImg = loadImage("mud.png")
   cloudImg=loadImage("cloud.png")
 unicornImage = loadImage("rarity.png"),("walking.png")
   unicornJump  = loadImage("jump.png");
  //unicornDug  = loadImage("dug.png")
   unicornCollide = loadImage("collide.png");
    wonImg = loadImage("won.png")
    lose = loadImage("lose.png")
    
mud2 = loadImage("snowball.png")

    donutImg = loadImage("donut.png")

  }

function setup(){


    createCanvas(900,400);

    // creating the unicorn sprite

    unicorn = createSprite(50,290,10,10)
    unicorn.addImage(unicornImage)
    unicorn.scale = 0.2
    unicorn.debug = true
    unicorn.setCollider("rectangle",0,0,400,400)

    ground = createSprite(400,360,1200,10)
    ground.shapeColor = "brown"

    life1 = createSprite(850,50,10,10)
    life1.addImage(lifeImg)
    life1.scale= 0.3;

    life2 = createSprite(800,50,10,10)
    life2.addImage(lifeImg)
    life2.scale= 0.3;

    life3 = createSprite(750,50,10,10)
    life3.addImage(lifeImg)
    life3.scale= 0.3;

   

  //creating groups for enemy
    enemyGroup = new Group();
    food = new Group();
    cloudGroup = new Group();
}

function draw(){
    background("pink")
    textSize(20)
    fill("black")
    text("press up arrow to jump")
    if(heart===3){
      life3.visible = true
      life1.visible = true
      life2.visible = true
    }
    if(heart===2){
      life2.visible = true
      life1.visible = true
      life3.visible = false
    }
    if(heart===1){
      life1.visible = true
      life3.visible = false
      life2.visible = false
    }
//go to gameState "lost" when 0 lives are remaining
if(heart===0){
  gameState = "lost"
  
}
if(score==100){
  gameState = "won"
 
}
//moving the unicorn up
if(keyDown("UP_ARROW")&& unicorn.y  >= height-220){
  unicorn.y =unicorn.y-30
  unicorn.addImage(unicornJump)
  unicorn.scale = 0.3
  unicorn.setCollider("rectangle",0,0,150,150)
  console.log("up")
}
unicorn.velocityY = unicorn.velocityY + 0.8
if(unicorn.y>280){
 unicorn.addImage(unicornImage,unicornImage2)
 unicorn.scale = 0.2;
 unicorn.velocityY = 0
 unicorn.setCollider("rectangle",0,0,400,400)
 console.log("hii")
}

/*if(keyDown("DOWN_ARROW")||touches.length>0){
   unicorn.y = unicorn.y+30
   unicorn.addImage(unicornDug)
   unicorn.scale = 0.2
   console.log("down")
  }
 // unicorn.velocityY = unicorn.velocityY - 0.8
  if(unicorn.y<290){
 // unicorn.addImage(unicornImage)
  //unicorn.scale = 0.2;
//  unicorn.velocityY = 0
  unicorn.setCollider("rectangle",0,0,400,400)
  console.log("down2")

  }*/
   if(unicorn.isTouching(enemyGroup)){
    heart = heart-1;
   }

   if(food.isTouching(unicorn)){
    food.destroyEach();
    score = score + 1;
  }
    // calling the function to spawn mud and clouds
enemy();
spawnClouds();
spawnDonut();
   unicorn.collide(ground);

 
   textSize(20)
   text("Score:" + score,800,380)
  drawSprites();

  if(gameState === "lost"){

    textSize(50)
    fill("red")
    text("You Lost ",300,50)
    unicorn.addImage(lose)
    unicorn.scale=0.3
    unicorn.x=400;
    unicorn.y = 200;
    unicorn.velocityY = 0
    unicorn.debug = false;
    ground.visible = false;
    life1.destroy();
    life2.destroy();
    life3.destroy();
    enemyGroup.destroyEach()
    cloudGroup.destroyEach()
  }
  else if(gameState === "won"){
 
    textSize(100)
    fill("yellow")
    text("You Won ",400,400)
    unicorn.addImage(wonImg)
  }
}

// creating function

function enemy(){
   if (frameCount%150 === 0){

    mud = createSprite(1000,360,40,40)
    mud.addImage(mudImg)
    mud.scale = 0.2;
    mud.velocityX = -8
    mud.debug= true
    mud.setCollider("rectangle",0,0,400,400)
   
    mud.lifetime = 400
     
    console.log("enemy")
    enemyGroup.add(mud)
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1:mud.addImage(mudImg);
              break;
      case 2:mud.addImage(mud2);
             mud.scale = 0.3
             mud.setCollider("rectangle",0,0,350,350)
              break;
      default: break;
    }
   }
}

function spawnDonut(){
  if(frameCount%350 === 0){
  
    var donut = createSprite(350,450,10,10)
     donut.addImage(donutImg)
     donut.scale =0.1;
     donut.velocityX=-3
     donut.debug= true
     donut.setCollider("rectangle",0,0,500,500)
     food.add(donut)
  }
 
}

function spawnClouds(){
  if(frameCount%50 === 0){

  cloud = createSprite(random(1000,1150),random(100,150),50,50)
  cloud.addImage(cloudImg)
  cloud.scale =0.2;
  cloud.velocityX = -4
  cloud.lifetime = 450
  cloudGroup.add(cloud)

  
 }
}
