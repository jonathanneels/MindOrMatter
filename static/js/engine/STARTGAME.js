




    var canvas = document.getElementById("render-canvas");
 var engine  ;
var scene ;
var camera;
var light;
var boxpC;


var keysP1;
var keysP2;
 
 
  var backgroundMusic  ;

  var mouseClickLoc;
  var lclickCount = 0;
var cclickCount=0;
var rclickCount=0;


var   boxFloorA;




 

var renderLoop;
function generateScene(isNotSkipSetControllers){
  engine = new BABYLON.Engine(canvas);
  scene = new BABYLON.Scene(engine);

scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);
                	//CAMERA 
			 	//   var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, -10), scene);
			   //camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -10), scene); 
       camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1.75, 2, -20, new BABYLON.Vector3(0, 0, -10), scene);
	                    camera.checkCollisions = false;

	                	scene.collisionsEnabled = true;
                	scene.activeCamera = camera; 
                	
                 //	  scene.activeCamera.attachControl(canvas);// => keep camera to center.
// setFog();
  //setRain();
 // setLightning();
// setShiny()
  light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 20, 0), scene);
         // 	  light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,  10, 0), scene);
        //	light.groundColor = new BABYLON.Color3(.05, .05, .05);

                  	//Skybox
                	var skybox = BABYLON.Mesh.CreateBox("skyBox", 200.0, scene);
                    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
                    skyboxMaterial.backFaceCulling = false;
                    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("static/assets/textures_main/skybox", scene);
                    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
                    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
                    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                    skybox.material = skyboxMaterial;
                    skybox.checkCollisions = false;

gameSettings["stageSkyboxMesh"]=skybox;

const plane = BABYLON.Mesh.CreatePlane("planeBackground", 50, scene, true, BABYLON.MeshBuilder.DoubleSide);
var mat = new BABYLON.StandardMaterial("matplaneBackground", scene);
mat.diffuseTexture = new BABYLON.Texture( gameSettings.stage.backgroundsTop[0], scene);
mat.diffuseTexture.hasAlpha = true;
mat.useAlphaFromDiffuseTexture = false; 
  mat.backFaceCulling = false;
     mat.emissiveColor = new BABYLON.Color3(1,1,1); 
 // plane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
 plane.position.z= 2.5;
  plane.position.y= 11; 
plane.material = mat;
plane.scaling = new BABYLON.Vector3(1.7,0.6, 1); 
gameSettings["stageBackgroundMesh"]=plane;

    var ground = BABYLON.Mesh.CreateGround("ground", 50, 50, 2, scene);
var mat = new BABYLON.StandardMaterial("matground", scene);
mat.diffuseTexture = new BABYLON.Texture(gameSettings.stage.backgroundsBottom[0], scene);
mat.diffuseTexture.hasAlpha = true;
mat.useAlphaFromDiffuseTexture = false; 
  mat.backFaceCulling = false;
  mat.emissiveColor = new BABYLON.Color3(1,1,1);
 // plane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
 ground.position.z= -12;
  ground.position.y= -3// -8; 
ground.material = mat;
ground.scaling = new BABYLON.Vector3(1.7,3, 1)
 	ground.rotation = new BABYLON.Vector3(0, 3.14,   0);
gameSettings["stageGroundMesh"]=ground;

 
     boxFloorA =  createClimableObject(3,0.2,10,-10, 7 , 0, gameSettings.stage.floorImages[0],gameSettings.isAbsolute2D)
gameSettings["stageFloorMesh"]=boxFloorA;

  keysP1={character:characterSettings,characterB:{},characterC:{}, hostileKey: {},attackMesh:{},shieldMesh:{},mainUpperMesh: {},mainMesh: {},mainMeshVisual:{},shieldMeshVisual:{},attackMeshVisual:{},shadowmesh: {}, framerate:50,
  actionTimeout: setTimeout(function(){ keysP1.movementhistory.push(" ");}, 150), comboCount:0, lastComboCount:0,dashTimeout: setTimeout(function(){ keysP1.movementhistory.push(" ");}, 150),isStunned:false, isPacified:false, isInvisible:false,
  who:0,front:0,left:0,back:0,right:0,run:0,jump:0,isjumping:false,
  rangehit:0,israngeActive:false,verticalhit:0, isverticalhitactive:false, horizontalhit:0,ishorizontalhitactive:false,  
  block:0, lowblock:0,kick:0,dothealth:0,dotenergy:0,dotspecial:0, iskickactive:false,grab:0,unique:0,isuniqueactive:false, portraitBox:{}, textBox:{}, healtBarBox:{}, healtBarBoxBorder:{},specialBarBox:{},specialBarBoxBorder:{}, textBoxTimeout:setTimeout(function(){  }, 100), movementhistory:[], currentActiveVisual:"", isDown:false, isVictor:false };

  keysP2={character:characterSettings2/*goclone(characterSettings)*/,characterB:{},characterC:{},hostileKey: keysP1,attackMesh:{},shieldMesh:{},mainUpperMesh: {},mainMesh: {},mainMeshVisual:{},shieldMeshVisual:{},attackMeshVisual:{}, shadowmesh: {}, framerate:50,
  actionTimeout: setTimeout(function(){ keysP2.movementhistory.push(" ");}, 150), comboCount:0,lastComboCount:0, dashTimeout: setTimeout(function(){ keysP1.movementhistory.push(" ");}, 150),isStunned:false, isPacified:false, isInvisible:false,
  who:1,front:0,left:0,back:0,right:0,run:0,jump:0 ,isjumping:false,
  rangehit:0,israngeActive:false,verticalhit:0,isverticalhitactive:false, horizontalhit:0, ishorizontalhitactive:false, 
  block:0, lowblock:0,kick:0,dothealth:0,dotenergy:0,dotspecial:0, iskickactive:false,grab:0,unique:0,isuniqueactive:false, portraitBox:{},textBox:{}, healtBarBox:{}, healtBarBoxBorder:{},specialBarBox:{},specialBarBoxBorder:{},textBoxTimeout:setTimeout(function(){  }, 100), movementhistory:[], currentActiveVisual:"", isDown:false, isVictor:false };
