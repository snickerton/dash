/*var ready = false;
var eurecaServer;
//this function will handle client communication with the server
var eurecaClientSetup = function() {
    //create an instance of eureca.io client
    var eurecaClient = new Eureca.Client();
    
    eurecaClient.ready(function (proxy) {        
        eurecaServer = proxy;
        
        
        //we temporary put create function here so we make sure to launch the game once the client is ready
        create();
        ready = true;
    });    
}*/




var canvas, ctx, cWidth, cHeight;



window.onload=function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	cWidth = canvas.width;
	cHeight = canvas.height;

	canvas.oncontextmenu = function (e) {
		e.preventDefault();
	};



	//showLS();
	game();

};






function showLS(){
	var i = 0;
	setInterval(function(){
		ctx.font = "30px Arial";
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,cWidth, cHeight);
		ctx.fillStyle = "#FFF";
		ctx.fillText("Loading.",cWidth/2 - ctx.measureText("Loading.").width/2,cHeight/2);
		
	}, 1000);
}

function game(){
	
	//bSpd = bullet speed
	var spd, player, FPS, mouseX, mouseY, goalX, goalY, bullets, bSpd;
	
	bullets = [];

	bSpd = 6;

	FPS = 60;
	
	player = new Object();
	player.x = 5;
	player.y = 5;
	//pps = pixels per second
	player.xVel = 0;
	player.yVel = 0;

function Bullet(destX, destY){
	this.x = player.x;
	this.y = player.y;

	this.xVel = getVector(bSpd).x;
	this.yVel = getVector(bSpd).y;
}


	spd = 2;
	
	


	function getMousePos(canvas, e) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	}

	canvas.addEventListener('mousemove', function(e) {
		var mousePos = getMousePos(canvas, e);
		mouseX = mousePos.x; 
		mouseY = mousePos.y;

	}, false);
	
	canvas.addEventListener("mousedown", click, false);



	document.body.addEventListener('keydown', function(e) {
			//Q
			if(e.keyCode == 81){
				player.x += getVector(30).x;
				player.y += getVector(30).y;

				player.xVel = getVector(spd).x;
				player.yVel = getVector(spd).y;
			}
			
			//W
			if(e.keyCode == 87){
				console.log("W pressed");

			}

			//E
			if(e.keyCode == 69){
				console.log("E pressed");

			}

			//S
			if(e.keyCode == 83){
				player.xVel = 0;
				player.yVel = 0;

			}

		});	//end of action listener
	

	setInterval(function(){
		
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,cWidth, cHeight);


		console.log("player position: " +player.x +", "+player.y);

		
		//side collision
		if(player.y > cHeight-10){
			player.y = cHeight-10;
		}
		
		if(player.y < 0){
			player.y = 0;
		}
		
		if(player.x > cWidth-10){
			player.x = cWidth-10;
		}
		if(player.x < 0){
			player.x = 0;
		}
		

		if(player.y < goalY+2 &&
			player.y > goalY-2 && 
			player.x < goalX+2 &&
			player.x > goalX-2){

			player.xVel = 0;
		player.yVel = 0;
	}

	player.x += player.xVel;
	player.y += player.yVel;

	for(i = 0; i<bullets.length; i++){
		console.log("bullets:" +bullets[i].x+", "+ bullets[i].y);
		bullets[i].x += bullets[i].xVel;
		bullets[i].y += bullets[i].yVel;


	}

	drawAll();

	cleanUp();


	

		//console.log("Velocity:"+player.xVel+", "+player.yVel+" Position:"+player.x+", "+player.y);
	}, 1000/FPS);

	function click(e){		
		console.log("click position: " +mouseX +", "+mouseY);

		//RIGHT MOUSE BUTTON
		if(e.button == 2){

			goalX = mouseX;
			goalY = mouseY;
 		//unit vector times the spd results in a vector of length spd
 		player.xVel = getVector(spd).x;
 		player.yVel = getVector(spd).y;
 	}

		//LEFT MOUSE BUTTON
	if(e.button == 0){
		bullets.push(new Bullet(mouseX, mouseY));
 		//unit vector times the spd results in a vector of length spd
 	}

 } //end of click function




//get the vector of the player to mouse
function getVector(spd){

	var dX = mouseX-player.x;
	var dY = mouseY-player.y;

 		//vector length
 		var vL = Math.sqrt((dX*dX)+(dY*dY));

 		return {
 			x: (dX/vL)*spd,
 			y: (dY/vL)*spd
 		};
 	}




 	function drawAll(){
 		for(i = 0; i<bullets.length; i++){
 			ctx.fillStyle = "rgb(200, 0, 0)";
 			ctx.fillRect(bullets[i].x, bullets[i].y, 5, 5);
 		}

 		ctx.fillStyle = "#FFF";
 		ctx.fillRect(player.x, player.y,10, 10);
 	}

 	//deletes all the bullets that are out of the screen
 	function cleanUp(){

 	for(i = 0; i<bullets.length; i++){

 		//splice = delete 1 thing at index position i
 		if(bullets[i].y > cHeight-10){
 			bullets.splice(i, 1);
 			return;
		}
		
		if(bullets[i].y < 0){
			bullets.splice(i, 1);
			return;
		}
		
		if(bullets[i].x > cWidth-10){
			bullets.splice(i, 1);
			return;
		}
		if(bullets[i].x < 0){
			bullets.splice(i, 1);
			return;
		}
	}

 	}


}//end of game()


//};


