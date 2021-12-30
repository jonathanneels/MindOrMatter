var p1Control= -1;//0;
var p2Control=-1;//1;
 
 function mouseController(whoKeys)
{

touchController(whoKeys);

      whoKeys["pointerMesh"] = BABYLON.MeshBuilder.CreatePlane('pointerMesh', {width: 1.5, height: 1.5}, scene);//REF:https://www.babylonjs-playground.com/#UES9PH#0%20&%20https://www.babylonjs-playground.com/#F7ZZJF#2
    var mat = new BABYLON.StandardMaterial('', scene);
mat.diffuseTexture = new BABYLON.Texture("static/assets/textures_main/pointerP1.png", scene);
mat.diffuseTexture.hasAlpha = true;
mat.useAlphaFromDiffuseTexture = false; 
  mat.backFaceCulling = false;
     mat.emissiveColor = new BABYLON.Color3(1,1,1); 
     whoKeys["pointerMesh"].material = mat;
     whoKeys["pointerMesh"].rotation.x = Math.PI/2;
													   whoKeys["pointerMesh"].visibility=0.0;


var blockholdMouse;
 var isAllowedClickAction=true;
 scene.onPointerDown = (e, pickResult) => {
 
 if(whoKeys["controlID"] != 0){return;}

 if(!isAllowedClickAction){return;} 
 else { isAllowedClickAction=false; setTimeout(() => {isAllowedClickAction=true;},  100); }
 	 if (pickResult.hit){// && (pickResult.pickedMesh.id == "planeBackground" || pickResult.pickedMesh.id == "ground" )) {

		clearTimeout(whoKeys.dashTimeout);

                               if (e.button === 0 &&  !whoKeys.isStunned) { //left
																	  	  
	

 if(gameSettings.isAbsolute2D && whoKeys["canBlockHold"] && !gameSettings.isHoldMouseToMove){
delete whoKeys["tmpCrouchY"];delete whoKeys["canBlockHold"];
									 whoKeys.left=0;
									  	 whoKeys.right=0; 
										    whoKeys.front=0;
										  whoKeys.back=0;
										  mouseClickLoc= undefined;

										  } 
										  
mouseClickLoc = pickResult.pickedPoint;

 									if(!whoKeys.isDown &&gameSettings.isAbsolute2D && (((pickResult.pickedMesh.id.indexOf("p"+whoKeys.who+"MainVisual") >-1) ||
								 	pickResult.pickedMesh.id == whoKeys.mainMesh.id ||pickResult.pickedMesh.id == whoKeys.attackMesh.id
 									||pickResult.pickedMesh.id == whoKeys.shieldMesh.id||pickResult.pickedMesh.id == whoKeys.mainUpperMesh.id )
									&&   !whoKeys["tmpCrouchY"]))
									{
									 mouseClickLoc.z=0; 
 
 									 whoKeys.left=0;
									  	 whoKeys.right=0;
									  	 whoKeys.front=0;
										  whoKeys.back=1;
									   //	  whoKeys.movementhistory.push("B");
										 whoKeys["canBlockHold"]=true;
										 whoKeys["tmpCrouchY"] = whoKeys.mainUpperMesh.position.y;
										 whoKeys.mainUpperMesh.position.y  -=2.55; 
 
									
									}
							 	 /*	else if(gameSettings.isAbsolute2D && (((pickResult.pickedMesh.id.indexOf("p"+whoKeys.who+"MainVisual") >-1) ||
								 	pickResult.pickedMesh.id == whoKeys.mainMesh.id ||pickResult.pickedMesh.id == whoKeys.attackMesh.id
 									||pickResult.pickedMesh.id == whoKeys.shieldMesh.id||pickResult.pickedMesh.id == whoKeys.mainUpperMesh.id )
									&&   !whoKeys["tmpCrouchY"]))
									{
									 mouseClickLoc.z=0; 
 
 									 whoKeys.left=0;
									  	 whoKeys.right=0;
									  	 whoKeys.front=0;
										  whoKeys.back=1;
									  	  whoKeys.movementhistory.push("B");
 										 whoKeys["tmpCrouchY"] = whoKeys.mainUpperMesh.position.y;
										 whoKeys.mainUpperMesh.position.y  -=2.55; 
 
									
									}*/
									else
									{ 
if(!gameSettings.isAbsolute2D){
									   mouseClickLoc.z += 2.5+ mouseClickLoc.z;// fixed camera calibration (arcrotation)
 }
 else{
 mouseClickLoc.z=0;
 
 }
									 whoKeys["pointerMesh"].position =   (mouseClickLoc);
												   whoKeys["pointerMesh"].visibility=1.0;



									 mouseClickLoc.attempts=0;
									 lclickCount+=1;
									 if(lclickCount ==1){
										 if(whoKeys["tmpDblJumpAllowed"])
										 {
											 whoKeys.jump=1;   setTimeout(function(){ whoKeys.jump=0;  }, 10);
										 }
									 setTimeout(() => { 
    lclickCount=0; 
  }, 300);} else if(lclickCount ==2){whoKeys.jump=1;lclickCount=0;  setTimeout(function(){ whoKeys.jump=0;  }, 10);}}

								

								 }
 										    if (e.button === 1) { //center mouse

										if(cclickCount<1 )  
										{ 
										whoKeys.rangehit=1;
											cclickCount=1;
											whoKeys.kick=0;
											 	whoKeys.unique=0;

											  // whoKeys.movementhistory.push("U"); 
											   setTimeout(function(){ cclickCount=0;  }, 800);
										} 
								 else  if(cclickCount ==1 ) // range action (only for mobile/mouse
											{  
											
												 whoKeys.kick=1;	//  whoKeys.movementhistory.push("K");  
												 cclickCount=0;
						 		 
											
 											}



										 }
										 
                                    if (e.button === 2) { //right
									 if(rclickCount ==0 )  
{
									//	rclickCount=1; => set to 1 if unique also occurs on right mouse (better not though!)
										whoKeys.unique=1;
						 		 setTimeout(() => {rclickCount=0; },  300); } 
								 else  if(rclickCount >0 ) // range action (only for mobile/mouse
											{
											whoKeys.rangehit=1;
											rclickCount=0;
											whoKeys.unique=0;
											   whoKeys.movementhistory.push("U");
			   	whoKeys.horizontalhit=0;
					whoKeys.verticalhit=0;

 											}
 
  
                                    }
                                }}
				
var mouseNotisHoldMouseToMoveTimeout;				
 scene.onPointerUp = (e, pickResult) => {
 
  if(whoKeys["controlID"] != 0){return;}

   if (e.button === 1) { //center mouse
									  whoKeys.kick=0;
		clearTimeout(whoKeys.actionTimeout); 	whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 1000);

										 }
                                    if (e.button === 2) { //right

 									  whoKeys.unique=0;
									  if(gameSettings.isHoldMouseToMove)
   {
   if(typeof whoKeys["canBlockHold"]){delete whoKeys["tmpCrouchY"];delete whoKeys["canBlockHold"];
									 whoKeys.left=0;
									  	 whoKeys.right=0; 
										    whoKeys.front=0;
										  whoKeys.back=0;
										  mouseClickLoc= undefined;
}}
		clearTimeout(whoKeys.actionTimeout); 	whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 1000);

                                        } 
   if (e.button === 0 &&  !whoKeys.isStunned) { //left

   if(gameSettings.isHoldMouseToMove)
   {
   if(typeof whoKeys["canBlockHold"]){delete whoKeys["tmpCrouchY"];delete whoKeys["canBlockHold"];
									 whoKeys.left=0;
									  	 whoKeys.right=0; 
										    whoKeys.front=0;
										  whoKeys.back=0;
										  mouseClickLoc= undefined;
   }} else if(!gameSettings.isHoldMouseToMove){
   clearTimeout(mouseNotisHoldMouseToMoveTimeout);
								mouseNotisHoldMouseToMoveTimeout=		  	 setTimeout(() => {
											 delete whoKeys["tmpCrouchY"];delete whoKeys["canBlockHold"];
									 whoKeys.left=0;
									  	 whoKeys.right=0; 
										    whoKeys.front=0;
										  whoKeys.back=0;
										  mouseClickLoc= undefined; 
											 },  800); // need to fix this so that click to position gets completed. (now it makes a big step).
											 }
   
   												   whoKeys["pointerMesh"].visibility=0.0;


                                        } 
										
										

      
 }
 
 var isAllowedScrollAction=true;
    scene.onPrePointerObservable.add( function(pointerInfo, eventState) { //REF: https://playground.babylonjs.com/#6FHKHC#9
      
	   if(whoKeys["controlID"] != 0){return;}

	  // console.log(pointerInfo);
        var event = pointerInfo.event;
        var delta = 0;
        if (event.wheelDelta) {
            delta = event.wheelDelta;
        }
        else if (event.detail) {
            delta = -event.detail;
        }
        if (delta) {
             
if (delta== 0)
               {
			   	whoKeys.horizontalhit=0;
					whoKeys.verticalhit=0;
			   }
            if (delta>0 && isAllowedScrollAction)
               {
			   							   	   
			    						whoKeys.verticalhit=1;
			 	isAllowedScrollAction=false;setTimeout(function(){ isAllowedScrollAction=true; }, 300);

		clearTimeout(whoKeys.actionTimeout); 	whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 1000);


			   }
            else if ( isAllowedScrollAction)
			
			{
												  	 
			whoKeys.horizontalhit=1;
			isAllowedScrollAction=false;setTimeout(function(){ isAllowedScrollAction=true;  }, 300);
			
					clearTimeout(whoKeys.actionTimeout); 	whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 1000);

			}
             
        }
    }, BABYLON.PointerEventTypes.POINTERWHEEL, false);


}

