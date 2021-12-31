
  
var  timerText;
var serverIdText;

var endgameTimer ;
var  p1Text;
var  p2Text;
var timeoutTextp1;
var timeoutTextp2;

/*
var characterMoveSet={specialA:0,specialB:1,specialC:2, grabA:1,  push:0, verticalAttackA:0,horizontalAttackA:6 ,
                     verticalAttackB:2,horizontalAttackB:1,verticalAttackC:3,horizontalAttackC:4, otherActionA:0,rangeActionA:0}

var characterImages={ portraitHappyImages:[],portraitSadImages:[],
idleImages:[], movementImages:[],jumpImages:[],kickImages:[],painImages:[],pushImages:[],
verticalAttackAImages:[],horizontalAttackAImages:[],verticalAttackBImages:[],horizontalAttackBImages:[],verticalAttackCImages:[],horizontalAttackCImages:[],otherActionAImages:[],rangeActionAImages:[],
stunnedImages:[],kneelBlockImages:[],kneelImages:[],grabAImages:[], specialAImages:[],specialBImages:[],specialCImages:[],blockImages:[],   hitEffectImages:[],hittedEffectImages:[],blockingEffectImages:[],  projectileImages:[],victoryImages:[],downImages:[],startImages:[],
isVerticalAttackAStandalone:true,isHorizontalAttackAStandalone:false,isVerticalAttackBStandalone:true,isHorizontalAttackBStandalone:true,isVerticalAttackCStandalone:true,isHorizontalAttackCStandalone:true,isOtherActionAStandalone:true,isRangeActionAStandalone:false, isStunnedStandalone:false,
isSpecialAStandalone:true,isSpecialBStandalone:true,isSpecialCStandalone:true,isGrabAStandalone:true ,isPushedStandalone:false 
}
var characterSounds={ hitSound:"", hittedSound:"",energizeSound:"",grabSound:"",blockSound:"",projectileSound:"",jumpSound:"",pushSound:"", walkSound:"", evadeSound:"", stunSound:""}

var characterText={characterName:"",characterDescription:"", victoryTexts:[],tauntTexts:[],loseTexts:[],startupTexts:[]}

var characterSettings ={texts:characterText, sounds:characterSounds,  images: characterImages, actionList:goclone(characterMoveSet),
health:100, energy:100,special:0,  hangtime:0, maxSpecial:0.25,  maxHealth:100,  maxEnergy:100, maxHangTime:25, inputLength:250,
 isAllowStun:true,isWithEnergy:false, isWithHealthRestore:false, isWithSpecial:true, isFleeBlock:true, isWatchingOpponent:true,sizeModifier:0.1, movementModifier: 0.25, damageModifier:-1.0,launchedRemainTime:0,launchingTime:30,dotHealthTime:10,dotSpecialTime:10,dotEnergyTime:10,projectileRange:60, 
 isCanJump:true,isCanDash:true,isCanGoVertical:true,isCanGoHorizontal:true, specialType:0, tagMatch:false, tagTeamCount:0}
*/


 var gameSettings= JSON.parse($.getJSON({'url':   "/static/assets/gameConfig.config", 'async': false}).responseText);// note aiInteractionFrequency => difficulty (lower is harder)  

var  characterSettings=JSON.parse($.getJSON({'url': gameSettings.server+ "/static/assets/char/Thane/character.config", 'async': false}).responseText);
var characterSettings2 = JSON.parse($.getJSON({'url': gameSettings.server+ "/static/assets/char/Knight/character.config", 'async': false}).responseText);



