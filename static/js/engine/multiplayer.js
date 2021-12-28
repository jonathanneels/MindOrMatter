 	function packageContent(id, isGameOverAsInt, posX,posY,posZ,pHealth,pEnergy,pSpecial,whoCharIndex,stageIndex, rounds,p1score,p2score,lastMoveEntries,is2dAsInt,isWithWallsAsInt,isKneelBlockAsInt,playerControllerId,charColorIndex,stageColorIndex, timer)//, isJumpingAsInt) //AsInt = 0 => false, 1 => true
	{
		var pack=id.toString()+","+isGameOverAsInt.toString()
		+","+posX.toString()+","+posY.toString()+","+posZ.toString()+","+pHealth.toString()+","+pEnergy.toString()+","+pSpecial.toString()+","+whoCharIndex.toString()+","+stageIndex.toString()
	+	","+rounds.toString()+","+p1score.toString()+","+p2score.toString()+","+lastMoveEntries.toString()+","+is2dAsInt.toString()+","+isWithWallsAsInt.toString() +","+isKneelBlockAsInt.toString()
	+","+playerControllerId.toString()		+","+charColorIndex.toString()  +","+stageColorIndex.toString() +","+timer.toString()	//+","+isJumpingAsInt.toString();
		
		return pack;
		
	}

 // Initialize WebSocket connection and event handlers
    function startConnection(gameSettings, whoKeys) {  

        ws = new WebSocket( gameSettings.ws);// new WebSocket("ws://192.168.1.40:11112");

        // Listen for the connection open event then call the sendMessage function          
        ws.onopen = function (e) {      
            log("Connected");      
            sendMessage(gameSettings.myGameId);
			
						delete whoKeys.hostileKey["isHostileCharacterSet"];
			delete whoKeys.hostileKey["iStageSet"];
	delete document["arcadeStageIncrease"];
		delete document["survivalStageIncrease"];
 
 		 endgameTimer=parseInt(gameSettings.matchTimer);
delete document["allowCountDownTimer"];
        }

        // Listen for the close connection event
        ws.onclose = function (e) {      
            console.log("Disconnected: " + e.reason);  
			delete whoKeys.hostileKey["isHostileCharacterSet"];
			delete whoKeys.hostileKey["iStageSet"];
	startProject(true);
	setTimeout(function() {	alert("game ended, back to the menu.");}, 100);

        }

        // Listen for connection errors
        ws.onerror = function (e) {      
            log("Error ");  
			ws.close();
        }

        // Listen for new messages arriving at the client
        ws.onmessage = function (e) {      
          //  log("Message received: " + e.data);
			
			if(e.data.indexOf('waiting') >= 0 || typeof e.data == "undefined")
	{
		wait(5000);
		 endgameTimer=parseInt(gameSettings.matchTimer);
		}
		else
		{
			
			  var feedbackList= e.data.split(','); 

		gameSettings.isEndgame=	(feedbackList[1] === 'true') ;
			
		 

			   whoKeys.hostileKey.mainMesh.position.x=parseFloat(feedbackList[2]);
			   			  whoKeys.hostileKey.mainMesh.position.y=parseFloat(feedbackList[3]);
			   whoKeys.hostileKey.mainMesh.position.z=parseFloat(feedbackList[4]);
			  
			  
//whoKeys.hostileKey.movementhistory.push(feedbackList[17]);
if(!gameSettings.isEndgame){
	
			 			document["allowCountDownTimer"]=true;

	gameSettings.isEndgame=intToBoolConverter(feedbackList[1]);
	
			  if(gameSettings.gameMode ==5){//host
 					
											 gameSettings. p2score=parseInt( feedbackList[12]);
					}
					else if(gameSettings.gameMode ==6){
											 gameSettings. p1score= parseInt(feedbackList[11]);

					}

}	  


gameSettings.isEndgameWithWalls=intToBoolConverter(feedbackList[15]);
gameSettings.isAbsolute2D=intToBoolConverter(feedbackList[14]);

 
whoKeys.hostileKey.character.health= parseFloat(feedbackList[5]);
whoKeys.hostileKey.character.energy= parseFloat(feedbackList[6]);
whoKeys.hostileKey.character.special= parseFloat(feedbackList[7]);
           
 if(typeof whoKeys.hostileKey["isHostileCharacterSet"] == "undefined" && !whoKeys.hostileKey["isHostileCharacterSet"] && parseInt(feedbackList[8]) >-1){ 
whoKeys.hostileKey["isHostileCharacterSet"]=true;
   alterCharacter(whoKeys.hostileKey,document["characterList"][parseInt(feedbackList[8])]);
  
  if(typeof whoKeys.hostileKey.character.colorPalettes != "undefined" && whoKeys.hostileKey.character.colorPalettes.length >0){
  for (var k = 0; k < scene.meshes.length; k++) { 
  		if( scene.meshes[k].name.startsWith("p"+whoKeys.hostileKey.who.toString()+"MainVisual")){
 delete whoKeys.hostileKey["colorIndex"] ;   
    scene.meshes[k].material.emissiveColor =  BABYLON.Color3.FromHexString(whoKeys.hostileKey.character.colorPalettes[0]);
 break;}
 }
  }
  for (let i = 0; i < parseInt(feedbackList[18]); i++) {
	  if(typeof whoKeys.hostileKey != "undefined"){
  setEmissiveColorMainMesh(whoKeys.hostileKey); 
  }
 
}
 
} 
if((typeof whoKeys.hostileKey["iStageSet"] == "undefined" && !whoKeys.hostileKey["iStageSet"] ) && whoKeys.who != 0 && parseInt(feedbackList[9]) >-1){ // HOST decides level
whoKeys.hostileKey["iStageSet"]=true;
  alterStage(document["stageList"][parseInt(feedbackList[9])]);
 
 delete document["colorIndex"] ;    
    scene.getMeshByName('planeBackground').material.emissiveColor = BABYLON.Color3.FromHexString(gameSettings.stage.colorPalettes[0]); 

 for (let i = 0; i < parseInt(feedbackList[19]); i++) {
  setEmissiveColorBackground(scene.getMeshByName('planeBackground')); 
 
} 
endgameTimer = parseInt(feedbackList[20]);
gameSettings.matchTimer  = parseInt(feedbackList[20]);
gameSettings.rounds = parseInt(feedbackList[10]);
 }


//if(parseFloat(feedbackList[17])>0){
//whoKeys.hostileKey["tmpJump"]=true;
//whoKeys.hostileKey.character.hangtime=0;//parseFloat(feedbackList[18]);
 //whoKeys.hostileKey.isjumping=false;
  //} //else{delete whoKeys.hostileKey["tmpJump"];}
 //whoKeys.hostileKey.isPacified=intToBoolConverter(feedbackList[3]);;

if(typeof feedbackList[13] != "undefined"){
			  
			  var feedList= feedbackList[13].split(';');
			  
 //whoKeys.hostileKey.movementhistory=feedList; 
  //actionsHandler(whoKeys.hostileKey); 
 whoKeys.hostileKey.front=parseInt(feedList[0]);
 whoKeys.hostileKey.back=parseInt(feedList[1]);
 whoKeys.hostileKey.left=parseInt(feedList[2]);
 whoKeys.hostileKey.right=parseInt(feedList[3]);
 whoKeys.hostileKey.jump=parseInt(feedList[4]);
 whoKeys.hostileKey.verticalhit=parseInt(feedList[5]);
 whoKeys.hostileKey.horizontalhit=parseInt(feedList[6]);
 whoKeys.hostileKey.rangehit=parseInt(feedList[7]);
 whoKeys.hostileKey.unique=parseInt(feedList[8]);
 whoKeys.hostileKey.kick=parseInt(feedList[9]);
 actionsHandler(whoKeys.hostileKey);
 //console.log(feedbackList[13]);

}

if(parseInt(feedbackList[17]) == 0){//mouse controller
//console.log(parseInt(feedbackList[16]))
 
 if(gameSettings.isAbsolute2D &&(parseInt(feedbackList[16]) ==1 && whoKeys.hostileKey.back==1))
 {
 
	 whoKeys.hostileKey["canBlockHold"]=true;
	 			//						 	 whoKeys.hostileKey["tmpCrouchY"] = whoKeys.mainUpperMesh.position.y; 
 } 
 else if(gameSettings.isAbsolute2D && (parseInt(feedbackList[16]) ==0)) 
 {
	delete  whoKeys.hostileKey["canBlockHold"];
   }
 
 }


		}
            // Close the socket once one message has arrived.      
           //  ws.close();  
		   
			var lastMoves= [whoKeys.front,whoKeys.back,whoKeys.left,whoKeys.right,whoKeys.jump,whoKeys.verticalhit,whoKeys.horizontalhit,whoKeys.rangehit,whoKeys.unique,whoKeys.kick ].join(';');//""; 
			/*if(typeof whoKeys.movementhistory != "undefined" && whoKeys.movementhistory.length >0)
			{
				lastMoves=extractLastArrayElements(whoKeys.movementhistory,5).toString();
				
			}*/
			var isJumpingNow= false;
			if(whoKeys.character.hangtime>0)
			{
			isJumpingNow=true;	
			}
				var isKneelBlockNowInt= 0;
			if(typeof whoKeys["canBlockHold"] != "undefined" && whoKeys["canBlockHold"]   )
			{
			isKneelBlockNowInt=1;	
			}
			var playerColorId=0;
			var backgroundColorId=0;
 			if(typeof whoKeys["colorIndex"] != "undefined" && whoKeys["colorIndex"] >-1   )
			{
			playerColorId=whoKeys["colorIndex"]+1;	// how the code is setup the +1 is required.
			}
			if(typeof document["colorIndex"] != "undefined" && document["colorIndex"] >-1  )
			{
			backgroundColorId=document["colorIndex"]+1;	// how the code is setup the +1 is required.
			}
			
			 sendMessage(packageContent(gameSettings.myGameId,	 boolToIntConverter(gameSettings.isEndgame), whoKeys.mainMesh.position.x,whoKeys.mainMesh.position.y,whoKeys.mainMesh.position.z,whoKeys.character.health  ,
			whoKeys.character.energy,whoKeys.character.special ,gameSettings["whoCharIndexKeysP"+(whoKeys.who+1).toString()],gameSettings.stageIndex,gameSettings.rounds,gameSettings.p1Score,gameSettings.p2Score, 
			lastMoves,boolToIntConverter(gameSettings.isAbsolute2D),boolToIntConverter(gameSettings.isEndgameWithWalls),isKneelBlockNowInt,whoKeys["controlID"],playerColorId,backgroundColorId,gameSettings.matchTimer));
         }
    }

    // Send a message on the WebSocket.
    function sendMessage(msg) { 
  if($("#btnYes").is(":visible"))   // cheap trick to see end game with low resource funding.
{
	ws.close(); //handling in onclose() function
	delete 		 document["allowCountDownTimer"]; 
 	return;
}

else{	
        ws.send(msg);      
        log("Message sent");  
		}
    }

    // Display logging information in the document.
    function log(s) {  
        console.log(s);
    }
	