function gamePadController(whoKeys)
{

var gamepadManager = new BABYLON.GamepadManager();
gamepadManager.onGamepadConnectedObservable.add((gamepad, state)=>{//REF: https://doc.babylonjs.com/divingDeeper/input/gamepads
 
       gamepad.onButtonUpObservable.add((button, state)=>{
		   
		    if(whoKeys["controlID"] != 2){return;}

						   if(((gamepad.index ==1 && whoKeys.who ==1 )||( p1Control != 2)) || ((gamepad.index ==0 && whoKeys.who ==0 )||( p2Control != 2)) ){//REF/ https://www.html5gamedevs.com/topic/9545-how-to-use-the-gamepad/
	   
				   if(button ==8&& !whoKeys["selectButtonReleased"])// select (movelist) => after multiple controller switch issues could arise (open/close auto).
	{
		whoKeys["selectButtonReleased"]=true;
 		 moveList(whoKeys);  
				setTimeout(function(){ delete whoKeys["selectButtonReleased"];}, 100);

	}
	
						   if(button ==9 && !whoKeys["startButtonReleased"])//  start
	{
		whoKeys["startButtonReleased"]=true;
 		showOptions();
		setTimeout(function(){ delete whoKeys["startButtonReleased"];}, 100);
	}
	   if(button ==0)
	{
			whoKeys.jump=0;
	}
		if(button ==1)
	{
			whoKeys.rangehit=0;		 

	 	clearTimeout(whoKeys.actionTimeout); 	whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 1000);
	}
		if(button ==2)
	{
	
	whoKeys.verticalhit=0;		 
	 	clearTimeout(whoKeys.actionTimeout); 	whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 1000);

 
	}
		if(button ==3)
	{
	
whoKeys.horizontalhit=0;		 
	 	clearTimeout(whoKeys.actionTimeout); 	whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 1000);

 
	}
			if(button ==5)
	{
		whoKeys.unique=0;		 

 	 	clearTimeout(whoKeys.actionTimeout); 	whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 1000);

	}
				if(button ==4)
	{
		whoKeys.kick=0; 		 
	 	clearTimeout(whoKeys.actionTimeout); 	whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 1000);

 	}
	
	
	 }
	   });


 gamepad.onButtonDownObservable.add((button, state)=>{
	
	
			    if(whoKeys["controlID"] != 2){return;}

				   if(((gamepad.index ==1 && whoKeys.who ==1 )||( p1Control != 2)) || ((gamepad.index ==0 && whoKeys.who ==0 )||( p2Control != 2)) ){
					   
					   if(button ==8)// select (movelist)
	{

		
	}
	
						   if(button ==9)//  start
	{

	}

	if(button ==0)
	{
		  if(whoKeys.character.isCanJump){  	whoKeys.jump=1;}
	}
		if(button ==1)
	{
			whoKeys.rangehit=1;
	}
		if(button ==2)
	{
	
	whoKeys.verticalhit=1;

	}
		if(button ==3)
	{
	
whoKeys.horizontalhit=1;

	}
			if(button ==5)
	{
		whoKeys.unique=1;

	}
				if(button ==4)
	{
		whoKeys.kick=1;
	}
	
					if(button ==10) // dash like keyboard seems not always as easy (double direct).
	{
//whoKeys.movementhistory.push("-");	clearTimeout(whoKeys.dashTimeout); whoKeys.dashTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 150);
	}

        //Button has been pressed
     //   console.log(button)
	 
	 }
    });
    gamepad.onleftstickchanged((values)=>{
		
				    if(whoKeys["controlID"] != 2 ||  whoKeys.isStunned){return;}

				   if(((gamepad.index ==1 && whoKeys.who ==1 )||( p1Control != 2)) || ((gamepad.index ==0 && whoKeys.who ==0 )||( p2Control != 2)) ){

        //Left stick has been moved
      //  console.log(values.x+" "+values.y);
		
		 if(parseFloat(values.y) <-0.2)
		{		 

				if(whoKeys.character.isCanGoVertical){
whoKeys.front=1;
 				whoKeys.back=0;
 }
 		}
		   if(parseFloat(values.y) >0.2)
		{
		if(whoKeys.character.isCanGoVertical){
		whoKeys.back=1;
 				whoKeys.front=0;
				
				if(gameSettings.isAbsolute2D){// quick stitch for crouching non-block with current setup.
						whoKeys.left=0; 
 		whoKeys.right=0; }

			}
		}	
		 
		 
		
		if(parseFloat(values.x) <-0.2)
		{				if(whoKeys.character.isCanGoHorizontal){

		whoKeys.left=1;
		
 		whoKeys.right=0; 
 }
 		}
		   if(parseFloat(values.x) >0.2)
		{
		if(whoKeys.character.isCanGoHorizontal){
		whoKeys.right=1;
 
 				whoKeys.left=0; 
 }
		}
				if(parseFloat(values.x) >=-0.2 && parseFloat(values.x) <= 0.2 && parseFloat(values.y) >=-0.2 && parseFloat(values.y) <= 0.2)

		{		 
		clearTimeout(whoKeys.dashTimeout);

				whoKeys.left=0;
		whoKeys.right=0;
				whoKeys.back=0;
				whoKeys.front=0;
				
				if(whoKeys.kick ==0 && whoKeys.rangehit == 0 && whoKeys.verticalhit == 0 && !whoKeys.isStunned &&  whoKeys.horizontalhit == 0 && !whoKeys.iskickactive && !whoKeys.ishorizontalhitactive && !whoKeys.isverticalhitactive){
								// seems to be the correct speed/interval with 
 		 	if(whoKeys.movementhistory.length >0 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] !="-"&& whoKeys.movementhistory[whoKeys.movementhistory.length-1] !="-"){ whoKeys.movementhistory.push("-");}
			//else 	if(whoKeys.movementhistory.length ==0) { whoKeys.movementhistory.push("-");}
}
		}
		}
    });

});
gamepadManager.onGamepadDisconnectedObservable.add((gamepad, state)=>{

});

}