function alterStage(stageName)
{
		if(stageName == "random"){ setNewStage()}
	else{

//gameSettings["stageBackgroundMesh"] 
//gameSettings["stageFloorMesh"] 
//gameSettings["stageGroundMesh"] 

 
if(typeof gameSettings["stageBackgroundMesh"]  != "undefined")
{
//scene.freezeActiveMeshes();


gameSettings.stage= null; 

 var level= $.getJSON({'url': "static/assets/stages/"+stageName+"/stage.config", 'async': false});  
gameSettings.stage= JSON.parse(level.responseText);
 
 var mat = new BABYLON.StandardMaterial("matplaneBackground", scene);
mat.diffuseTexture = new BABYLON.Texture( gameSettings.stage.backgroundsTop[0], scene);
mat.diffuseTexture.hasAlpha = true;
mat.useAlphaFromDiffuseTexture = false; 
  mat.backFaceCulling = false;
     mat.emissiveColor = new BABYLON.Color3(1,1,1);
gameSettings["stageBackgroundMesh"].material.dispose();
gameSettings["stageBackgroundMesh"] .material=  	 mat;


if(typeof gameSettings["stageGroundMesh"]  != "undefined")
{
 var mat = new BABYLON.StandardMaterial("matground", scene);
mat.diffuseTexture = new BABYLON.Texture(gameSettings.stage.backgroundsBottom[0], scene);
mat.diffuseTexture.hasAlpha = true;
mat.useAlphaFromDiffuseTexture = false; 
  mat.backFaceCulling = false;
  mat.emissiveColor = new BABYLON.Color3(1,1,1); 
gameSettings["stageGroundMesh"].material.dispose();
gameSettings["stageGroundMesh"] .material=  	 mat;
}

if(typeof gameSettings["stageFloorMesh"]  != "undefined")
{
var floorName =gameSettings["stageFloorMesh"].name.replace("boxFloorHidden","boxFloorVisible");
var floorToEdit=scene.getMeshByName(floorName);
if(typeof floorToEdit != "undefined")
{

var mat;
if(!gameSettings["stageFloorMesh"]["isPlaneVisibleInsteadOfBox"]){
 var mat = new BABYLON.StandardMaterial("matboxFloor", scene);//new BABYLON.StandardMaterial("matplaneFloorA", scene);
mat.diffuseTexture = new BABYLON.Texture( gameSettings.stage.floorImages[0], scene);
mat.diffuseTexture.hasAlpha = true;
mat.useAlphaFromDiffuseTexture = false; 
  mat.backFaceCulling = false;
     mat.emissiveColor = new BABYLON.Color3(0,0,0); 
 
}else{

var mat = new BABYLON.StandardMaterial("matplaneFloorA", scene);
mat.diffuseTexture = new BABYLON.Texture( gameSettings.stage.floorImages[0], scene);
mat.diffuseTexture.hasAlpha = true;
mat.useAlphaFromDiffuseTexture = false; 
  mat.backFaceCulling = false;
     mat.emissiveColor = new BABYLON.Color3(1,1,1); 
 }
 
  floorToEdit.material.diffuseTexture.dispose();
floorToEdit.material.dispose();
floorToEdit .material=  	 mat;
 
}
}

 
 //setTimeout(function(){ scene.unfreezeActiveMeshes();}, 1000);

}
}
}
function alterCharacter(whoKeys,charName)
{
	 if(  whoKeys["isOtherActionSizeTinyChange"]  )
		{
			otherActionsList(3, whoKeys);
		}
	if(charName == "random"){ 	  
	
	if(typeof gameSettings["whoCharIndexKeysP1"] == "undefined" ){
	  gameSettings["whoCharIndexKeysP1"]=-1;}
		if(typeof gameSettings["whoCharIndexKeysP2"] == "undefined" ){
	  gameSettings["whoCharIndexKeysP2"]=-1;}

	setNewCharacter(whoKeys)
	}
	else{
 	//scene.freezeActiveMeshes(); //REF: https://doc.babylonjs.com/divingDeeper/scene/optimize_your_scene
whoKeys.character= null; 
   whoKeys.character= JSON.parse($.getJSON({'url': gameSettings.server+ "/static/assets/char/"+charName+"/character.config", 'async': false}).responseText); 
//setTimeout(function(){ scene.unfreezeActiveMeshes();}, 1000);
 
 for (var i=0; i <document["characterList"].length; i++)
 {
	 if(document["characterList"][i] ==charName){
	  gameSettings["whoCharIndexKeysP"+(whoKeys.who+1).toString()]=i;
	  break;
	  }

 }
 if(gameSettings["whoCharIndexKeysP1"] ==   gameSettings["whoCharIndexKeysP2"] && whoKeys["colorIndex"]==  whoKeys.hostileKey["colorIndex"]){
 	    setEmissiveColorMainMesh(whoKeys);  }

  
}
}
function setNewCharacter(whoKeys)
{
		var randIndex=getRandomInt(0,document["characterList"].length-1);

	alterCharacter(whoKeys,document["characterList"][randIndex]);  
	
	  gameSettings["whoCharIndexKeysP"+(whoKeys.who+1).toString()] =randIndex;

  if(typeof whoKeys.character.colorPalettes != "undefined" && whoKeys.character.colorPalettes.length >0){
  for (let i = 0; i < getRandomInt(0,  whoKeys.character.colorPalettes.length); i++) {
  setEmissiveColorMainMesh(whoKeys);  
} 
}
}
function setNewStage()
{
	var randIndex=getRandomInt(0,document["stageList"].length-1);
	alterStage (document["stageList"][randIndex]);
 
 gameSettings.stageIndex =randIndex; 

for (let i = 0; i < getRandomInt(1,5); i++) {
  setEmissiveColorBackground(scene.getMeshByName('planeBackground')); 
 }
}
function startActionsAfterDataLoad()
{

			   		keysP1.ScoreAttackPoints  = 0;
 		keysP1.Points.text=  "Score: \n"+keysP1.ScoreAttackPoints.toString() ;

		   		keysP2.ScoreAttackPoints  = 0;
 		keysP2.Points.text=  "Score: \n"+keysP2.ScoreAttackPoints.toString() ;

 if(!document["demoMode"]){
	 backgroundMusicLaunch(gameSettings.stage.backgroundMusic); 
 playOneShot(gameSettings.countdown);
 
 	if(typeof document["KeepGuideInfoEmpty"] == "undefined" ||  document["KeepGuideInfoEmpty"] ==false){
$("#hP1").text(keysP1.character.texts.startupTexts[getRandomInt(0, keysP1.character.texts.startupTexts.length-1)]);
$("#hP2").text(keysP2.character.texts.startupTexts[getRandomInt(0, keysP2.character.texts.startupTexts.length-1)]);
	}
	}
 setTimeout(function(){ if(typeof document["KeepGuideVisible"] == "undefined" ||  document["KeepGuideVisible"] ==false){$("#guide").hide();} if(document["demoMode"]){gameSettings.isEndgame=false;} }, 3000);

}

 function preloadAssetData()
 {
 
 
 gameSettings.myGameId = uuidv4().substring(0,4)+"_p1";

var  characterList=$.get({'url': gameSettings.server+ "/DIR/static/assets/char", 'async': false}).responseText.split(",");
var stageList = $.get({'url': gameSettings.server+ "/DIR/static/assets/stages", 'async': false}).responseText.split(",");

document["characterList"] =[];
document["stageList"] =[];

for (var i = 0; i < characterList.length; i++) { 
	if(characterList[i].indexOf(".") <0){
		document["characterList"].push(characterList[i]);
 $("#selP1").append("      <option value="+characterList[i]+">"+characterList[i]+"</option>");
  $("#selP2").append("      <option value="+characterList[i]+">"+characterList[i]+"</option>");
}
}
for (var i = 0; i < stageList.length; i++) {
		if(stageList[i].indexOf(".") <0){ 
				document["stageList"].push(stageList[i]);

 $("#selStage").append("      <option value="+stageList[i]+">"+stageList[i]+"</option>");
 }
 }
}