keysP1.hostileKey= keysP2;

 

var boxp1 = BABYLON.Mesh.CreateBox("boxLowerP1", 2+keysP1.character.sizeModifier, scene);
boxp1.position.x = -3;
var boxMaterial = new BABYLON.StandardMaterial("matboxLowerP1", scene);
boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
boxp1.material = boxMaterial;
var boxp1Upper = BABYLON.Mesh.CreateBox("boxUpperP1", 2+keysP1.character.sizeModifier, scene);
boxp1Upper.position.x = -3;
boxp1Upper.position.y = 2;
var boxMaterial = new BABYLON.StandardMaterial("matboxUpperP1", scene);
boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
boxp1Upper.material = boxMaterial;
var boxp1Shield = BABYLON.Mesh.CreateBox("boxp1Shield", 4+keysP1.character.sizeModifier, scene);
boxp1Shield.position.x =  -3;
var boxMaterial = new BABYLON.StandardMaterial("matboxp1Shield", scene);
boxMaterial.emissiveColor = new BABYLON.Color3(1, 0.08, 0.86);
boxp1Shield.material = boxMaterial;
boxp1Shield.scaling = new BABYLON.Vector3(0.1 ,0.1, 0.1)
var boxp1Attack = BABYLON.Mesh.CreateBox("boxp1Attack", 1.2+keysP1.character.sizeModifier, scene);
boxp1Attack.position.x =  -1.5;
var boxMaterial = new BABYLON.StandardMaterial("matboxp1Attack", scene);
boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.08, 1);
boxp1Attack.material = boxMaterial;


var boxp2 = BABYLON.Mesh.CreateBox("boxLowerP2", 2+keysP2.character.sizeModifier, scene);
boxp2.position.x =  3;
var boxMaterial = new BABYLON.StandardMaterial("matboxLowerP2", scene);
boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.08, 0.86);
boxp2.material = boxMaterial;
var boxp2Upper = BABYLON.Mesh.CreateBox("boxUpperP2", 2+keysP2.character.sizeModifier, scene);
boxp2Upper.position.x =  3;
boxp2Upper.position.y =  2;
var boxMaterial = new BABYLON.StandardMaterial("matboxUpperP2", scene);
boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.08, 0.86);
boxp2Upper.material = boxMaterial;  
var boxp2Shield = BABYLON.Mesh.CreateBox("boxp2Shield", 4+keysP2.character.sizeModifier, scene);
boxp2Shield.position.x =  3;
var boxMaterial = new BABYLON.StandardMaterial("matboxp2Shield", scene);
boxMaterial.emissiveColor = new BABYLON.Color3(1, 0.08, 0.86);
boxp2Shield.material = boxMaterial;
boxp2Shield.scaling = new BABYLON.Vector3(0.1 ,0.1, 0.1)
var boxp2Attack = BABYLON.Mesh.CreateBox("boxp2Attack", 1.2+keysP2.character.sizeModifier, scene);
boxp2Attack.position.x =  1.5;
var boxMaterial = new BABYLON.StandardMaterial("matboxp2Attack", scene);
boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.08, 1);
boxp2Attack.material = boxMaterial;

 

  boxpC = BABYLON.Mesh.CreateBox("boxcenterPc", 0.2, scene);
boxpC.position.x =  3;
var boxMaterial = new BABYLON.StandardMaterial("material", scene);
boxMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.08, 0.86);
boxpC.material = boxMaterial;
					    camera.setTarget(boxpC);
  boxpC.visibility=0.0;	


var boxLeftEnd = BABYLON.Mesh.CreateBox("boxLeftEnd", 10.5, scene);
boxLeftEnd.position.x =  -55;
boxLeftEnd.scaling = new BABYLON.Vector3(5,50, 5)
var boxMaterial = new BABYLON.StandardMaterial("matboxLeftEnd", scene);
    boxMaterial.specularColor = new BABYLON.Color3(0, 0, 0); 
	  boxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
boxLeftEnd.material = boxMaterial;
  boxLeftEnd.visibility=1.0;//0.4;	
boxLeftEnd.checkCollisions = true;

var boxRightEnd = BABYLON.Mesh.CreateBox("boxRightEnd", 10.5, scene);
boxRightEnd.position.x =    55;
boxRightEnd.scaling = new BABYLON.Vector3(5,50, 5)
var boxMaterial = new BABYLON.StandardMaterial("matboxRightEnd", scene);
  boxMaterial.specularColor = new BABYLON.Color3(0, 0, 0); 
  boxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0); 
boxRightEnd.material = boxMaterial;
  boxRightEnd.visibility=1.0;//0.4;
                    boxRightEnd.checkCollisions = true;





     var shadowP1Mesh = createPlayerShadow('shadowP1Mesh',keysP1) 
    var shadowP2Mesh = createPlayerShadow('shadowP2Mesh',keysP2)
 
