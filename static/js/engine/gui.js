
function startupInterface(isSkipLaunchGame)
{

// note: margin-top:-45px default spanGameStart, altered to margin-top:-15px. Keep an eye on it!
$("#hP1").html('<div id="spanGameStart" style="margin-top:-15px;padding:7px;">'+ //REF: http://pojo.sodhanalibrary.com/string.html
'<label class="singlePlayerSettings modeSelect" for="selMode">MODE:</label>  <select class="singlePlayerSettings modeSelect" name="selMode" id="selMode">'+
'      <option value="0" hidden>Story</option>'+
'    <option value="1" selected>Arcade</option>'+
'	 	    <option value="2">Survival</option>'+
' 	    <option value="3">Single Fight (VS)</option>'+
' 	    <option value="4">Training</option>'+
'  	    <option value="5">Online host</option>'+
'  	    <option value="6">Online join</option>'+
'  	    <option value="7">Tutorial</option>'+
'  	    <option value="8">Unique Mode A</option>'+
''+
'  </select> '+
'   <span style="font-size:medium;float:right;margin-top:15px;" >'+
''+
' 	  <label for="selStage" class="singlePlayerSettings stageSettings" onclick="setEmissiveColorBackground(scene.getMeshByName(\'planeBackground\'))" >  Stage:</label>'+
'  <select class="singlePlayerSettings stageSettings" name="selStage" id="selStage" onchange="alterStage($(\'#selStage\').val());">'+
'    <option value="random" selected>random</option>'+
'  </select>'+
' <span class="singlePlayerSettings">|</span>'+
'    	  <label class="singlePlayerSettings aiSettings" for="txtAiCount">Ai\'s:</label>'+
'  <input class="singlePlayerSettings aiSettings" type="number" min=0 max=2 value="1" id="txtAiCount" name="txtAiCount"> '+
'</span>'+
'<hr class="singlePlayerSettings p1CharSettings">'+
'	  <label for="selP1" class="singlePlayerSettings p1CharSettings" onclick="setEmissiveColorMainMesh(keysP1)">P1:</label>'+
'  <select class="singlePlayerSettings p1CharSettings" name="selP1" id="selP1" onchange="alterCharacter(keysP1,$(this).val());">'+
'    <option value="random" selected>random</option>'+
'  </select>'+
''+
'  <select class="singlePlayerSettings p1CharSettings" name="selControlsP1" id="selControlsP1">'+
'	    <option value="0">Mouse/touch</option>'+
'		    <option value="1" >Keyboard</option>'+
'    <option value="2" selected>Gamepad</option>'+
'  </select>'+
''+
'  <span style="float:right;" class="multiPlayerSettings">'+
''+
'    <select name="selControlsP2" id="selControlsP2">'+
'	    <option value="0">Mouse/touch</option>'+
'		    <option value="1" selected>Keyboard</option>'+
'    <option value="2"  >Gamepad</option>'+
'  </select>'+
'  <select name="selP2" id="selP2" onchange="alterCharacter(keysP2,$(this).val());">'+
'    <option value="random" selected>random</option>'+
'  </select>'+
'   	  <label for="selP2" onclick="setEmissiveColorMainMesh(keysP2)">:P2</label>'+
''+
' </span>'+
''+
'<hr class="singlePlayerSettings extraGameParams">'+
'  <span style="font-size:medium;" >'+
'<span style="  float:left;">'+
'  <label for="ch2D" class="singlePlayerSettings extraGameParams"> 2D</label> '+
'<input class="singlePlayerSettings extraGameParams" type="checkbox" id="ch2D" name="ch2D">'+
'<span class="singlePlayerSettings ">|</span>'+
' <label for="chWalls" class="singlePlayerSettings extraGameParams"> Walls</label> '+
'<input class="singlePlayerSettings extraGameParams" type="checkbox" id="chWalls" name="chWalls" checked>'+
''+
' </span>'+
'  <span style="  float:right;>'+ 
'<label class="singlePlayerSettings difficultySettings" for="txtDificulty" id="lblForDifficulty" >Difficulty:</label>'+
'  <input class="singlePlayerSettings difficultySettings" type="number" min=0 max=55 value="35" id="txtDificulty" name="txtDificulty"> '+
'  '+
'<span class="singlePlayerSettings">|</span>'+
'      	  <label class="singlePlayerSettings roundCount" for="txtRounds">Rounds:</label>'+
'  <input class="singlePlayerSettings roundCount" type="number" min=1 max=5 value="2" id="txtRounds" name="txtRounds"> '+
'<span class="singlePlayerSettings">|</span>'+
'      	  <label  class="singlePlayerSettings timeSettings" for="txtTime">Time:</label>'+
'  <input class="singlePlayerSettings timeSettings" type="number" min=1 max=99999 value="155" id="txtTime" name="txtTime"> '+
' </span> '+
'  </span>'+
'<hr style=" margin-top: 35px;"  class="singlePlayerSettings">   '+
'<span style="display:table;margin:0 auto;"><button type="button" id="btnStartGame">GO</button></span> </div>');


if(isMobile())
{
	
	$("#selControlsP1 option:eq(0)").prop('selected', true); 
}
else
{
	//	$("#selControlsP1 option:eq(1)").prop('selected', true); 
		//	$("#selControlsP2 option:eq(2)").prop('selected', true); 


}
	$("#guide").css("height","200px"); 
$("#guide").scrollTop()
//	 	$("#guide").css("overflow","hidden");
$("#guide").css("overflow","auto");

console.log( gameSettings["whoCharIndexKeysP1"])
 preloadAssetData();
console.log( gameSettings["whoCharIndexKeysP1"])


/// lay-out start //////////////////////////////////
	if(!isSkipLaunchGame){
		gameSettings["whoCharIndexKeysP1"]= getRandomInt(1,5)
		gameSettings["whoCharIndexKeysP2"]= getRandomInt(1,5)
     $("#selP1").prop('selectedIndex',	gameSettings["whoCharIndexKeysP1"]); 
  $('#selP1').trigger('change'); 
    $("#selP2").prop('selectedIndex', 	gameSettings["whoCharIndexKeysP2"]);  
  $('#selP2').trigger('change');
}
else
{
	     $("#selP1").prop('selectedIndex', gameSettings["whoCharIndexKeysP1"]+1); 
     $("#selP2").prop('selectedIndex',  gameSettings["whoCharIndexKeysP2"]+1);  
}
///////////////////////////////////////////////////////////////

$("#divWorldField").show();
$(".multiPlayerSettings").hide();

  	keysP1["controlID"]=-1; 
	 	keysP2["controlID"]=-1; 

var projectLaunched=false;
//canvas.addEventListener('click', function() {if(!projectLaunched){projectLaunched=true; startOfGame();} }, false);

if(window.location.href.includes("?"))
{
feedback = window.location.href.split("?")[1]; 
gameSettings.myGameId =feedback+"_p2";
	$("#selMode option:eq(6)").prop('selected', true);  
	gameSettings.gameMode=6; 
}


btnStartGame.addEventListener('click', function() { 
if(!projectLaunched){


var isObjectAltered=false; // needed to set delay in multiplayer
if($("#selStage")[0].selectedIndex==0 && gameSettings.gameMode !=6) // online join does not need to set other values
{
		  setNewStage();

 isObjectAltered=true;
}
else  
{
gameSettings.stageIndex =$("#selStage")[0].selectedIndex-1;// -1 because 0 = random

}
if($("#selP1")[0].selectedIndex==0 && gameSettings.gameMode !=6)// online join does not need to set other values
{	//  setNewCharacter(keysP1); => disabled, no use? Altered selected Index, see above.

  isObjectAltered=true;

}
else  
{
gameSettings["whoCharIndexKeysP1"] =$("#selP1")[0].selectedIndex-1 ;// -1 because 0 = random

}
if($("#selP2")[0].selectedIndex==0 && gameSettings.gameMode !=5)// online join does not need to set other values
{	//  setNewCharacter(keysP2); => disabled, no use? Altered selected Index, see above.

  isObjectAltered=true;
 
}
else  
{
  gameSettings["whoCharIndexKeysP2"] =$("#selP2")[0].selectedIndex-1 ;// -1 because 0 = random

}

//ONLINE: 
if(gameSettings.gameMode ==5){
//console.log(gameSettings.myGameId.replace("_p1","")); 
if(isObjectAltered){
setTimeout(function(){ startConnection(gameSettings,keysP1);}, 3000);

}
else{ startConnection(gameSettings,keysP1);}

}
else if(gameSettings.gameMode ==6){ 

if(gameSettings.myGameId.indexOf("_p2") <0){
var feedback = prompt("Please enter ROOM id", "????");

if (feedback != null && feedback != "") {
  gameSettings.myGameId =feedback+"_p2"; // id was already set for P1 in preloadAssetData();


console.log(gameSettings.myGameId.replace("_p2","")); 
   if(isObjectAltered){
setTimeout(function(){ startConnection(gameSettings,keysP2);}, 3000);

}
else{   startConnection(gameSettings,keysP2);
}

   
} else {
return;

}
}
else {
	
	
	  if(isObjectAltered){
setTimeout(function(){ startConnection(gameSettings,keysP2);}, 3000);

}
else{   startConnection(gameSettings,keysP2);
}

}


}
/////////

if(gameSettings.gameMode ==5 || gameSettings.gameMode ==6 ){gameSettings.aiCount= 0; $("#txtAiCount").val(0);}
else{gameSettings.aiCount= $("#txtAiCount").val();}


gameSettings.aiInteractionFrequency=55- $("#txtDificulty").val();
gameSettings.matchTimer= $("#txtTime").val();
gameSettings.isEndgameWithWalls=$('#chWalls').is(":checked");
gameSettings.isAbsolute2D=$('#ch2D').is(":checked");

if(gameSettings.gameMode ==2){gameSettings.rounds= 999999;gameSettings.isEndgameWithWalls=false;}
if(gameSettings.gameMode ==4){ gameSettings.matchTimer  =endgameTimer= 999999; gameSettings.rounds= 999999; }
else{ gameSettings.rounds=$("#txtRounds").val();}
 
p1Control=$("#selControlsP1").val();
p2Control=$("#selControlsP2").val();

delete  document["KeepGuideVisible"]; //visual stuff 
delete  document["KeepGuideInfoEmpty"]; 
delete document["demoMode"];

$("#hP1").html('');

projectLaunched=true; 
gameSettings.isEndgame=true;


 restartGame();//startOfGame();

 


 
} 


}, false);
}