function startOfGame()
{
	    $(document).ready(function(){ 

 
 var level= $.getJSON({'url': "static/assets/stages/chess/stage.config", 'async': false});  
gameSettings.stage= JSON.parse(level.responseText);
 
 

  endgameTimer=gameSettings.matchTimer;

  generateScene();
guiSettings();
 characterVisuals();
  
startActionsAfterDataLoad();
     

 });

 }
function endOfGame()
{
	if(gameSettings.p1Score>gameSettings.p2Score )
		  {
	 gameSettings.textBox.text=  (  "P2 " + gameSettings.winText);
		  }
		  else  if(gameSettings.p1Score<gameSettings.p2Score )
		  {
	 gameSettings.textBox.text=  ("P1 " +   gameSettings.winText);
		  }
		   else    
		  {
	 gameSettings.textBox.text=  (  gameSettings.drawEqualText);
		  }
  gameSettings.textBoxTimeout= setTimeout(function(){ gameSettings.textBox.text =  ""; }, 1500);

	keysP1.ScoreAttackPoints +=  Math.abs(Math.ceil( keysP1.character.health*10 ));
 		keysP1.Points.text=  "Score: \n"+keysP1.ScoreAttackPoints.toString() ;


	keysP2.ScoreAttackPoints += Math.abs(Math.ceil( keysP2.character.health*10 ));
 		keysP2.Points.text=  "Score: \n"+keysP2.ScoreAttackPoints.toString() ;

		delete document["allowCountDownTimer"];

		 if( (gameSettings.gameMode ==1 ) &&  !document["demoMode"] ){ // arcade mode
		 	 if(typeof  document["arcadeStageIncrease"] == "undefined" ){document["arcadeStageIncrease"] =0;}
		 document["arcadeStageIncrease"] +=1;		 
		  if (document["arcadeStageIncrease"] >=8)
		  {
		delete	  document["arcadeContinue"];
			  	unlockAbles();

			  // game completed!
		  }
	  else{
		  
		  if(gameSettings.p1Score>gameSettings.p2Score )
		  {
			  delete document["arcadeContinue"];
			  
	  setNewCharacter(keysP2);
	  gameSettings.p1Score=0;
	  	  gameSettings.p2Score=0;
		  setNewStage();
		  	  newRound(); 
			  	unlockAbles();

			  $("#guide").show();
 		  $("#hP1").text( "Match "+(document["arcadeStageIncrease"]+1) .toString()+" from 8.");$("#hP2").text( "...");
		  setTimeout(function(){ 		document["allowCountDownTimer"]=true;	  $("#guide").hide();}, 1000);

	  return;
	  }
	  else
	  {
		  document["arcadeStageIncrease"]-=1;
		  document["arcadeContinue"]=true;
	  }
	  }
}		 



	
  $("#guide").show();
if(typeof document["KeepGuideInfoEmpty"] == "undefined" ||  document["KeepGuideInfoEmpty"] ==false){
	$("#sInteractionMenu").show(); 
	  $("#guide").css("height","230px");
 
if(gameSettings.p1Score > gameSettings.p2Score){
$("#hP1").text(keysP1.character.texts.victoryTexts[getRandomInt(0, keysP1.character.texts.victoryTexts.length-1)]);
$("#hP2").text(keysP2.character.texts.loseTexts[getRandomInt(0, keysP2.character.texts.loseTexts.length-1)]);
}
else if(gameSettings.p1Score <gameSettings.p2Score){
$("#hP1").text(keysP1.character.texts.loseTexts[getRandomInt(0, keysP1.character.texts.loseTexts.length-1)]);
$("#hP2").text(keysP2.character.texts.victoryTexts[getRandomInt(0, keysP2.character.texts.victoryTexts.length-1)]);
}
}

if(gameSettings.aiCount == 2)
{
	$("#btnYes").hide();
	
setTimeout(function(){
		if(typeof document["KeepGuideInfoEmpty"] == "undefined" ||  document["KeepGuideInfoEmpty"] ==false){
$("#hP1").text( "New match in 10 seconds.");$("#hP2").text( "...");
		}
setTimeout(function(){ 

if(gameSettings.gameMode ==2 ){
	keysP1.character.health= keysP1.character.maxHealth;
resetParamsPlayField();
guiSettings(true);
gameSettings.isEndgame=false; 

}
 
restartGame();	
 
}, 10000);
}, 3000);


}

}