keysP1.shadowMesh=shadowP1Mesh;keysP1.attackMesh=boxp1Attack;keysP1.shieldMesh=boxp1Shield;keysP1.mainUpperMesh= boxp1Upper;keysP1.mainMesh= boxp1,
keysP2.shadowMesh=shadowP2Mesh;keysP2.attackMesh=boxp2Attack;keysP2.shieldMesh=boxp2Shield;keysP2.mainUpperMesh= boxp2Upper;keysP2.mainMesh= boxp2;

  if(!isNotSkipSetControllers){
//keyBoardController(keysP1);
//gamePadController(keysP2);
//mouseController(keysP1);

setControl( p1Control,keysP1);
setControl(p2Control,keysP2);
}

gameSettings.stageIndex = 0; 
  gameSettings["whoCharIndexKeysP1"] = -1 ; 
  gameSettings["whoCharIndexKeysP2"] =  -1; 
  	keysP1["controlID"]=-1; 
	 	keysP2["controlID"]=-1; 


  


function shieldActivateCheck(whoKeys )
{
 var worldFacing=whoKeys.worldFacing;

if(typeof whoKeys.movementhistory !== 'undefined' && whoKeys.movementhistory.length > 0 && !whoKeys.isDown) {
 
if (  whoKeys["canBlock"] || (whoKeys.character.isFleeBlock && whoKeys.attackMesh.position.x >= whoKeys.mainMesh.position.x && whoKeys.movementhistory[whoKeys.movementhistory.length-1] =="L" )){
whoKeys.shieldMesh.scaling = new BABYLON.Vector3(1 ,1, 1);
if( whoKeys["isOtherActionSizeTinyChange"])
{
whoKeys.shieldMesh.scaling = new BABYLON.Vector3(0.6 ,0.6, 0.6);

}
else{
whoKeys.shieldMesh.scaling = new BABYLON.Vector3(1 ,1, 1);

}
whoKeys.movementhistory.push(" "); 
}
else if( whoKeys["canBlock"]  || (whoKeys.character.isFleeBlock && whoKeys.attackMesh.position.x < whoKeys.mainMesh.position.x && whoKeys.movementhistory[whoKeys.movementhistory.length-1] =="R" )){

if( whoKeys["isOtherActionSizeTinyChange"])
{
whoKeys.shieldMesh.scaling = new BABYLON.Vector3(0.6 ,0.6, 0.6);

}
else{
whoKeys.shieldMesh.scaling = new BABYLON.Vector3(1 ,1, 1);
}
whoKeys.movementhistory.push(" "); 
}
 
}
}

function projectileDamageCheck(whoKeys)
{
try{
   for (var i = projectileList.length - 1; i >= 0; i--) { 
   for (var g = projectileList.length - 1; g >= 0; g--) { 
   
   if(projectileList[i]==projectileList[g])
   {
   continue;
   }
else   ( typeof projectileList[g] != "undefined" &&  typeof projectileList[i] != "undefined" && projectileList[i].intersectsMesh(projectileList[g])  ) 
   {
     try{
  projectileList[i].material.dispose(); projectileList[i].dispose();projectileList[i]=null;     
       projectileList.splice(i, 1);   
	   }
	   catch(err){
	   console.log(err);
	   }
	   
	     try{
  projectileList[g].material.dispose(); projectileList[g].dispose();projectileList[g]=null;     
       projectileList.splice(g, 1);   }
	   catch(err){
	   console.log(err);
	   }
   }
   }
   }
} catch(err){console.log(err);}
// Projectile Damage calc:  shield does not protect against offensive (evade the thin object).
   for (var i = projectileList.length - 1; i >= 0; i--) { 
  if (projectileList[i].intersectsMesh(whoKeys.mainMesh)  ) {
  
      if (  whoKeys.shieldMesh.scaling.x > 0.1) {
	  whoKeys.ScoreAttackPoints +=600*(whoKeys.comboCount+1); 
	whoKeys.textBox.text =  ("Projectile Stopped!");clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){ whoKeys.textBox.text =  ""; }, 500);	
	 	  try{
  projectileList[i].material.dispose(); projectileList[i].dispose();projectileList[i]=null;     
       projectileList.splice(i, 1);   }
	   catch(err){
	   console.log(err);
	   }
	   whoKeys["Blocked"]=true;
	continue;
	}
else{
//checkForStunInjection(whoKeys); => Thane needs to do physical damage, character distance stun, needs to be added (json var to add).
 whoKeys.comboCount  =0;whoKeys.hostileKey.comboCount  +=0.1;  whoKeys.character.health-=1+whoKeys.character.special;
 //if(whoKeys.hostileKey.character.isWithHealthRestore){whoKeys.hostileKey.character.health+=1+whoKeys.character.special;}  => NO HEALTH RESTORE FOR NORMAL PROJECTILE (json param, like stun & Thane)
 whoKeys.textBox.text =  ("Projectile!");clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){ whoKeys.textBox.text =  ""; 
  // projectileList[i].material.dispose(); 
  // projectileList[i].dispose();projectileList[i]=null;         projectileList[i].splice(i, 1);
// alt: set flag
 }, 500);
 
 
 alterEffectVisual(whoKeys,whoKeys.mainMesh,whoKeys.character.images.hittedEffectImages , 15);
 
  	 playOneShot(whoKeys.character.sounds.hittedSound);	 
	  if(typeof whoKeys.isInvisible != "undefined" &&  whoKeys.isInvisible){whoKeys.isInvisible=false;}
	  }

 }
 
   if (projectileList[i].intersectsMesh(whoKeys.mainUpperMesh)  ) {
   
    if (  whoKeys.shieldMesh.scaling.x > 0.1) {
		  whoKeys.ScoreAttackPoints +=600*(whoKeys.comboCount+1); 
	whoKeys.textBox.text =  ("Projectile Stopped!");clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){ whoKeys.textBox.text =  ""; }, 500);
		  try{
	   projectileList[i].material.dispose(); projectileList[i].dispose();projectileList[i]=null;     
       projectileList.splice(i, 1); }