function openFullscreen()
{
/* Get the element you want displayed in fullscreen mode (a video in this example): */
var elem = document.getElementById("body");
/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
   if (!document.fullscreenElement) {

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }}
 
}
function startProject(isSkipLaunchGame)
{
	
	if(!isMobile()){$(".btnControl").hide();}

   	$("#btnYes").show();
$("#sInteractionMenu").hide();
$("#hP2").html('');
$("#hP1").html('');
	  $("#guide").css("height","180px");
	  $(".mainSettings").hide();

delete document["optionsVisible"];			
delete document["moveListVisible"];

document["demoMode"]=true;

 document["KeepGuideVisible"]=true; //added for active game startup.
 document["KeepGuideInfoEmpty"]=true;
 gameSettings.aiCount= 2;
gameSettings.aiInteractionFrequency=20;

	gameSettings.gameMode=1; 

if(!isSkipLaunchGame){
  //$( "#render-canvas" ).focus();
 startOfGame();  //--> this is the only thing needed to start a game!!!
}
setTimeout(function(){ 
startupInterface(isSkipLaunchGame)

  }, 1000);
 
 
	
	
}



function showOptions()
{
	
 
 			if(  document["optionsVisible"]){				
delete document["optionsVisible"];
   	$("#btnYes").show();

			$("#sInteractionMenu").hide(); $("#guide").hide();
 }

	 else if(!document["moveListVisible"]  && !gameSettings.isEndgame){
		 document["optionsVisible"]=true;

		  	$("#hP1").html('End current game?');
		  	$("#hP2").html('');


 	$("#sInteractionMenu").show();
   	$("#btnYes").hide();

		$("#guide").show(); 
}
}