function restartGame()
{
		$("#btnYes").hide();
		$("#btnNo").hide();

delete 	document["allowCountDownTimer"] ;
	  $("#guide").css("height","180px");
	  
	if(!document["arcadeContinue"]){
	delete document["arcadeStageIncrease"];
	}			delete	  document["arcadeContinue"];

		delete document["survivalStageIncrease"];
 delete document["demoMode"];
 
	var tempAiCount=gameSettings.aiCount;
	gameSettings.aiCount = 0;
	
//$("#sInteractionMenu").hide();

gameSettings.round=0;
gameSettings.p1Score=0;
gameSettings.p2Score=0;

startActionsAfterDataLoad();
 newRound( );	
 
 setTimeout(function(){  
 
 		$("#btnYes").show(); // restoring buttons for endgame
		$("#btnNo").show();


 document["allowCountDownTimer"]=true;
  //	newRound();		 endgameTimer=parseInt(gameSettings.matchTimer)+1;

 if(gameSettings.gameMode !=5 && gameSettings.gameMode !=6 ){gameSettings.aiCount = tempAiCount;}
 
if(gameSettings.gameMode !=6 && gameSettings.aiCount <2){
setControl( p1Control,keysP1);
} 
if(gameSettings.gameMode !=5 && gameSettings.aiCount <1){
setControl(p2Control,keysP2);
} 

	 $(".mainSettings").show();

 gameSettings.textBox.text=  (  gameSettings.countdownText);
  gameSettings.textBoxTimeout= setTimeout(function(){ gameSettings.textBox.text =  ""; }, 1500);

 }, 3000);
 
}