catch(err){
	   console.log(err);
	   }	   
	   whoKeys["Blocked"]=true;	   
		continue;
		}
   else{
//checkForStunInjection(whoKeys);  => Thane needs to do physical damage, character distance stun, needs to be added (json var to add).
    whoKeys.character.launchedRemainTime=0;//whoKeys.hostileKey.character.launchingTime;  
	//overrideIdleMesh(whoKeys, whoKeys.character.images.painImages, whoKeys.hostileKey.character.launchingTime*10);

	whoKeys.comboCount  =0;whoKeys.hostileKey.comboCount  +=0.1;  whoKeys.character.health-=2+whoKeys.character.special;
//if(whoKeys.hostileKey.character.isWithHealthRestore){whoKeys.hostileKey.character.health+=2+whoKeys.character.special/*damageModifier*/;}   => NO HEALTH RESTORE FOR NORMAL PROJECTILE (json param, like stun & Thane)
	whoKeys.textBox.text =  ("CRITICAL - Projectile!");clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){ whoKeys.textBox.text =  ""; 
 }, 500);
 
  
 alterEffectVisual(whoKeys,whoKeys.mainUpperMesh,whoKeys.character.images.hittedEffectImages , 15)  
 
 	 playOneShot(whoKeys.character.sounds.hittedSound);	 
	  if(typeof whoKeys.isInvisible != "undefined" && whoKeys.isInvisible){whoKeys.isInvisible=false;}
}
  }
  
    
  
}
}

function dotDamageCheck(whoKeys)
{
if(parseFloat(whoKeys.hostileKey.dothealth)>0)
{
whoKeys.hostileKey.dothealth-= 0.1;
whoKeys.hostileKey.character.health-=  whoKeys.character.special+ 0.2;//0.1;

if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=0.2+ whoKeys.character.special/*damageModifier*/ ;}

 
}
if(whoKeys.hostileKey.character.isWithEnergy &&  parseFloat(whoKeys.hostileKey.dotenergy)>0)
{
whoKeys.hostileKey.dotenergy-= 0.1;
whoKeys.hostileKey.character.energy-= 0.2;// 0.1; => 0.1 was the default, but is really low
 
}
if(whoKeys.hostileKey.character.isWithSpecial && parseFloat(whoKeys.hostileKey.dotspecial)>0)
{
whoKeys.hostileKey.dotspecial-= 0.1;
whoKeys.hostileKey.character.special-= 0.2;// 0.1;
 
}
}
 
 function stageHeightPositionCheck(whoKeys)
 {
 
 
 
   if((whoKeys.mainMesh.intersectsMesh(boxFloorA) /*|| 
   (boxFloorA.position.y == whoKeys.mainMesh.position.y && boxFloorA.position.x == whoKeys.mainMesh.position.x ) */) 
   && !whoKeys["connectedFloor"])
 {
 whoKeys["connectedFloor"]=boxFloorA.position;// new floors previous position based on the conn. FFR
  
  var tmpMax= whoKeys.maxHangTime ;
 whoKeys.maxHangTime = 0; // good way to alter jump in heights
 setTimeout(function(){  
 whoKeys.maxHangTime =tmpMax; whoKeys.hangtime =0;

 if(whoKeys["isOtherActionSizeTinyChange"])
{
 whoKeys.mainMesh.position.y =  ( boxFloorA.position.y);

}else{
 whoKeys.mainMesh.position.y =  (7+boxFloorA.position.y);
 }
 }, 10); 
  

  
  }
  else    if((!gameSettings.isAbsolute2D && (whoKeys.back ==1 || whoKeys.front ==1 ) &&  whoKeys.kick ==1  &&  !whoKeys.isjumping)||  (gameSettings.isAbsolute2D && whoKeys.back ==1 &&  !whoKeys.isjumping)|| (whoKeys["connectedFloor"]  &&  !whoKeys.isjumping && !whoKeys.mainMesh.intersectsMesh(boxFloorA)) )// !whoKeys.mainMesh.intersectsMesh(planeFloorA)   && whoKeys["connectedFloor"] && whoKeys.mainMesh.position.y > planeFloorA.position.y  )
 {
    delete whoKeys["connectedFloor"];
 
   if(whoKeys["isOtherActionSizeTinyChange"])
 {
  whoKeys.mainMesh.position.y=-1.0;

 }
 else{
 whoKeys.mainMesh.position.y=0;
 }
 //goclone(planeFloorA.position.y); 

//  console.log("test");

 }
   
   if(((whoKeys.mainMesh.position.y < 0 )|| (whoKeys["isOtherActionSizeTinyChange"] && whoKeys.mainMesh.position.y > -1.5 && !whoKeys.isjumping && !whoKeys["connectedFloor"])) &&  !whoKeys.isDown  )
 {
 if(whoKeys["isOtherActionSizeTinyChange"])
 {
  whoKeys.mainMesh.position.y=-1.0;

 }
 else{
 whoKeys.mainMesh.position.y=0;
 }
 }
 }



