var dog,dog_Img,dog_Img1;
var database;
var foods,foodStock;
var position;
var feed,add;
var foodobject;
var feedTime;
var lastFed;

function preload(){
   dog_Img=loadImage("images/dogImg.png");
   dog_Img1=loadImage("images/dogImg1.png");
  }

function setup() {
  createCanvas(600,700);
  database=firebase.database();

foodobject=new Food();
  dog=createSprite(300,300,150,150);
  dog.addImage("dog",dog_Img1);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

var dogFood=database.ref('Food');
dogFood.on("value", readPosition, showError);

  feedTime = database.ref('FeedTime');
  feedTime.on("value", function(data){
    lastFed=data.val();
  })

  

feed = createButton("FEED DRAGO");
feed.position(500,15);
feed.mousePressed(FeedDog);

add = createButton("ADD FOOD");
add.position(400,15);
add.mousePressed(AddFood);

}

function draw() {
  background(46,139,87);
 foodobject.display();
 
  

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foods,50,100);
  textSize(13);
  
if(lastFed>=12){
text("Last Feed: "+lastFed %12+"PM",350,30);

}else if(lastFed===0){
  text("Last Feed: 12 AM",350,30);

}else {
  text("Last Feed: "+lastFed %12+"AM",350,30);
}

}

function readStock(data){
  
  foods=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
  
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  console.log(position.x);
  
}

function showError(){
  console.log("Error in writing to the database");
}

function AddFood(){
  foods++;
  database.ref('/').update({
    Food:foods
  }
  
  )
  }
  function FeedDog(){
  
  dog.addImage("dog",dog_Img1);
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
   database.ref('/').update({
     Food:foodobject.getFoodStock(),
     FeedTime:hour ()
   })
  }


  