function keyBoardController(whoKeys)
{

        // Gestion du clavier quand on presse une touche
        var onKeyDown = function(event) 
        {    
				    if(whoKeys["controlID"] != 1){return;}

		clearTimeout(whoKeys.dashTimeout);
		
            var touche = event.keyCode;
            var ch = String.fromCharCode(touche);
            switch (touche) {
				case 27:
				 showOptions();
				break; 
				case 8:
				moveList(whoKeys);
				break;
                case 16: // MAJ Le perso cours
                    whoKeys.run = 1;
                break;
                case 32: // ESPACE le perso saute			
         if(whoKeys.character.isCanJump){       whoKeys.jump=1;}
                break;
            }		
            
            // Clavier AZERTY
         	if(whoKeys.character.isCanGoVertical && !whoKeys.isStunned){   if (ch == "Z") {whoKeys.front=1;}}// up here!
          	if(whoKeys.character.isCanGoHorizontal && !whoKeys.isStunned){  if (ch == "Q") {whoKeys.left=1;	 }}
           if(whoKeys.character.isCanGoVertical && !whoKeys.isStunned){ if (ch == "S"){ whoKeys.back=1;}}// down here if press 1x!
          	if(whoKeys.character.isCanGoHorizontal && !whoKeys.isStunned){  if (ch == "D") {whoKeys.right=1; }}
			
		    if (ch == "J"){ whoKeys.verticalhit=1;}
            if (ch == "K"){ whoKeys.horizontalhit=1;}
            if (ch == "L"){ whoKeys.kick=1;}
            if (ch == "M"){ whoKeys.unique=1;}
            if (ch == "H"){ whoKeys.rangehit=1;}

        }

        // Gestion du clavier quand on relache une touche
        var onKeyUp = function(event)
        {    
						    if(whoKeys["controlID"] != 1){return;}

		clearTimeout(whoKeys.dashTimeout);
		
            var touche = event.keyCode;
            var ch = String.fromCharCode(touche);
            switch (touche) {
                case 16: // MAJ  
                    whoKeys.run = 0;
                break;
                case 32: // ESPACE l 
                    whoKeys.jump=0;			 
                break;
				default:
				                    whoKeys.run = 0;
				break;
            }	
            
             if (ch == "Z") {whoKeys.front=0; whoKeys.movementhistory.push("-"); clearTimeout(whoKeys.dashTimeout); whoKeys.dashTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 150);}// prevent dash after idle
            if (ch == "Q") {whoKeys.left=0;	 whoKeys.movementhistory.push("-");clearTimeout(whoKeys.dashTimeout);whoKeys.dashTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 150);} 
            if (ch == "S") {whoKeys.back=0; whoKeys.movementhistory.push("-");clearTimeout(whoKeys.dashTimeout);whoKeys.dashTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 150);}  // down here if press 1x!
            if (ch == "D"){ whoKeys.right=0; whoKeys.movementhistory.push("-");clearTimeout(whoKeys.dashTimeout);whoKeys.dashTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 150);} 
			
			  if (ch == "J"){ whoKeys.verticalhit=0; clearTimeout(whoKeys.actionTimeout); whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 250);}
            if (ch == "K"){ whoKeys.horizontalhit=0;clearTimeout(whoKeys.actionTimeout); whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 250);}
            if (ch == "L"){ whoKeys.kick=0;clearTimeout(whoKeys.actionTimeout); whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 250);}
            if (ch == "M"){ whoKeys.unique=0;clearTimeout(whoKeys.actionTimeout); whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 250);}
            if (ch == "H"){ whoKeys.rangehit=0; clearTimeout(whoKeys.actionTimeout); whoKeys.actionTimeout=setTimeout(function(){ whoKeys.movementhistory.push(" ");}, 250);}

            
         }

        // canvas.addEventListener("resize", function () { engine.resize();});	
        canvas.addEventListener("keydown", onKeyDown, false);
        canvas.addEventListener("keyup", onKeyUp, false);

}