function comboCheck(whoKeys,comboCheckResetTime)
{
 ///combocheck in damage calc:
  if(whoKeys.comboCount > 0 && whoKeys.lastComboCount != whoKeys.comboCount){

	  if(whoKeys.hostileKey.isInvisible){whoKeys.hostileKey.isInvisible=false;}

whoKeys.lastComboCount = whoKeys.comboCount;
var hitCount =Math.floor(whoKeys.comboCount);
if(hitCount <1){hitCount=1;}
whoKeys.textBox.text =  ("Hits "+hitCount+"X");clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){ whoKeys.textBox.text =  ""; whoKeys.comboCount=0;}, 300* comboCheckResetTime);

 whoKeys.ScoreAttackPoints +=50*(whoKeys.comboCount+1);
}
}
function physicalLaunchedCheck(whoKeys) {

if(whoKeys.hostileKey.character.launchedRemainTime >0 && whoKeys.character.launchedRemainTime >0)
{

 whoKeys.character.launchedRemainTime=1;
		 
}
else if(whoKeys.character.launchedRemainTime >1)// && (whoKeys.hostileKey.ishorizontalhitactive || whoKeys.hostileKey.isverticalhitactive) )
{
if(typeof whoKeys["previousPositionY"] == "undefined"){
whoKeys["previousPositionY"]= whoKeys.mainMesh.position.y;
}
 whoKeys.mainMesh.position = new BABYLON.Vector3(whoKeys.mainMesh.position.x,whoKeys.hostileKey.mainMesh.position.y+0.5,whoKeys.mainMesh.position.z);


whoKeys.character.launchedRemainTime-=1; 

if( Math.abs(   (whoKeys.mainMesh.position.x)- (whoKeys.hostileKey.mainMesh.position.x) )< 5 ){
whoKeys.isStunned=true;
}

}
else if(whoKeys.character.launchedRemainTime ==1)
{
 whoKeys.character.launchedRemainTime=0;
		whoKeys.mainMesh.position = new BABYLON.Vector3(whoKeys.mainMesh.position.x,whoKeys["previousPositionY"],whoKeys.mainMesh.position.z);
		
		if(whoKeys.mainMesh.position.y < ground.position.y || whoKeys.mainMesh.position.y > ground.position.x) // editable in future. working with floors it would bring the char to bottom.
		{
		whoKeys.mainMesh.position.y =0;//ground.position.y;
		}
		
		if( Math.abs(   (whoKeys.mainMesh.position.x)- (whoKeys.hostileKey.mainMesh.position.x) )< 5 ){
		whoKeys.hostileKey.isStunned=true;
 whoKeys.isStunned=true;
}

 setTimeout(function(){delete whoKeys["previousPositionY"]; whoKeys.isStunned=false;		whoKeys.hostileKey.isStunned=false;  }, whoKeys.hostileKey.launchingTime);


}
}