function moveList2PlayerSelect()
{
	if(  !document["moveListVisible"] && (gameSettings.aiCount ==0 || gameSettings.aiCount ==2) ){
	if (confirm('Show moves from player 2 (player who started right)?')) {
      moveList(keysP2);

 } else {
    moveList(keysP1);
}
}
else {// close tab
    moveList(keysP1);
}
}
function moveList(whoKeys)
{
	
		
	
			if(  document["moveListVisible"]){	 
			delete document["moveListVisible"];

	if(gameSettings.gameMode != 5 && gameSettings.gameMode != 6 )
	{ 
			engine.runRenderLoop(renderLoop);
			}



			$("#guide").css('overflow','hidden');$("#guide").hide();
			}
			else if(!document["optionsVisible"]  && !gameSettings.isEndgame){

document["moveListVisible"]=true;


	if(gameSettings.gameMode != 5 && gameSettings.gameMode != 6 )
	{
engine.stopRenderLoop()
}
	var movesList=[...gameSettings.generalMoveList];
	
	 
		for (var i=0; i < whoKeys.character.specificMoveList.length; i++)
	{
		movesList.push(whoKeys.character.specificMoveList[i]);
 
	}
 	$("#hP1").html('<div id="spanGameStart"  ></span>');
	 	$("#guide").css('overflow','auto');

		$("#spanGameStart").append("<label style='text-decoration: underline;'>"+whoKeys.character.texts.characterName+"</label><br><br>");

 	$("#hP2").html('/ means OR <br> + means direct after');

		for (var i=0; i < movesList.length; i++)
	{
		$("#spanGameStart").append("<label> "+movesList[i]+"</label><br>");
 
	}
		$("#guide").show(); 
		}

}