function resetParamsPlayField()
{
	
	 aiInteractCounter=0;
  aiHaltCounter=0;

delete keysP1["isAllowedToAlterVisual"];
    delete keysP1["Blocked"];
  delete keysP1["isReversalPose"] ;
delete keysP1["connectedFloor"];

delete keysP1["showComboStarter"];
delete keysP1["showCritical"];
delete keysP1["showCriticalUpper"];
delete keysP1["showBlood"];
delete keysP1["showBloodUpper"];
 delete keysP1["timeToHoldBeforeCastOtherAction3"];
 delete keysP1["TIMEOUTTimeToHoldBeforeCastOtherAction3"]; 
  delete   keysP1["nextHitCausesStun"];

  if(typeof keysP1 != "undefined"){
	  
	 
  
   keysP1.movementhistory.push("***");
   
keysP1.front=0;
keysP1.back=0;
keysP1.left=0;
keysP1.right=0;
keysP1.jump=0;
keysP1.verticalhit=0;
keysP1.horizontalhit=0;
keysP1.rangehit=0;
keysP1.unique=0;
keysP1.kick=0;

  keysP1.tmpStandaloneActionGoingOn=undefined; 
  
   if(   keysP1["isOtherActionSizeTinyChange"]  ) // classic ref to otheractionlist does not work correctly ==> only occurs when ai vs ai in start menu
		{
		setTimeout(function(){	keysP1.kick= 1}, 100); //otherActionsList(3, keysP1);
		//	keysP1.jump= 1 
		//	setTimeout(function(){ keysP1.jump= 0;	 keysP1.mainMesh.position.y = keysP1.mainMesh.position.y -0.6; }, 100);

		}

  if(gameSettings.isResetPositionAfterRound){
  keysP1.mainMesh.position.x = -3;
keysP1.mainMesh.position.z = 0;
keysP1.mainMesh.position.y = 0;
}
if(gameSettings.gameMode !=2){ // survival mode
keysP1.character.health= keysP1.character.maxHealth;
}
  keysP1.character.energy= keysP1.character.maxEnergy;
 keysP1.character.special= 0;
 keysP1.character.hangtime= 0;
 keysP1.character.launchedRemainTime= 0;
keysP1.character.dothealth=0;
keysP1.character.dotenergy=0;
keysP1.character.dotspecial=0;

// keysP1.character=goclone(characterSettings); => does not work
keysP1.isStunned=false;
keysP1.isVictor=false;
keysP1.isDown=false;
keysP1.isPacified=false;
keysP1.isInvisible=false;
keysP1.isjumping=false;
keysP1.isverticalhitactive= false;
keysP1.ishorizontalhitactive= false;
keysP1.isuniqueactive= false;
keysP1.iskickactive= false;

  clearTimeout(keysP1.textBoxTimeout);
 
  if(gameSettings.p1Score <gameSettings.p2Score  ){
    keysP1.textBox.text =  ("Don't give up!");  
	}
	else if(gameSettings.p1Score > gameSettings.p2Score  ){
    keysP1.textBox.text =  ("You can smell victory!");  
	}
	else if(gameSettings.p1Score == gameSettings.p2Score  ){
    keysP1.textBox.text =  ("Go P1!");  
	}

}

  if(typeof keysP2 != "undefined"){
	  
	 
	     keysP2.movementhistory.push("***");

delete keysP2["isAllowedToAlterVisual"];
    delete keysP2["Blocked"];
  delete keysP2["isReversalPose"] ;
delete keysP2["connectedFloor"];

delete keysP2["showComboStarter"];
delete keysP2["showCritical"];
delete keysP2["showCriticalUpper"];
delete keysP2["showBlood"];
delete keysP2["showBloodUpper"];
 delete keysP2["timeToHoldBeforeCastOtherAction3"];
 delete keysP2["TIMEOUTTimeToHoldBeforeCastOtherAction3"]; 
 delete   keysP2["nextHitCausesStun"];

keysP2.front=0;
keysP2.back=0;
keysP2.left=0;
keysP2.right=0;
keysP2.jump=0;
keysP2.verticalhit=0;
keysP2.horizontalhit=0;
keysP2.rangehit=0;
keysP2.unique=0;
keysP2.kick=0;


  keysP2.tmpStandaloneActionGoingOn=undefined; 

     if(   keysP2["isOtherActionSizeTinyChange"]  ) // classic ref to otheractionlist does not work correctly  ==> only occurs when ai vs ai in start menu
		{
		//	keysP2.jump= 1 
		//	setTimeout(function(){ keysP2.jump= 0;	 keysP2.mainMesh.position.y = keysP2.mainMesh.position.y -0.6; }, 100);
	setTimeout(function(){keysP2.kick= 1}, 100); //otherActionsList(3, keysP2);
		}
		
    if(gameSettings.isResetPositionAfterRound){
keysP2.mainMesh.position.x = 3;
keysP2.mainMesh.position.z = 0;
keysP2.mainMesh.position.y = 0;
}

if(gameSettings.gameMode !=2 || gameSettings.aiCount <2){
 keysP2.character.health= keysP2.character.maxHealth;
 }
  keysP2.character.energy= keysP2.character.maxEnergy;
 keysP2.character.special= 0;
 keysP2.character.hangtime= 0;
 keysP2.character.launchedRemainTime= 0;
keysP2.character.dothealth=0;
keysP2.character.dotenergy=0;
keysP2.character.dotspecial=0;

keysP2.isStunned=false;
keysP2.isVictor=false;
keysP2.isDown=false;
keysP2.isPacified=false;
keysP2.isInvisible=false;
keysP2.isjumping=false;
keysP2.isverticalhitactive= false;
keysP2.ishorizontalhitactive= false;
keysP2.isuniqueactive= false;
keysP2.iskickactive= false;

  clearTimeout(keysP2.textBoxTimeout);

  if(gameSettings.p2Score <gameSettings.p1Score  ){
    keysP2.textBox.text =  ("Don't give up!");  
	}
	else if(gameSettings.p2Score > gameSettings.p1Score  ){
    keysP2.textBox.text =  ("You can smell victory!");  
	}
	else if(gameSettings.p2Score == gameSettings.p1Score  ){
    keysP2.textBox.text =  ("Go P2!");  
	}
}
endgameTimer=gameSettings.matchTimer;
	
}
function drawRound()
{
 
setTimeout(function(){ timerText.text= "Draw. You can do better!";
setTimeout(function(){ newRound(true);}, 3000);
}, 3000);
}
function newRound(isDontSkipScore)
{
		if(isDontSkipScore){
		keysP1.ScoreAttackPoints += Math.abs(Math.ceil( keysP1.character.health*10 ));
 		keysP1.Points.text=  "Score: \n"+keysP1.ScoreAttackPoints.toString() ;
		
		if(gameSettings.gameMode !==1){
	keysP2.ScoreAttackPoints += Math.abs(Math.ceil( keysP2.character.health*10 ));
 		keysP2.Points.text=  "Score: \n"+keysP2.ScoreAttackPoints.toString() ;
}
}
	 if(gameSettings.gameMode ==2  ){ // survival mode
	  
	  if(typeof document["survivalStageIncrease"] == "undefined"){document["survivalStageIncrease"]=0;}
	  if(   keysP1.character.health <=  -150  )//keysP1.hostileKey.character.health) // end of survival mode
	{
		$("#btnYes").hide();
		endOfGame();  
		return;
	}
	else{
			keysP2.ScoreAttackPoints  = 0;
 		keysP2.Points.text=  "Score: \n"+keysP2.ScoreAttackPoints.toString() ;

		  setNewCharacter(keysP2); 

	  document["survivalStageIncrease"]+=1;
	  if(document["survivalStageIncrease"] % 5==0)
	  {
		  setNewStage();
	  }
}
} 
resetParamsPlayField();
guiSettings(true);



gameSettings.isEndgame=false; 

setTimeout(function(){
delete document["p1HaltGameSignalShown"];// added for multiplayer purpose.
delete document["p2HaltGameSignalShown"];
}, 1000);

}