function positioningLimitsInRoomCheck(whoKeys )
{
 var worldFacing=whoKeys.worldFacing;

//if(whoKeys.isDown){   whoKeys.mainMesh.position.y  = -0.7    }

  
	if(typeof whoKeys.mainMesh !="undefined"){
	 whoKeys.shadowMesh.position.y=  -2.5;
 	 	 	 whoKeys.shadowMesh.position.x=  whoKeys.mainMesh.position.x; 
	 whoKeys.shadowMesh.position.z=  whoKeys.mainMesh.position.z; 
 }
	 
	 if(typeof mouseClickLoc != "undefined" && typeof  whoKeys["pointerMesh"] != "undefined" )
	 {
	 

	 	  whoKeys.right=0;
								   whoKeys.left=0;
								  whoKeys.back=0;
								   whoKeys.front=0;
								   mouseClickLoc.attempts+=1;
			  if(mouseClickLoc.attempts > 100 || (Math.floor(whoKeys.mainMesh.position.x) == Math.floor(mouseClickLoc.x) && Math.floor(whoKeys.mainMesh.position.z) == Math.floor(mouseClickLoc.z)))
			  {
			  mouseClickLoc= undefined; 
			   whoKeys["pointerMesh"].visibility=0.0; 
			  }
			  else {

								  if(Math.floor(whoKeys.mainMesh.position.x) > Math.floor(mouseClickLoc.x)){
								   whoKeys.left=1;
								   whoKeys.right=0;


								 }
								 else  if(Math.floor(whoKeys.mainMesh.position.x) <Math.floor(mouseClickLoc.x)){
								   whoKeys.right=1;
								   whoKeys.left=0;
								}
								
								 if(Math.floor(whoKeys.mainMesh.position.z) > Math.floor(mouseClickLoc.z)){
								  whoKeys.back=1;
								   whoKeys.front=0;
								}
								else if(Math.floor(whoKeys.mainMesh.position.z) < Math.floor(mouseClickLoc.z)){
								  whoKeys.front=1;
								   whoKeys.back=0;
								}
								}
	 }
	// if(actionCheckResetTime <= actionCheckCounter){
	 //actionCheckCounter=0;
	 
	 
	 boxpC.position.x =  (whoKeys.mainMesh.position.x+whoKeys.hostileKey.mainMesh.position.x)/2;
		 boxpC.position.z =  (whoKeys.mainMesh.position.z+whoKeys.hostileKey.mainMesh.position.z)/2;
		// boxpC.position.y=  (keysP1.mainMesh.position.y+keysP2.mainMesh.position.y)/2; => better not to go up with jumps

 	whoKeys.mainUpperMesh.position.x =  whoKeys.mainMesh.position.x;
		whoKeys.mainUpperMesh.position.z=  whoKeys.mainMesh.position.z;
	whoKeys.mainUpperMesh.position.y =  whoKeys.mainMesh.position.y+2;

	whoKeys.shieldMesh.position.x =  whoKeys.mainMesh.position.x;
		whoKeys.shieldMesh.position.z=  whoKeys.mainMesh.position.z;
	whoKeys.shieldMesh.position.y =  whoKeys.mainMesh.position.y;
		whoKeys.shieldMesh.scaling = new BABYLON.Vector3(0.1 ,0.1, 0.1);
 
if(whoKeys.mainMesh.position. x < -28.0){whoKeys.mainMesh.position. x=-28.0}
		else if(whoKeys.mainMesh.position. x > 28.0){whoKeys.mainMesh.position. x= 28.0}
 
  
	if(typeof mouseClickLoc!= "undefined"){
	if(mouseClickLoc.x < -28.0){mouseClickLoc.x=-28.0}
		else if(mouseClickLoc.x > 28.0){mouseClickLoc.x= 28.0}
		}
 
 
if(!gameSettings.isAbsolute2D)
{ 
 	if(whoKeys.mainMesh.position. z < -8.0){whoKeys.mainMesh.position. z=-8.0}
		else if(whoKeys.mainMesh.position. z > 2.0){whoKeys.mainMesh.position. z= 2.0} 
 
 	if(typeof mouseClickLoc!= "undefined"){

	if(mouseClickLoc.z < -8.0){mouseClickLoc.z=-8.0}
		else if(mouseClickLoc.z > 2.0){mouseClickLoc.z= 2.0}
		}
		}
else{ //2D settings: 

whoKeys.mainMesh.position.z=0;
 	if(typeof mouseClickLoc!= "undefined"){
mouseClickLoc.z=0;
}
}


if( lclickCount == 0 && (gameSettings.isAbsolute2D &&  whoKeys.front==1 && whoKeys.back ==0  && typeof whoKeys["tmpJump"] == "undefined") )
{
whoKeys.front=0;
whoKeys["tmpJump"]=true;
}
else if( gameSettings.isAbsolute2D && !whoKeys.isjumping && whoKeys.back==1 && (whoKeys.left==1 || whoKeys.right==1 ) && ((whoKeys.left==0 && worldFacing ==1 )|| (whoKeys.right==0 && worldFacing ==0)))
{
whoKeys["tmpCrouchY"] = whoKeys.mainUpperMesh.position.y;
 

//whoKeys.mainUpperMesh.position.y=  whoKeys.mainMesh.position.y+1.2-whoKeys.character.sizeModifier; => weirdly doesn't work always.. that's why using scale atm (see: audioAndVisualsByInput())
}
else if(whoKeys.isjumping || (!whoKeys["canBlockHold"] && typeof whoKeys["tmpCrouchY"] != "undefined" && whoKeys.back!=1 ) )
{
whoKeys.mainUpperMesh.position.y  =whoKeys["tmpCrouchY"] ; 
delete whoKeys["tmpCrouchY"];

if(!whoKeys.isjumping){
whoKeys.left=0;
 whoKeys.right=0;}
 }


if(whoKeys["tmpCrouchY"] && (whoKeys.left==1 && worldFacing !=0 ))
{
delete whoKeys["canBlock"];delete whoKeys["tmpCrouchY"];

}
else if(whoKeys["tmpCrouchY"] && ( whoKeys.right==1 && worldFacing !=1  ))
{
delete whoKeys["canBlock"];
}
if(whoKeys["tmpCrouchY"] && (whoKeys.left==1 && worldFacing ==0 ))
{
whoKeys["canBlock"] =true;

}
else if(whoKeys["tmpCrouchY"] && ( whoKeys.right==1 && worldFacing ==1  ))
{
 whoKeys["canBlock"] =true;

}

else
{
if(typeof whoKeys["canBlock"] != "undefined" && ( !(whoKeys["tmpCrouchY"] ) ||(whoKeys.left!=1 && worldFacing ==0 ) || (whoKeys.right!=1 && worldFacing ==0 )
|| (whoKeys.left!=1 && worldFacing ==1) || ( whoKeys.left==1 && worldFacing ==0  ) )) 
{
delete whoKeys["canBlock"]
}
}
 
/// END 2D settings
}