var advancedTexture;
function guiSettings(isSkipInterval){
	
	if(gameSettings.gameMode ==4){
	gameSettings.isShowCollisionBoxes=true;
	}
	else{
			gameSettings.isShowCollisionBoxes=false;

	}
	showCollisionBoxes();
	if(typeof advancedTexture != "undefined")
	{
		advancedTexture.dispose();
	}
       advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");//REF: https://playground.babylonjs.com/#XCPP9Y#13

 var createRectangleLine = function() {
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.010;
        rect1.height = "40px";
        rect1.cornerRadius = 20;
        rect1.color = "yellow";
        rect1.thickness = 4;
        rect1.background = "black";
		rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(rect1);    
        return rect1;
    }
	 var createRectangleP1 = function() {
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.25;
        rect1.height = "40px";
        rect1.cornerRadius = 20;
        rect1.color = "black";
        rect1.thickness = 4;
        rect1.background = "blue";
		rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_LEFT;
        advancedTexture.addControl(rect1);    
        return rect1;
    }
		 var createRectangleP2 = function() {
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.25;
        rect1.height = "40px";
        rect1.cornerRadius = 20;
        rect1.color = "black";
        rect1.thickness = 4;
        rect1.background = "red";
		rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_RIGHT;
        advancedTexture.addControl(rect1);    
        return rect1;
    }
	
				 var createText = function(text) {//REF: https://playground.babylonjs.com/#XCPP9Y#2
    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = text;
    text1.color = "white";
    text1.fontSize = 24;
    text1.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    text1.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(text1);    
         return text1;
    }
	

  
 
 var g= createRectangleP2();
 g.left="13%";//130;
   g.top=10;
 keysP2.healtBarBox= g;

 	  var t= createRectangleP1();//ref: https://doc.babylonjs.com/divingDeeper/gui/gui
 //t.color = "blue";
  t.left="-13%";
 t.top=10; // t.top=30;
  keysP1.healtBarBox= t;

    var tSpecialBorder= createRectangleP1(); 
    tSpecialBorder.color = "orange";
	        tSpecialBorder.background = "black";
  tSpecialBorder.left="-20%";
  tSpecialBorder.top="90%";
          tSpecialBorder.width = 0.25;
		       keysP1.specialBarBoxBorder= tSpecialBorder;

   var tSpecial= createRectangleP1(); 
    tSpecial.color = "orange";
	        tSpecial.background = "yellow";
  tSpecial.left="-20%";
  tSpecial.top="90%";
          tSpecial.width = 0.01;
  keysP1.specialBarBox= tSpecial;

 
   var gSpecialBorder= createRectangleP2();
     gSpecialBorder.color = "orange";
	 	        gSpecialBorder.background = "black";
 gSpecialBorder.left="20%"; 
   gSpecialBorder.top="90%";
     keysP2.specialBarBoxBorder= gSpecialBorder;

 var gSpecial= createRectangleP2();
     gSpecial.color = "orange";
	 	        gSpecial.background = "yellow";
 gSpecial.left="20%"; 
   gSpecial.top="90%";
          gSpecial.width = 0.01; //0.25 max!
  keysP2.specialBarBox= gSpecial;


   var f=  createRectangleLine() 
f.top=10; //f.top=8;//"1%";
    //    f.height = "70px";
 f.left=0; 

 //  var fa=  createRectangleLine() 
//fa.top=10; //fa.top=8; 
 //     //  fa.height = "70px";
 //fa.left=-320;//"-32%"; 

 //  var fb=  createRectangleLine() 
//fb.top=10; //fb.top=8; 
      // // fb.height = "70px";
 //fb.left=320 ; 

    serverIdText = createText("MENU");
serverIdText.bottom=50; //timerText.top=80;//"10%";
  serverIdText.left=0;
      serverIdText.fontSize = 14;
   serverIdText.top="90%";
   serverIdText.color ="black";
    timerText = createText("HALT");
timerText.top=50; //timerText.top=80;//"10%";
  timerText.left=0; 

     p1ScoreText = createText("");//("🟩");//"🏆🏆🏆");//⚔⚔⚔");
 p1ScoreText.top=52;
     p1ScoreText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   p1ScoreText.left=520;

    p2ScoreText = createText("");
  p2ScoreText.top=52;
     p2ScoreText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
   p2ScoreText.left=-520;


		if( typeof keysP1.ScoreAttackPoints == "undefined"){
		keysP1.ScoreAttackPoints=0;}
     p1ScoreAttackPointsText = createText("Score: \n"+parseInt(keysP1.ScoreAttackPoints).toString() ); 
 p1ScoreAttackPointsText.top= "1%";
     p1ScoreAttackPointsText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   p1ScoreAttackPointsText.left="5%";
   keysP1.Points= p1ScoreAttackPointsText;

		if( typeof keysP2.ScoreAttackPoints == "undefined"){ 
		keysP2.ScoreAttackPoints=0;}
     p2ScoreAttackPointsText = createText(":Score \n"+parseInt(keysP2.ScoreAttackPoints).toString() ); 
 p2ScoreAttackPointsText.top= "1%";
     p2ScoreAttackPointsText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
   p2ScoreAttackPointsText.left="-5%";
   keysP2.Points= p2ScoreAttackPointsText;


    var imagePortraitP1 = new BABYLON.GUI.Image("p1Image",keysP1.character.images.portraitHappyImages[0]);//REF:https://doc.babylonjs.com/divingDeeper/gui/gui#image
    imagePortraitP1.width = 0.10;
    imagePortraitP1.height = 0.10;
     imagePortraitP1.left ="15%";// 130;
    imagePortraitP1.top = "1%";//5;
    imagePortraitP1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    imagePortraitP1.verticalAlignment = BABYLON.GUI.Control.VERTICAlALIGNMENT_TOP;
	imagePortraitP1.stretch=	BABYLON.GUI.Image.STRETCH_UNIFORM; 
    advancedTexture.addControl(imagePortraitP1);    
	keysP1.portraitBox=imagePortraitP1;

    var imagePortraitP2 = new BABYLON.GUI.Image("p2Image",keysP2.character.images.portraitHappyImages[0]);
    imagePortraitP2.width = 0.10;
    imagePortraitP2.height = 0.10;
     imagePortraitP2.left = "-15%";
    imagePortraitP2.top = "1%";//5;
	imagePortraitP2.scaleX = -1;imagePortraitP2.clipContent = false;//REF:https://forum.babylonjs.com/t/possible-bug-with-babylon-gui-image-scalex/5821
    imagePortraitP2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    imagePortraitP2.verticalAlignment = BABYLON.GUI.Control.VERTICAlALIGNMENT_TOP;
	imagePortraitP2.stretch=	BABYLON.GUI.Image.STRETCH_UNIFORM; 
    advancedTexture.addControl(imagePortraitP2);    
	
	keysP2.portraitBox=imagePortraitP2;

if(!isSkipInterval){
 setInterval(function(){  // gui renderactions 

if(gameSettings.gameMode == 5 || gameSettings.gameMode == 6){
	serverIdText.text=  "Room: " + gameSettings.myGameId.split("_")[0];
	

	if(gameSettings.gameMode == 5   )
	{
 		$(".singlePlayerSettings").show();	
						$(".stageSettings").show();
 				$(".extraGameParams").show();
	  $(".roundCount").show(); $(".timeSettings").show();
				$(".multiPlayerSettings").hide(); 
$("#lblForDifficulty").show();  // bug to fix
  $(".difficultySettings").hide() ;

 	 				$(".aiSettings").hide();


	}
	 
	
	if(gameSettings.gameMode == 6 )
	{		
				$(".multiPlayerSettings").show(); 
$(".singlePlayerSettings").show();	 
				$(".p1CharSettings").hide();

 				
					 $(".roundCount").hide(); $(".timeSettings").hide();
$("#lblForDifficulty").hide();
					 				$(".aiSettings").hide();
				$(".stageSettings").hide();
 				$(".extraGameParams").hide();

	}
	//return;
	}
else if (gameSettings.gameMode == 0){ serverIdText.text= "Story"; if($(".multiPlayerSettings").is(":visible")  ){$(".multiPlayerSettings").hide();		$(".singlePlayerSettings").show();		 } $(".roundCount").hide();$(".timeSettings").hide();$("#lblForDifficulty").show();		$(".stageSettings").show();	$(".extraGameParams").show();}
else if (gameSettings.gameMode == 1){ serverIdText.text= "Arcade"; if($(".multiPlayerSettings").is(":visible")  ){$(".multiPlayerSettings").hide();		$(".singlePlayerSettings").show();		 } $(".roundCount").show();$(".timeSettings").show();$("#lblForDifficulty").show();	$(".stageSettings").show();	$(".extraGameParams").show();}
else if (gameSettings.gameMode == 2){ serverIdText.text= "Survival"; if($(".multiPlayerSettings").is(":visible")  ){$(".multiPlayerSettings").hide();		$(".singlePlayerSettings").show();		 } $(".roundCount").hide(); $(".timeSettings").hide();$("#lblForDifficulty").show();	$(".stageSettings").show();	$(".extraGameParams").show();}
else if (gameSettings.gameMode == 3){ serverIdText.text= "VS"; if(!$(".multiPlayerSettings").is(":visible")  ){$(".multiPlayerSettings").show();		$(".singlePlayerSettings").show();		 } $(".roundCount").show();$(".timeSettings").show();$("#lblForDifficulty").show();	$(".stageSettings").show();	$(".extraGameParams").show();}
else if (gameSettings.gameMode == 4){ serverIdText.text= "Training"; if(!$(".multiPlayerSettings").is(":visible")  ){$(".multiPlayerSettings").show();		$(".singlePlayerSettings").show();		 } $(".roundCount").hide(); $(".timeSettings").hide();$("#lblForDifficulty").show();	$(".stageSettings").show();	$(".extraGameParams").show();}


	 if((gameSettings.gameMode == 5 || gameSettings.gameMode == 6) ||( !gameSettings.isEndgame && endgameTimer >  0 && document["allowCountDownTimer"] )){
	 var timepPrseInt =parseFloat((endgameTimer/10).toFixed(1));// parseInt(endgameTimer/100);=> without comma there is delay
	if( timepPrseInt > -0.1){
	endgameTimer-=0.01;
	timerText.text=parseFloat((endgameTimer).toFixed(0)).toString();
	
		keysP1.Points.text=  "Score: \n"+parseInt(keysP1.ScoreAttackPoints).toString() ;
	keysP2.Points.text=  "Score: \n"+parseInt(keysP2.ScoreAttackPoints).toString() ;

	}
	}
   
   
 if(parseInt(timerText.text) <=0)
 { gameSettings.isEndgame= true;
 timerText.text= "Time's up";
 
 if(gameSettings.gameMode ==2)
 {
	 
	 endOfGame();
	 return;
 }
else{
 isEndRoundCheck(keysP1);
  isEndRoundCheck(keysP2);
}
 }
 
 if(!gameSettings.isEndgame){
 
 roundBasedChecks(keysP1);
  roundBasedChecks(keysP2);

}

/////////////////////////////////////////////////SCORE DISTRIBUTION/////////////////////////////////////////////////
if(isMobile())  /// if mobile, score must be set p1score => p2score & vice versa (BUG TO BE HANDLED!?)
{
	p1ScoreText.text="";
for (var i=0; i< gameSettings.p2Score; i++){
p1ScoreText.text+="🟩"
}

p2ScoreText.text="";
for (var i=0; i< gameSettings.p1Score; i++){
p2ScoreText.text+="🟩"
}
	
}
else{
p1ScoreText.text="";
for (var i=0; i< gameSettings.p1Score; i++){
p1ScoreText.text+="🟩"
}

p2ScoreText.text="";
for (var i=0; i< gameSettings.p2Score; i++){
p2ScoreText.text+="🟩"
}
}
////////////////////////////////////////////////////////////////////////////////////////
 
 }, 10);
  }
  
  var  p1Text = createText(gameSettings.startCheerText+" P1!");
 p1Text.top="20%";
   p1Text.left="-35%";
keysP1.textBox= p1Text;
  keysP1.textBoxTimeout= setTimeout(function(){ keysP1.textBox.text =  ""; }, 1300);

   var p2Text = createText(gameSettings.startCheerText+" P2!");
 p2Text.top="20%";
 p2Text.left="35%";
 keysP2.textBox= p2Text;
  keysP2.textBoxTimeout= setTimeout(function(){ keysP2.textBox.text =  ""; }, 1300);

   var centerText = createText( "");
 centerText.top="35%";
 gameSettings.textBox= centerText;
  gameSettings.textBoxTimeout= setTimeout(function(){ gameSettings.textBox.text =  ""; }, 1300);
 
}