function calcFacingPosition(whoKeys)
{
var worldFacing=0;
 if(whoKeys.mainMesh.position.x >= whoKeys.attackMesh.position.x)
 {
 worldFacing=1;
 } 
 
 return worldFacing;
  } 
  
  function syncDelay(milliseconds){
 var start = new Date().getTime();
 var end=0;
 while( (end-start) < milliseconds){
     end = new Date().getTime();
 }
}


function isEndRoundCheck(whoKeys)
{

if(whoKeys.character.health ==whoKeys.hostileKey.character.health)
{
//handle draw
drawRound();
}
else{
if((typeof document["p1HaltGameSignalShown"] == "undefined" || !document["p1HaltGameSignalShown"]) && whoKeys.who ==1 && whoKeys.character.health < whoKeys.hostileKey.character.health)
{
			document["p1HaltGameSignalShown"]=true;

gameSettings.isEndgame=true;  whoKeys.isDown=true;whoKeys.hostileKey.isVictor=true;
whoKeys.portraitBox.source=whoKeys.character.images.portraitSadImages[0];

gameSettings.p1Score+=1;
setTimeout(function(){
  if(gameSettings.rounds > gameSettings.p1Score){  
  newRound(true);
  }else{endOfGame();}
  }, 2000);
} else if((typeof document["p2HaltGameSignalShown"] == "undefined" || !document["p2HaltGameSignalShown"])   && whoKeys.who ==0 && whoKeys.character.health < whoKeys.hostileKey.character.health)
{
			document["p2HaltGameSignalShown"]=true;

gameSettings.isEndgame=true;  whoKeys.isDown=true;whoKeys.hostileKey.isVictor=true;
whoKeys.portraitBox.source=whoKeys.character.images.portraitSadImages[0];

gameSettings.p2Score+=1;
setTimeout(function(){
  if(gameSettings.rounds > gameSettings.p2Score){  
  newRound(true);
  }else{endOfGame();}
  }, 2000);
}
 }
}