function jumpCalculatingCheck(whoKeys)
{
 if(whoKeys.character.hangtime > 1)
	 {
	 whoKeys.character.hangtime-=1
	 }
	 else if(   whoKeys.isjumping && whoKeys.character.hangtime ==1   )
	 {
 whoKeys.character.hangtime=0;
setTimeout(function(){  whoKeys.mainMesh.position.y-=2.3+whoKeys.character.movementModifier;  
setTimeout(function(){  whoKeys.mainMesh.position.y-=1.5+whoKeys.character.movementModifier;
	   	whoKeys.shadowMesh.scaling.y= 2.0;
	    	whoKeys.shadowMesh.scaling.x= 0.9;
				    	whoKeys.shadowMesh.scaling.z= 0.9; 

setTimeout(function(){  whoKeys.mainMesh.position.y-=1.7+whoKeys.character.movementModifier;
whoKeys.shadowMesh.scaling.y= 2.5;
	    	whoKeys.shadowMesh.scaling.x= 1;
				    	whoKeys.shadowMesh.scaling.z= 1;
 whoKeys.isjumping=false ;whoKeys.jump=0; 
 
 
 
 }, whoKeys.character.maxHangTime);
  }, whoKeys.character.maxHangTime);

}, whoKeys.character.maxHangTime);


 
 
	 }
	 
}


 var comboCheckCounter=0;
 var comboCheckResetTime=3;
 
  renderLoop = function () {//REF/ https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Building_up_a_basic_demo_with_Babylon.js?utm_campaign
    scene.render();
	 
  
  

 	 keysP1.worldFacing=  calcFacingPosition(keysP1);
 	 keysP2.worldFacing=  calcFacingPosition(keysP2); 
 
positioningLimitsInRoomCheck(keysP1 );
	 positioningLimitsInRoomCheck(keysP2 );

jumpCalculatingCheck(keysP1);
jumpCalculatingCheck(keysP2);

shieldActivateCheck(keysP1 ); // must be before actionsHandler!
shieldActivateCheck(keysP2 ); 


//if(gameSettings.gameMode !=6){// && gameSettings.aiCount <2){
	 
actionsHandler(keysP1);
dotDamageCheck(keysP1); 
//} 

//if(gameSettings.gameMode !=5){// && gameSettings.aiCount <1){
	 
actionsHandler(keysP2); 
dotDamageCheck(keysP2);
//} 

 
/// border level reached:
if (!bordersCheck(boxLeftEnd,boxRightEnd)){

//if(gameSettings.gameMode !=6){
projectileDamageCheck(keysP1); 
stageHeightPositionCheck(keysP1);//} 

physicalLaunchedCheck(keysP1);
audioAndVisualsByInput(keysP1);

 
//if(gameSettings.gameMode !=5){
projectileDamageCheck(keysP2); 
stageHeightPositionCheck(keysP2);//} 

physicalLaunchedCheck(keysP2);
audioAndVisualsByInput(keysP2);


if( gameSettings.aiCount >=1){
periodAiActions();
}

comboCheckCounter+=1;

if(comboCheckResetTime < comboCheckCounter){
//if(gameSettings.gameMode !=6){
comboCheck(keysP1,comboCheckResetTime);
//}
//if(gameSettings.gameMode !=5){
comboCheck(keysP2,comboCheckResetTime);
//}
comboCheckCounter=0;
 }
}
//}

//actionCheckCounter+=1;
};
//engine.renderEvenInBackground = true;   
engine.runRenderLoop(renderLoop);

 window.addEventListener('resize', function(){ engine.resize(); });// => want to keep viewsize
 document.addEventListener('contextmenu', event => event.preventDefault());


}



 
function visualFacing(charX,worldfacing)
{
try{
   if(worldfacing==1 && typeof charX != "undefined"  && typeof charX.material != "undefined" && typeof charX.material.diffuseTexture != "undefined"){charX.material.diffuseTexture.vAng  = 3.14;}
   else    if(worldfacing==0 && typeof charX != "undefined"  && typeof charX.material != "undefined" && typeof charX.material.diffuseTexture != "undefined"){charX.material.diffuseTexture.vAng  = 0;}
}
catch(err){console.log(err); return; }  
}

function setVisualFacing(whoKeys)
{
if((whoKeys.right==1 && !whoKeys.character.isWatchingOpponent) || (typeof whoKeys.hostileKey != "undefined" &&(whoKeys.character.isWatchingOpponent &&whoKeys.mainMesh.position.x <= whoKeys.hostileKey.mainMesh.position.x )) ){
		if(typeof whoKeys.mainMeshVisual != "undefined"){ visualFacing(whoKeys.mainMeshVisual,0);}
				if(typeof whoKeys.attackMeshVisual != "undefined"){ visualFacing(whoKeys.attackMeshVisual,0);}
		if(typeof whoKeys.shieldMeshVisual != "undefined"){  visualFacing(whoKeys.shieldMeshVisual,0);}
		 }
	 else if((whoKeys.left==1 && !whoKeys.character.isWatchingOpponent) ||  (typeof whoKeys.hostileKey != "undefined" &&(whoKeys.character.isWatchingOpponent &&whoKeys.mainMesh.position.x > whoKeys.hostileKey.mainMesh.position.x) ) ){
		if(typeof whoKeys.mainMeshVisual != "undefined"){ visualFacing(whoKeys.mainMeshVisual,1);}
				if(typeof whoKeys.attackMeshVisual != "undefined"){ visualFacing(whoKeys.attackMeshVisual,1);}
		if(typeof whoKeys.shieldMeshVisual != "undefined"){  visualFacing(whoKeys.shieldMeshVisual,1);}
		 }
		
}

function overrideIdleMesh(whoKeys,   tempImageList, timeAsIdle) 
{
if(typeof whoKeys.character.tmpImages == "undefined"&&   !whoKeys.isInvisible){ // prevent overlapping (quick moves in succession
whoKeys.character.tmpImages= whoKeys.character.images.idleImages;
whoKeys.character.tmpImagesMovement= whoKeys.character.images.movementImages;
whoKeys.character.tmpImagesJump= whoKeys.character.images.jumpImages;

  whoKeys.character.images.idleImages =tempImageList;//whoKeys.character.images.pushImages
  whoKeys.character.images.movementImages =tempImageList;
  whoKeys.character.images.jumpImages =tempImageList;

  setTimeout(function(){ 
  whoKeys.character.images.idleImages =whoKeys.character.tmpImages;  
    whoKeys.character.images.movementImages =whoKeys.character.tmpImagesMovement; 
  whoKeys.character.images.jumpImages =whoKeys.character.tmpImagesJump; 
  delete whoKeys.character.tmpImages;delete whoKeys.character.tmpImagesJump; delete whoKeys.character.tmpImagesMovement; 
 }, parseFloat(timeAsIdle));
}
}



 