function handleYesButton()
{ 
restartGame();
}

 function tutorialScreen()
{
	
	$("#hP1").html('<div id="divGameTutorialInfo" style="margin-top:-15px;width:100%; overflow:auto;">'+ 
			'<br><label>Control</label>'+
		'<img src="static/assets/INFO/control_tutorial.png" alt="control" style="width:100%;">'+
		'<hr><label>Bars</label>'+
	'<img src="static/assets/INFO/bars_tutorial.PNG" alt="bars" style="width:100%;">'+ 
			'<hr><label>States</label>'+
				'<img src="static/assets/INFO/states_tutorial.PNG" alt="states"style="width:100%;">'+
						'<hr>'+
'<span style="display:table;margin:0 auto;"><button type="button" id="btnReturn" onclick="startupInterface(false)">BACK</button></span>'+
 '</div>');
		$("#guide").css("overflow","auto");
				$("#guide").css("height","80%");

}
$('body').on('change', '#selMode', function(){//REF: https://stackoverflow.com/questions/54246783/get-value-of-dynamic-select-option
  
	if($('#selMode option:selected').val() ==7){
	
	tutorialScreen();
	
	$("#selMode option:eq(1)").prop('selected', true);  
	gameSettings.gameMode=1; 
	}
	else 	if($('#selMode option:selected').val() ==8){
	
	launchUniqueModeA();
	
	$("#selMode option:eq(1)").prop('selected', true);  
	gameSettings.gameMode=1; 
	}
	else{
  gameSettings.gameMode =  ($('#selMode option:selected').val() );
  }
});