function roundBasedChecks(whoKeys)
{
if(typeof whoKeys != "undefined"){
if(   whoKeys.who==0){ 
 if(whoKeys.character.isWithEnergy){
  whoKeys.healtBarBox.alpha=whoKeys.character.energy/100;
  if(whoKeys.character.energy< 100){
whoKeys.character.energy+=0.1;
}
if(whoKeys.character.energy< 0){whoKeys.character.energy=0;}
else if(whoKeys.character.energy> whoKeys.character.maxEnergy){whoKeys.character.energy=whoKeys.character.maxEnergy;}} else{whoKeys.character.energy=whoKeys.character.maxEnergy;}

    if(gameSettings.isWithMoveableHealthBar){  whoKeys.healtBarBox.width = 0.285; whoKeys.healtBarBox.left=-(whoKeys.character.health) *0.85  ;}
	   else {whoKeys.healtBarBox.width=(whoKeys.character.health/1000) + 0.15;}

if(whoKeys.character.health> -150){
whoKeys.portraitBox.source=whoKeys.character.images.portraitHappyImages[0];
}
if(whoKeys.character.health<= -150){whoKeys.character.health=-150;

if(whoKeys.hostileKey.character.health <= -150)
{
//handle draw
drawRound();
}
else if (typeof document["p2HaltGameSignalShown"] == "undefined" || !document["p2HaltGameSignalShown"]){
	document["p2HaltGameSignalShown"]=true;
gameSettings.isEndgame=true;  whoKeys.isDown=true;whoKeys.hostileKey.isVictor=true;
whoKeys.portraitBox.source=whoKeys.character.images.portraitSadImages[0];

gameSettings.p2Score+=1;
setTimeout(function(){

  if(gameSettings.rounds > gameSettings.p2Score  || ( gameSettings.gameMode ==2 && gameSettings.p1Score <1)){
  newRound(true);
  }
  else{endOfGame();}
    }, 2000);

}
}
else if(whoKeys.character.health> whoKeys.character.maxHealth){whoKeys.character.health=whoKeys.character.maxHealth;}

if( whoKeys.character.isWithSpecial ==false){whoKeys.specialBarBox.width=0; whoKeys.specialBarBoxBorder.width=0;} 
else{
whoKeys.character.special+= 0.0001; 

if(whoKeys.character.special <0){whoKeys.character.special=0;}
else if(whoKeys.character.special>whoKeys.character.maxSpecial){whoKeys.character.special=whoKeys.character.maxSpecial;}
whoKeys.specialBarBox.width= whoKeys.character.special;
}
 }
  else if(  whoKeys.who==1){
   if(whoKeys.character.isWithEnergy){
   whoKeys.healtBarBox.alpha=whoKeys.character.energy/100;
   if(whoKeys.character.energy< 100){
whoKeys.character.energy+=0.1;
}
if(whoKeys.character.energy< 0){whoKeys.character.energy=0;}
else if(whoKeys.character.energy> whoKeys.character.maxEnergy){whoKeys.character.energy=whoKeys.character.maxEnergy;}} else{whoKeys.character.energy=whoKeys.character.maxEnergy;}

 
   if(gameSettings.isWithMoveableHealthBar){ whoKeys.healtBarBox.width = 0.285;whoKeys.healtBarBox.left=(whoKeys.character.health) *0.85 ;}
   else {whoKeys.healtBarBox.width=(whoKeys.character.health/1000) + 0.15;}

if(whoKeys.character.health>  -150){ 
whoKeys.portraitBox.source=whoKeys.character.images.portraitHappyImages[0];
}

if(whoKeys.character.health<= -150){
if(whoKeys.hostileKey.character.health <= -150)
{
//handle draw
drawRound();
}
else if (typeof document["p1HaltGameSignalShown"] == "undefined" || !document["p1HaltGameSignalShown"]){
	document["p1HaltGameSignalShown"] =true;
gameSettings.isEndgame=true;  whoKeys.isDown=true;whoKeys.hostileKey.isVictor=true;
whoKeys.portraitBox.source=whoKeys.character.images.portraitSadImages[0];

gameSettings.p1Score+=1;
setTimeout(function(){
  if(gameSettings.rounds > gameSettings.p1Score || ( gameSettings.gameMode ==2 && gameSettings.p2Score <1)){  
  newRound(true);
  }else{endOfGame();}
  }, 2000);
}
}
else if(whoKeys.character.health> whoKeys.character.maxHealth){whoKeys.character.health=whoKeys.character.maxHealth;}

if(whoKeys.character.isWithSpecial ==false){whoKeys.specialBarBox.width=0; whoKeys.specialBarBoxBorder.width=0;} 
else{
whoKeys.character.special+= 0.0001; 

if(whoKeys.character.special <0){whoKeys.character.special=0;}
else if(whoKeys.character.special>whoKeys.character.maxSpecial){whoKeys.character.special=whoKeys.character.maxSpecial;}
whoKeys.specialBarBox.width= whoKeys.character.special;}
}
}
}