function backgroundMusicLaunch(soundConv)
{

 	 if(typeof backgroundMusic !== "undefined" || backgroundMusic != null){ 
		 setTimeout(function(){backgroundMusic.stop();  
 setTimeout(function(){backgroundMusic.dispose();  
	setTimeout(function(){ backgroundMusic =  new BABYLON.Sound("backgroundMusic", soundConv, scene, null, { loop: true, autoplay: true,   spatialSound: false  });
	
	backgroundMusic.setVolume(0.2);

 	backgroundMusic.play();	 
	}, 100);}, 5);}, 5);
 }
else{
   backgroundMusic =  new BABYLON.Sound("backgroundMusic", soundConv, scene, null, { loop: true, autoplay: true,   spatialSound: false  });
   	backgroundMusic.setVolume(0.2); 
    		setTimeout(function(){	backgroundMusic.play();	 }, 10);} 
}


var localAudioLimiter=[];
function playOneShot(soundUrl)
{
 
 var isOkToPlay=true;
/*for (var i = 0; i < scene.mainSoundTrack.soundCollection.length; i++) {
  if(scene.mainSoundTrack.soundCollection[i].name ==soundUrl && scene.mainSoundTrack.soundCollection[i].isPlaying)
  {
  isOkToPlay=false;break;
  }
}*/

if(localAudioLimiter.indexOf(soundUrl) < 0 ){
localAudioLimiter.push( soundUrl); // preventing overkill in sound spawning
setTimeout(function(){ localAudioLimiter.shift(); }, 500); 

 
if(isOkToPlay){ // prevent sound echo
BABYLON.Engine.audioEngine.setGlobalVolume(0.3);//https://doc.babylonjs.com/divingDeeper/audio/playingSoundsMusic

 var   sound =  new BABYLON.Sound(soundUrl , soundUrl, scene, null, { loop: false, autoplay: true,   spatialSound: false  });//using id as name. Otherwise => "sound"+ uuidv4()
    		 setTimeout(function(){	sound.play();	 }, 10);  
}
}
}



function alterEffectVisual(whoKeys,target, effect, length)
{
 var worldFacing=  calcFacingPosition(whoKeys);
   return createEffect( 2.5, target,effect , length, worldFacing);  

}


function alterCharacterMainVisual(size,whoKeys,meshImages,frameRate )
{
if(typeof whoKeys["tmpMainVisualGoingOn"+whoKeys.who] == "undefined" && !whoKeys.isInvisible){
whoKeys["tmpMainVisualGoingOn"+whoKeys.who]= whoKeys.who; // preventing overkill in image spawning
setTimeout(function(){ delete whoKeys["tmpMainVisualGoingOn"+whoKeys.who] }, 10); 

 if(whoKeys.currentActiveVisual != meshImages){
 
 whoKeys.currentActiveVisual  = meshImages;
 
  
  if(typeof whoKeys.mainMeshVisual != "undefined"){

 if(typeof whoKeys.mainMeshVisual.material != "undefined"){
 whoKeys.mainMeshVisual.material.dispose();} 
 
 whoKeys.mainMeshVisual.dispose();
 
 whoKeys.mainMeshVisual=null;     
}
  
   whoKeys.mainMeshVisual = createCharacterShape(whoKeys,"p"+whoKeys.who.toString()+"MainVisual",size,meshImages ,true,whoKeys.mainMesh,  whoKeys.mainMesh.position,frameRate);
}
}
}

function showCollisionBoxes()
{  
if(typeof gameSettings== "undefined" || !gameSettings.isShowCollisionBoxes){

  
      keysP1.mainMesh.visibility=0.0;
	  keysP1.mainUpperMesh.visibility=0.0;
  keysP1.shieldMesh.visibility=0.0;
  keysP1.attackMesh.visibility=0.0;

  keysP2.mainMesh.visibility=0.0;
  keysP2.mainUpperMesh.visibility=0.0;
  keysP2.shieldMesh.visibility=0.0;
  keysP2.attackMesh.visibility=0.0;
    boxpC.visibility=0.0;	
}
else if(gameSettings.isShowCollisionBoxes){
     keysP1.mainMesh.visibility=0.7;
	  keysP1.mainUpperMesh.visibility=0.7;
  keysP1.shieldMesh.visibility=0.7;
  keysP1.attackMesh.visibility=0.7;

  keysP2.mainMesh.visibility=0.7;
  keysP2.mainUpperMesh.visibility=0.7;
  keysP2.shieldMesh.visibility=0.7;
  keysP2.attackMesh.visibility=0.7;
    boxpC.visibility=0.7;	

 }
  
 
}
function characterVisuals()
{

//keysP1.character.images.idleImages=["static/assets/char/genjuro/images/idle_frame1.PNG","static/assets/char/genjuro/images/idle_frame2.PNG"];
   keysP1.mainMeshVisual = createCharacterShape(keysP1,"p1MainVisual",6,keysP1.character.images.idleImages,true,keysP1.mainMesh );//startImage
      keysP2.mainMeshVisual = createCharacterShape(keysP2,"p2MainVisual", 6,keysP2.character.images.idleImages,true,keysP2.mainMesh );

  
}









$( document ).ready(function() {
startProject();
 }); 