var kickTimeout;
var uniqueTimeout;
 var verticalTimeout;
var horizontalTimeout;
var rangeTimeout;

var kickStartTimeout;
var uniqueStartTimeout;
 var verticalStartTimeout;
var horizontalStartTimeout;
var rangeStartTimeout;

function touchController(whoKeys)
{

 $('#btnKick').on('mousedown touchstart', function(e) {//REF:https://codepen.io/webomnizz/pen/MYYaed
 
 				    if(whoKeys["controlID"] != 0){return;}

   clearTimeout(kickStartTimeout);
kickStartTimeout=setTimeout(function(){  whoKeys.kick=1;}, 50);

  }).bind('mouseup mouseleave touchend', function() {
	  
	   				    if(whoKeys["controlID"] != 0){return;}

clearTimeout(kickTimeout);
kickTimeout=setTimeout(function(){ whoKeys.kick=0; }, 100);

  });
  
   $('#btnUnique').on('mousedown touchstart', function(e) {
 
  				    if(whoKeys["controlID"] != 0){return;}

  clearTimeout(uniqueStartTimeout);
uniqueStartTimeout=setTimeout(function(){  whoKeys.unique=1;}, 50);

  }).bind('mouseup mouseleave touchend', function() {
	  
	   				    if(whoKeys["controlID"] != 0){return;}


clearTimeout(uniqueTimeout);
uniqueTimeout=setTimeout(function(){ whoKeys.unique=0;}, 100);

  });
  
     $('#btnVertical').on('mousedown touchstart', function(e) {
		 
		  				    if(whoKeys["controlID"] != 0){return;} 
 
 clearTimeout(verticalStartTimeout);
verticalStartTimeout=setTimeout(function(){  whoKeys.verticalhit=1;}, 50);

  }).bind('mouseup mouseleave touchend', function() {
	  
	   				    if(whoKeys["controlID"] != 0){return;}

clearTimeout(verticalTimeout);
verticalTimeout=setTimeout(function(){  whoKeys.verticalhit=0;}, 100);

  });
       $('#btnHorizontal').on('mousedown touchstart', function(e) {
 
  				    if(whoKeys["controlID"] != 0){return;}

clearTimeout(horizontalStartTimeout);
horizontalStartTimeout=setTimeout(function(){  whoKeys.horizontalhit=1;}, 50);

  }).bind('mouseup mouseleave touchend', function() {
	  
	   				    if(whoKeys["controlID"] != 0){return;}

clearTimeout(horizontalTimeout);
horizontalTimeout=setTimeout(function(){  whoKeys.horizontalhit=0;}, 100);

  });
         $('#btnRange').on('mousedown touchstart', function(e) {
   				    if(whoKeys["controlID"] != 0){return;}

 clearTimeout(rangeStartTimeout);
rangeStartTimeout=setTimeout(function(){  whoKeys.rangehit=1;}, 50);

  }).bind('mouseup mouseleave touchend', function() {
	  
	   				    if(whoKeys["controlID"] != 0){return;}

clearTimeout(rangeTimeout);
rangeTimeout=setTimeout(function(){ whoKeys.rangehit=0;}, 100);

  });


}

function setControl(controlId, whoKeys)
{
	var id=parseInt(controlId);
	whoKeys["controlID"]= id;
	
switch(id) {
//default:
  case 0:
  mouseController(whoKeys)
		break; 
    break;
  case 1:
        keyBoardController(whoKeys) 
		break;

    break;
  case 2:
   gamePadController(whoKeys);
	break;
}

}