function bordersCheck(boxLeftEnd,boxRightEnd)
{
	
	if ((typeof document["p2HaltGameSignalShown"] == "undefined" || !document["p2HaltGameSignalShown"]) && !gameSettings.isEndgame &&  keysP1.mainMesh.intersectsMesh(boxLeftEnd) && gameSettings.isEndgameWithWalls) {
		
		document["p2HaltGameSignalShown"]=true;
		
gameSettings.isEndgame=true;  keysP1.isDown=true;keysP1.hostileKey.isVictor=true;
keysP1.portraitBox.source=keysP1.character.images.portraitSadImages[0];

gameSettings.p2Score+=1;
clearTimeout(keysP1.textBoxTimeout);
  keysP1.textBox.text =  ("You've crossed the line!"); 
  
     		keysP1.ScoreAttackPoints -= Math.ceil( keysP1.character.maxHealth*100 );
			if(keysP1.ScoreAttackPoints <0){keysP1.ScoreAttackPoints=0;}
 		keysP1.Points.text=  "Score: \n"+keysP1.ScoreAttackPoints.toString() ;

   setTimeout(function(){  

  if(gameSettings.rounds > gameSettings.p2Score || ( gameSettings.gameMode ==2 && gameSettings.p2Score > gameSettings.p1Score  )){  
  newRound(true);
  }
  else{endOfGame();}
}, 2000);
return true;

}
else if ((typeof document["p2HaltGameSignalShown"] == "undefined" || !document["p2HaltGameSignalShown"]) && !gameSettings.isEndgame &&  keysP1.mainMesh.intersectsMesh(boxRightEnd) && gameSettings.isEndgameWithWalls) {
	
			document["p2HaltGameSignalShown"]=true;

gameSettings.isEndgame=true;  keysP1.isDown=true;keysP1.hostileKey.isVictor=true;
keysP1.portraitBox.source=keysP1.character.images.portraitSadImages[0];

gameSettings.p2Score+=1;
clearTimeout(keysP1.textBoxTimeout);
      keysP1.textBox.text =  ("You've crossed the line!");  
	  
	       		keysP1.ScoreAttackPoints -= Math.ceil( keysP1.character.maxHealth*100 );
							if(keysP1.ScoreAttackPoints <0){keysP1.ScoreAttackPoints=0;}
 		keysP1.Points.text=  "Score: \n"+keysP1.ScoreAttackPoints.toString() ;

	 setTimeout(function(){  

  if(gameSettings.rounds > gameSettings.p2Score || ( gameSettings.gameMode ==2 && gameSettings.p1Score <1)){  
  newRound(true);
  }
  else{endOfGame();}}, 2000);
  return true;

}
else if ((typeof document["p1HaltGameSignalShown"] == "undefined" || !document["p1HaltGameSignalShown"]) && !gameSettings.isEndgame && keysP2.mainMesh.intersectsMesh(boxLeftEnd) && gameSettings.isEndgameWithWalls) {
				document["p1HaltGameSignalShown"]=true;

gameSettings.isEndgame=true;  keysP2.isDown=true;keysP2.hostileKey.isVictor=true;
keysP2.portraitBox.source=keysP2.character.images.portraitSadImages[0];

gameSettings.p1Score+=1;
clearTimeout(keysP2.textBoxTimeout);
   keysP2.textBox.text =  ("You've crossed the line!"); 
   
   		keysP2.ScoreAttackPoints -= Math.ceil( keysP2.character.maxHealth*100 );
					if(keysP2.ScoreAttackPoints <0){keysP2.ScoreAttackPoints=0;}
 		keysP2.Points.text=  "Score: \n"+keysP2.ScoreAttackPoints.toString() ;

 setTimeout(function(){
  if(gameSettings.rounds > gameSettings.p1Score || ( gameSettings.gameMode ==2  && gameSettings.p1Score > gameSettings.p2Score )){  
  newRound(true);
  }
  else{endOfGame();}
}, 2000);
return true;

}
else if ((typeof document["p1HaltGameSignalShown"] == "undefined" || !document["p1HaltGameSignalShown"]) && !gameSettings.isEndgame && keysP2.mainMesh.intersectsMesh(boxRightEnd) && gameSettings.isEndgameWithWalls) {
				document["p1HaltGameSignalShown"]=true;

gameSettings.isEndgame=true;  keysP2.isDown=true;keysP2.hostileKey.isVictor=true;
keysP2.portraitBox.source=keysP2.character.images.portraitSadImages[0];
gameSettings.p1Score+=1;
 clearTimeout(keysP2.textBoxTimeout);
    keysP2.textBox.text =  ("You've crossed the line!");  
	
	   		keysP2.ScoreAttackPoints -= Math.ceil( keysP2.character.maxHealth*100 );
								if(keysP2.ScoreAttackPoints <0){keysP2.ScoreAttackPoints=0;}
 		keysP2.Points.text=  "Score: \n"+keysP2.ScoreAttackPoints.toString() ;

 setTimeout(function(){

  if(gameSettings.rounds > gameSettings.p1Score || ( gameSettings.gameMode ==2 && gameSettings.p2Score <1)){  
  newRound(true);
  }
  else{endOfGame();}
}, 2000);
return true;

}

return false;
}