//////////////////////////////////// gui(?) calculation/////////////////////////////////////////////////////////////////////////////////////////////

function directDamageCheck(whoKeys)
{

  if( !whoKeys.isStunned && !whoKeys.isDown){
	  
	  if(!whoKeys["nextAttackBreakOn"]  )
	  {
		  
	  
 
 
 var worldFacing=whoKeys.worldFacing;
  
 var worldFacingHostile=calcFacingPosition(whoKeys.hostileKey);
  
  whoKeys.attackMesh.scaling = new BABYLON.Vector3(1 ,1, 1)

attackBoxPosition(whoKeys.hostileKey);
attackBoxPosition(whoKeys);

// symbolisme about .push history=> *** => another action can follow, /// => end of the possible action/combo. Reset afterwards. Overridable by the inputAHitInArray (be cautious). 

//if (typeof whoKeys["Blocked"] == "undefined" &&  !whoKeys.isStunned && (whoKeys.isverticalhitactive==true || whoKeys.ishorizontalhitactive==true) && whoKeys.hostileKey.shieldMesh.intersectsMesh(whoKeys.attackMesh) && whoKeys.hostileKey.shieldMesh.scaling.x == 1 )
if (typeof whoKeys.hostileKey["Blocked"] == "undefined" &&   whoKeys.hostileKey.rangehit==0&& whoKeys.hostileKey.unique==0&&  whoKeys.hostileKey.kick==0&&whoKeys.hostileKey.verticalhit==0 && whoKeys.hostileKey.horizontalhit==0 &&
whoKeys.hostileKey.shieldMesh.intersectsMesh(whoKeys.attackMesh) && whoKeys.hostileKey.shieldMesh.scaling.x > 0.1 )
{  	  	
whoKeys.hostileKey["Blocked"]=true;
 

whoKeys.back=0; whoKeys.front=0; whoKeys.right=0; whoKeys.left=0;   //whoKeys.isStunned=true;
whoKeys.unique=0; whoKeys.verticalhit=0; whoKeys.horizontalhit=0; whoKeys.rangehit=0;
whoKeys.iskickactive=false;whoKeys.isuniqueactive=false;whoKeys.israngeActive=false;whoKeys.isverticalhitactive=false;whoKeys.ishorizontalhitactive=false;

  whoKeys.hostileKey.textBox.text =  ("Blocked attack");	  whoKeys.hostileKey.ScoreAttackPoints +=600*(whoKeys.comboCount+1); 
    clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 500);}
  

else  if (  whoKeys.hostileKey.shieldMesh.scaling.x <= 0.1 ||(!whoKeys.hostileKey.shieldMesh.intersectsMesh(whoKeys.attackMesh) && whoKeys.hostileKey.shieldMesh.scaling.x >0.1)){// &&   !whoKeys.hostileKey.shieldMesh.intersectsMesh(whoKeys.mainMesh)) {

 
/* if( typeof  whoKeys["specialA"] == "undefined" &&   isInputAHitInArray( whoKeys.movementhistory, ["KV"],true,["-"," ","***"],true, worldFacing))//&& whoKeys.movementhistory.length >1 &&( whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "B" )   && ( whoKeys.israngeActive ))
{ 


if(specialActionsList(whoKeys.character.actionList.specialA, whoKeys))
{
//whoKeys.israngeActive=false;
 whoKeys.hostileKey["specialA"]=true;
  whoKeys["nextAttackBreakOn"]=750;

}
 whoKeys.movementhistory.push("///");

 }
else */ // in current setup K cannot be used to start a combo (except direct + K or k + range).

if( typeof  whoKeys["specialA"] == "undefined" &&    isInputAHitInArray( whoKeys.movementhistory, ["UU"],false,["-"," "]))//&& whoKeys.movementhistory.length >1 &&(   whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "F")  && ( whoKeys.iskickactive ))
{ 

if(whoKeys.character.actionList.specialA  > -1 &&   specialActionsList(whoKeys.character.actionList.specialA, whoKeys))
{
//whoKeys.israngeActive=false;
 whoKeys.hostileKey["specialA"]=true;
  whoKeys["nextAttackBreakOn"]=750;

}
 whoKeys.movementhistory.push("///");
 
 }

// same difficulty setup for grabs, vertical, horizontal (atm)
 /*else if(typeof  whoKeys["specialB"] == "undefined" &&  isInputAHitInArray( whoKeys.movementhistory, ["LP","RP","BP","FP"],true,["-"," ","***"],true, worldFacing))//&& whoKeys.movementhistory.length >1  && isInputAHitInArray( whoKeys.movementhistory, ["UK"],true,["-"," "],true, worldFacing))//&& ( whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "R" ||  whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "L") &&   ( whoKeys.isuniqueactive ))
{      
//whoKeys.isuniqueactive=false;
// whoKeys.hostileKey["specialB"]=true;
 // whoKeys["nextAttackBreakOn"]=750;

 //whoKeys.movementhistory.push("---");

 //  specialActionsList(whoKeys.character.actionList.specialB, whoKeys)
 }*/
   
   
else  if(whoKeys.character.actionList.verticalAttackC  > -1 &&  typeof whoKeys["verticalAttackC"] == "undefined" && isInputAHitInArray( whoKeys.movementhistory, ["UP"],true,["-"," "],true, worldFacing))//&&  (  whoKeys.movementhistory.length >1 &&whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "V" && whoKeys.movementhistory.length >2 && whoKeys.movementhistory[whoKeys.movementhistory.length-3] == "V"))
{   
if(physicalActionsList(whoKeys.character.actionList.verticalAttackC, whoKeys))
{
 whoKeys["verticalAttackC"]=true; 
  whoKeys["nextAttackBreakOn"]=250;

}
 
    whoKeys.movementhistory.push("///");//***");

 }
 else if(typeof whoKeys["horizontalAttackC"] == "undefined" && isInputAHitInArray( whoKeys.movementhistory, ["UK"],true,["-"," "],true, worldFacing))//&&  (  whoKeys.movementhistory.length >1 &&whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "H" && whoKeys.movementhistory.length >2 && whoKeys.movementhistory[whoKeys.movementhistory.length-3] == "H")   )
{  


if(whoKeys.character.actionList.horizontalAttackC  > -1 &&  physicalActionsList(whoKeys.character.actionList.horizontalAttackC, whoKeys))
{
   whoKeys["horizontalAttackC"]=true;
  whoKeys["nextAttackBreakOn"]=250;

}
 whoKeys.movementhistory.push("///");//***");

 }
else if(typeof whoKeys["horizontalAttackB"] == "undefined"&& isInputAHitInArray( whoKeys.movementhistory, ["UH","DH","RH","LH"],true,["-"," ","***" ],true, worldFacing))// && !whoKeys.isStunned &&  whoKeys.movementhistory.length >1 &&( whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "B" ||  whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "F") &&    ( whoKeys.ishorizontalhitactive ))
{
 
  if(whoKeys.character.actionList.horizontalAttackB  > -1 &&  physicalActionsList(whoKeys.character.actionList.horizontalAttackB, whoKeys))
  {
  //whoKeys.ishorizontalhitactive=false;
//whoKeys.isuniqueactive=false;

whoKeys["horizontalAttackB"]=true;
  whoKeys["nextAttackBreakOn"]=250;

  }
   whoKeys.movementhistory.push("///");

  
 } 
else if(typeof whoKeys["verticalAttackB"] == "undefined" && isInputAHitInArray( whoKeys.movementhistory, ["UV","DV","LV","RV"],true,["-"," ","***" ],true, worldFacing) )//&& !whoKeys.isStunned && whoKeys.movementhistory.length >1 &&( whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "B" ||  whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "F") &&    ( whoKeys.isverticalhitactive ))
{
 
 if(whoKeys.character.actionList.verticalAttackB > -1 &&  physicalActionsList(whoKeys.character.actionList.verticalAttackB, whoKeys))
 {
 //whoKeys.isverticalhitactive=false;
whoKeys["verticalAttackB"]=true;
  whoKeys["nextAttackBreakOn"]=250;
 

 }
  whoKeys.movementhistory.push("///");


 } 
//else if(  (whoKeys.isverticalhitactive || whoKeys.ishorizontalhitactive )){//&& !whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.attackMesh) &&(whoKeys.isverticalhitactive || whoKeys.ishorizontalhitactive )){

// if(whoKeys.ishorizontalhitactive && typeof whoKeys["horizontalAttackA"] == "undefined"){
  else if(   typeof whoKeys["horizontalAttackA"] == "undefined" && isInputAHitInArray( whoKeys.movementhistory, ["H"],true,["-"," "],true, worldFacing) ){
 if(physicalActionsList(keysP1.character.actionList.horizontalAttackA,whoKeys))
 {
   whoKeys["horizontalAttackA"]=true; 
 whoKeys["nextAttackBreakOn"]=250;

 // whoKeys.ishorizontalhitactive=false;

 }
  whoKeys.movementhistory.push("***");//whoKeys.movementhistory.push("***");

 }
 //else if(typeof whoKeys["verticalAttackA"] == "undefined"){
else   if(   typeof whoKeys["verticalAttackA"] == "undefined" && isInputAHitInArray( whoKeys.movementhistory, ["V"],true,["-"," "],true, worldFacing) ){
  if(whoKeys.character.actionList.verticalAttackA  > -1 &&  physicalActionsList(whoKeys.character.actionList.verticalAttackA,whoKeys))
  {
     whoKeys["verticalAttackA"]=true;  
  whoKeys["nextAttackBreakOn"]=250;
 //  whoKeys.isverticalhitactive=false; 

  }
  whoKeys.movementhistory.push("***");//  whoKeys.movementhistory.push("***");

  }
//}


//else//{
// physicalActionsList(keysP1.character.actionList.horizontalAttackB,whoKeys);
 
//}

}
 if(   typeof whoKeys["push"] == "undefined"   && isInputAHitInArray( whoKeys.movementhistory, ["BK","FK","LK","RK"],true,["-"," "],true, worldFacing) ) //   if (typeof whoKeys["push"] == "undefined" && !whoKeys.isStunned    && whoKeys.iskickactive ) 
{  
//whoKeys.iskickactive=false;  
  
if(whoKeys.character.actionList.push  > -1 &&  grabActionsList(whoKeys.character.actionList.push,whoKeys)) //well, Push action ..
{
whoKeys["push"]=true;
  whoKeys["nextAttackBreakOn"]=200;
   whoKeys.hostileKey["nextAttackBreakOn"]=200;

}
whoKeys.movementhistory.push("///");

}
else   if ( whoKeys.character.actionList.grabA  > -1 &&  typeof whoKeys["grabA"] == "undefined"    && isInputAHitInArray( whoKeys.movementhistory, ["P"],true,["-"," "],true, worldFacing)&& ( whoKeys.character.energy >= 5 || !whoKeys.character.isWithEnergy) )//&&    whoKeys.israngeActive )// whoKeys.movementhistory.length >0 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] =="P"  ) //grab
{ //whoKeys.israngeActive=false;


if(grabActionsList(keysP1.character.actionList.grabA,whoKeys))
{
 whoKeys["grabA"]=true;
  whoKeys["nextAttackBreakOn"]=200;
   whoKeys.hostileKey["nextAttackBreakOn"]=200;  
} 

whoKeys.movementhistory.push("///");

}   
 
else  if(typeof   whoKeys["otherActionA"] == "undefined" && isInputAHitInArray( whoKeys.movementhistory, ["K"],true,["-"," "],true, worldFacing) ){
  if(otherActionsList(whoKeys.character.actionList.otherActionA, whoKeys))
  {
    whoKeys["nextAttackBreakOn"]=100; 
  whoKeys["otherActionA"]=true;

  }

 whoKeys.movementhistory.push("***");
 }
 else if(typeof   whoKeys["rangeActionA"] == "undefined" &&isInputAHitInArray( whoKeys.movementhistory, ["KU"],true,["-"," ","***" ],true, whoKeys.worldFacing))
{

if(whoKeys.character.actionList.rangeActionA  > -1 && RangeActionsList(whoKeys.character.actionList.rangeActionA,whoKeys))
{
 whoKeys["nextAttackBreakOn"]=200;
   whoKeys["rangeActionA"]=true;

}
whoKeys.movementhistory.push("///");

}


if(typeof whoKeys["nextAttackBreakOn"] != "undefined")
{
setTimeout(function(){delete whoKeys["nextAttackBreakOn"];}, whoKeys["nextAttackBreakOn"]);

}
    }
	}
	else if(whoKeys.isStunned || whoKeys.isDown) {
		
		 if(  typeof whoKeys["BREAKFREE"] == "undefined"   && isInputAHitInArray( whoKeys.movementhistory, ["U"],true,["-"," "],true, worldFacing) ) 
		 {
			  whoKeys["BREAKFREE"]=true;
				otherActionsList(-1, whoKeys);				
 setTimeout(function(){delete whoKeys["BREAKFREE"];  }, 1000);// later to visualise.
			 
		 }
	}
}
function resetComboBuildUp(whoKeys, timeout)
{

var timer= 300;
if(typeof timeout != "undefined" && parseInt(timeout) >0)
{
	timer = timeout;
}
 directDamageCheck(whoKeys); 

if(whoKeys.movementhistory.length > 1 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] != "///"){// full reset from movement
  clearTimeout(whoKeys["tmpTimerCombo"] ); 	
  whoKeys["tmpTimerCombo"]=
 setTimeout(function(){

 whoKeys.movementhistory.push("///");
 }, timer);
 }
 
}

