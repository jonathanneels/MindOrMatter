function createPlayerShadow(name, whoKeys)
{

var shadowPMesh = BABYLON.MeshBuilder.CreatePlane(name, {width: 5+ whoKeys.character.sizeModifier, height: 1}, scene);//REF:https://www.babylonjs-playground.com/#UES9PH#0
    var mat = new BABYLON.StandardMaterial('', scene);
mat.diffuseTexture = new BABYLON.Texture("static/assets/textures_main/shadow_fighter.png", scene);
mat.diffuseTexture.hasAlpha = true;
mat.useAlphaFromDiffuseTexture = false; 
  mat.backFaceCulling = false;
     mat.emissiveColor = new BABYLON.Color3(1,1,1); 
    shadowPMesh.material = mat;
    shadowPMesh.rotation.x = Math.PI/2;
	shadowPMesh.scaling.y= 2.5;
	return shadowPMesh
}
function createClimableObject(xScale,yScale,zScale,xPos, yPos , zPos, textureSource, isPlaneVisibleInsteadOfBox)
{

// Note this object needs 2 parts, one visible and one hidden. Jumping the real height (in current setup & camera) shows the player somewhat below the surface.
var id=uuidv4();
 const boxFloorHidden = BABYLON.Mesh.CreateBox("boxFloorHidden"+id, 2, scene); 

 boxFloorHidden["isPlaneVisibleInsteadOfBox"]=isPlaneVisibleInsteadOfBox;

//const planeFloorA = BABYLON.Mesh.CreatePlane("planeFloor"+uuidv4(), 2, scene, true, BABYLON.MeshBuilder.DoubleSide);
var mat = new BABYLON.StandardMaterial("matboxFloor", scene);//new BABYLON.StandardMaterial("matplaneFloorA", scene);
mat.diffuseTexture = new BABYLON.Texture( textureSource, scene);
mat.diffuseTexture.hasAlpha = true;
mat.useAlphaFromDiffuseTexture = false; 
  mat.backFaceCulling = false;
     mat.emissiveColor = new BABYLON.Color3(0,0,0); 
 // plane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
 boxFloorHidden.position.z= zPos;
  boxFloorHidden.position.y= yPos; 
    boxFloorHidden.position.x= xPos;  
boxFloorHidden.material = mat;
boxFloorHidden.scaling = new BABYLON.Vector3(xScale,yScale,zScale)
boxFloorHidden.visibility=0.0;

if(!isPlaneVisibleInsteadOfBox){
 const boxFloorVisible = BABYLON.Mesh.CreateBox("boxFloorVisible"+id, 2, scene); 
//const planeFloorA = BABYLON.Mesh.CreatePlane("planeFloor"+uuidv4(), 2, scene, true, BABYLON.MeshBuilder.DoubleSide);
var mat = new BABYLON.StandardMaterial("matboxFloor", scene);//new BABYLON.StandardMaterial("matplaneFloorA", scene);
mat.diffuseTexture = new BABYLON.Texture( textureSource, scene);
mat.diffuseTexture.hasAlpha = true;
mat.useAlphaFromDiffuseTexture = false; 
  mat.backFaceCulling = false;
     mat.emissiveColor = new BABYLON.Color3(0,0,0); 
 // plane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
 boxFloorVisible.position.z= zPos;
     boxFloorVisible.position.x= xPos;  
  boxFloorVisible.position.y= yPos-2; 
boxFloorVisible.material = mat;
boxFloorVisible.scaling = new BABYLON.Vector3(xScale,yScale,zScale)

}else{
const planeFloorA = BABYLON.Mesh.CreatePlane("planeFloor"+id, 2, scene, true, BABYLON.MeshBuilder.DoubleSide);
var mat = new BABYLON.StandardMaterial("matplaneFloorA", scene);
mat.diffuseTexture = new BABYLON.Texture( textureSource, scene);
mat.diffuseTexture.hasAlpha = true;
mat.useAlphaFromDiffuseTexture = false; 
  mat.backFaceCulling = false;
     mat.emissiveColor = new BABYLON.Color3(1,1,1); 
 // plane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
 planeFloorA.position.z= zPos;
  planeFloorA.position.y= yPos-2; 
    planeFloorA.position.x= xPos;  
planeFloorA.material = mat;
planeFloorA.scaling = new BABYLON.Vector3(xScale,yScale,zScale)
}


return  boxFloorHidden;
}
function createCharacterShape(whoKeys,name, size,  textureList,isFixed, fixedObject,  optionalMeshPos,frameRate ) // sizeModifier is applied!
{
		if(typeof frameRate == "undefined")
{
frameRate=50;
}
	   var   charX = new BABYLON.Mesh.CreatePlane(name+uuidv4(), size+whoKeys.character.sizeModifier, scene);
	   
	   if( whoKeys["isOtherActionSizeTinyChange"])
	   {
		   charX.scaling = new BABYLON.Vector3(0.6,0.6,0.6);
	   }
	   
    charX.material = new BABYLON.StandardMaterial("Mat"+uuidv4(), scene);
	if(typeof textureList != "undefined"){
    charX.material.diffuseTexture = new BABYLON.Texture(textureList[0], scene);
	    charX.material.diffuseTexture.hasAlpha = true;

	}
	charX.material.ReflectionTextureEnabled﻿=false;
charX.material.specularColor = new BABYLON.Color3(0, 0, 0);
	if(typeof optionalMeshPos != "undefined")
	{
	    charX.position = optionalMeshPos;

	}
	else
	{
	    charX.position = new BABYLON.Vector3(0, 0, 0);

	}
	
    charX.checkCollisions = false;
	
	var worldfacing=	 calcFacingPosition(whoKeys);

 visualFacing(charX,worldfacing);
 		charX.material.backFaceCulling = false;
		
		if(typeof whoKeys["colorIndex"] =="undefined"   ){
  charX.material.emissiveColor = new BABYLON.Color3(1,1,1);
}
else{
	charX.material.emissiveColor =  BABYLON.Color3.FromHexString(whoKeys.character.colorPalettes[whoKeys["colorIndex"]]);
	
}
	 
	
	 	 var ImgIndex= 0;
	 var currentFrame=0;
	var frameCount= 1;
	if(typeof textureList != "undefined")
	{
		frameCount =textureList.length
		}
   charX.registerBeforeRender(function(){
       if(isFixed){
   charX.position=  (fixedObject.position);
 
 	 }
 
	 if(ImgIndex>=frameRate  && frameCount>1){ 
	 

	 ImgIndex=0;currentFrame+=1;

    charX.material.diffuseTexture = new BABYLON.Texture(textureList[currentFrame], scene);
     charX.material.diffuseTexture.hasAlpha = true;
	 
var Nworldfacing=	 calcFacingPosition(whoKeys);
 visualFacing(charX,Nworldfacing);

			if(currentFrame >=  frameCount-1)
			{
			currentFrame=-1;
			}

	 }

 

ImgIndex+=1;
     });
	 
return  charX;
}

 function createHenchman(name, size,  textureListIdle,textureListRangeAttack,textureListCloseAttack,isFixed, fixedObject,worldfacing, optionalMeshPos, allegianceWho,frameRate )
{
	if(typeof frameRate == "undefined")
{
frameRate=50;
}
	
	   var   charX = new BABYLON.Mesh.CreatePlane(name+uuidv4(), size, scene);
    charX.material = new BABYLON.StandardMaterial("Mat"+uuidv4(), scene);
    charX.material.diffuseTexture = new BABYLON.Texture(textureListIdle[0], scene);
	charX.material.ReflectionTextureEnabled﻿=false;
charX.material.specularColor = new BABYLON.Color3(0, 0, 0);
    charX.material.diffuseTexture.hasAlpha = true;
	if(typeof optionalMeshPos != "undefined")
	{
	    charX.position = optionalMeshPos;

	}
	else
	{
	    charX.position = new BABYLON.Vector3(0, 0, 0);

	}
	
    charX.checkCollisions = false;
	
 visualFacing(charX,worldfacing);
 		charX.material.backFaceCulling = false;
  charX.material.emissiveColor = new BABYLON.Color3(1,1,1);


	 
	
	 	 var ImgIndex= 0;
	 var currentFrame=0;
	var frameCount= textureListIdle.length;
   charX.registerBeforeRender(function(){
       if(isFixed){
   charX.position=  (fixedObject.position);
 	 }
	 if(ImgIndex>=frameRate  && frameCount>1){ 
	 

	 ImgIndex=0;currentFrame+=1;

    charX.material.diffuseTexture = new BABYLON.Texture(textureListIdle[currentFrame], scene);
     charX.material.diffuseTexture.hasAlpha = true;
 visualFacing(charX,worldfacing);

			if(currentFrame >=  frameCount-1)
			{
			currentFrame=-1;
			}

	 }

 

ImgIndex+=1;
     });
	 
return  charX;
}


var projectileList=[];
//3D spell
function create3DProjectile(name,size, x, y,z,textureList, ttl, worldfacing,frameRate, isGoUpToDown)// 60f a sec (3 sec means 3x60= 180 ttl
{

if(typeof frameRate == "undefined")
{
frameRate=10;
}
	
	   var   charX = new BABYLON.Mesh.CreatePlane(name+uuidv4(), size, scene);
    charX.material = new BABYLON.StandardMaterial("Mat"+uuidv4(), scene);
    charX.material.diffuseTexture = new BABYLON.Texture(textureList[0], scene);
	charX.material.ReflectionTextureEnabled﻿=false;
charX.material.specularColor = new BABYLON.Color3(0, 0, 0);
  charX.material.emissiveColor = new BABYLON.Color3(1,1,1);

    charX.material.diffuseTexture.hasAlpha = true;
  		    charX.position.x = x;//player0bj.position.x +1;
		    charX.position.y = y; 
		    charX.position.z =z;// player0bj.position.z-0.2 ;
    charX.checkCollisions = true;
	
 	//charX.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
		charX.material.backFaceCulling = false;

		if(typeof worldfacing ==="undefined" || worldfacing== null || worldfacing != 1){ 
 		charX.worldfacing=0;// 0= facing right, 1= looking at left
} else{charX.worldfacing=1; 
}
 if(charX.worldfacing==1){charX.material.diffuseTexture.vAng  = 3.14;}

	charX.VerticalInt=0;// -1 back (top), 0= standard, 1 front (bottom)
		charX.HorizontalInt=0; // 1 (back) 0 = front
 	 
	 
	 	 	 var ImgIndex= 0;
	 var currentFrame=0;
	var frameCount= textureList.length;

	 var index= 0;
   charX.registerBeforeRender(function(){
   
 
   if(index > ttl){
   frameCount=0;
   charX.material.dispose(); charX.dispose();charX=null;     
 projectileList.shift();// oldest die first
 } else{
  
     if(charX.worldfacing==0 && index <ttl){ 
	 
	 if(isGoUpToDown){
		 		  charX.position.y-=0.14;

	 }
	 else{
 charX.position.x+=0.14;
 }
 }
else if(charX.worldfacing==1 && index <ttl){ 
	 if(isGoUpToDown){
		  charX.position.y-=0.14;

	 }
	 else{

 charX.position.x-=0.14;
 }
 }

 if(index<  ttl && ImgIndex>=frameRate  && frameCount>1){ 
	 

	 ImgIndex=0;currentFrame+=1;

    charX.material.diffuseTexture = new BABYLON.Texture(textureList[currentFrame], scene);
     charX.material.diffuseTexture.hasAlpha = true;

		if(typeof worldfacing ==="undefined" || worldfacing== null || worldfacing != 1){ 
 		charX.worldfacing=0; 
} else{charX.worldfacing=1; 
}
 if(charX.worldfacing==1){charX.material.diffuseTexture.vAng  = 3.14;}

			if(currentFrame >=  frameCount-1)
			{
			currentFrame=-1;
			}

	 }

index+=1;
ImgIndex+=1;

}
     });
	 
	 projectileList.push(charX);
	 
return  charX;
}


function createStandaloneAction(whoKeys,size, x, y,z,textureList, ttl,  frameRate, isNonRepeating)// 60f a sec (3 sec means 3x60= 180 ttl
{

if(typeof whoKeys.tmpStandaloneActionGoingOn == "undefined" && typeof textureList != "undefined" && textureList.length >0){
whoKeys.tmpStandaloneActionGoingOn= whoKeys.who; // preventing overkill in image spawning

setTimeout(function(){ delete whoKeys.tmpStandaloneActionGoingOn }, 300); 

if(typeof frameRate == "undefined")
{
frameRate=10;
}
if(typeof isNonRepeating == "undefined")
{
isNonRepeating=true;
}
	
	   var   charX = new BABYLON.Mesh.CreatePlane("standalone"+uuidv4(), size, scene);
    charX.material = new BABYLON.StandardMaterial("Matstandalone"+uuidv4(), scene);
    charX.material.diffuseTexture = new BABYLON.Texture(textureList[0], scene);
	charX.material.ReflectionTextureEnabled﻿=false;
charX.material.specularColor = new BABYLON.Color3(0, 0, 0);
  charX.material.emissiveColor = new BABYLON.Color3(1,1,1);

    charX.material.diffuseTexture.hasAlpha = true;
  		    charX.position.x = x;//player0bj.position.x +1;
		    charX.position.y = y; 
		    charX.position.z =z;// player0bj.position.z-0.2 ;
    charX.checkCollisions = true;
	
 	//charX.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
		charX.material.backFaceCulling = false;
		var   worldfacing= calcFacingPosition(whoKeys);
 
 if(worldfacing==1){charX.material.diffuseTexture.vAng  = 3.14;}

	charX.VerticalInt=0;// -1 back (top), 0= standard, 1 front (bottom)
		charX.HorizontalInt=0; // 1 (back) 0 = front
 	 
	 
	 	 	 var ImgIndex= 0;
	 var currentFrame=0;
	var frameCount= textureList.length;

	 var index= 0;
   charX.registerBeforeRender(function(){
  
   if(index > ttl){
   frameCount=0;
   charX.material.dispose(); charX.dispose();charX=null;     return; 
  } else if(index<= ttl){
  
   if(worldfacing==0 && index <ttl){ 
 charX.position.x+=0.5;}
else if(worldfacing==1 && index <ttl){ 
 charX.position.x-=0.5;}
 
 if(index<  ttl && ImgIndex>=frameRate  && frameCount>1){ 
	 

	 ImgIndex=0;currentFrame+=1;
worldfacing= calcFacingPosition(whoKeys);
    charX.material.diffuseTexture = new BABYLON.Texture(textureList[currentFrame], scene);
     charX.material.diffuseTexture.hasAlpha = true;
 

 if( worldfacing==1){charX.material.diffuseTexture.vAng  = 3.14;}

			if(currentFrame >=  frameCount-1)
			{
				if(isNonRepeating){
					ttl=0;
					
				}
				else{
			currentFrame=-1;
			}
			}

	 }

index+=1;
ImgIndex+=1;
}
     });
	 
 	 
return  charX;}
return undefined
}

function createEffect( size,mesh,textureList,   ttl, worldfacing, frameRate, isNonRepeating)// 60f a sec (3 sec means 3x60= 180 ttl
{
if(typeof mesh["tmpEffectGoingOn"+mesh.id] == "undefined"){
mesh["tmpEffectGoingOn"+mesh.id]= mesh.id; // preventing overkill in image spawning
setTimeout(function(){ delete mesh["tmpEffectGoingOn"+mesh.id] }, 300); 

if(typeof frameRate == "undefined")
{
frameRate=50;
}

if(typeof isNonRepeating == "undefined")
{
isNonRepeating=true;
}

 	
	   var   charX = new BABYLON.Mesh.CreatePlane("effect"+uuidv4(),size, scene);
    charX.material = new BABYLON.StandardMaterial("Mat"+uuidv4(), scene);
    charX.material.diffuseTexture = new BABYLON.Texture(textureList[0], scene);
	charX.material.ReflectionTextureEnabled﻿=false;
charX.material.specularColor = new BABYLON.Color3(0, 0, 0);

    charX.material.diffuseTexture.hasAlpha = true;
  		    charX.position.x = mesh.position.x;//player0bj.position.x +1;
		    charX.position.y = mesh.position.y; 
		    charX.position.z =mesh.position.z-1;// player0bj.position.z-0.2 ;
    charX.checkCollisions = false;
	
 	//charX.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
		charX.material.backFaceCulling = false;
   charX.material.emissiveColor = new BABYLON.Color3(1,1,1);

 visualFacing(charX,worldfacing);
 
 	 	 	 var ImgIndex= 0;
	 var currentFrame=0;
	var frameCount= textureList.length;

	 var index= 0;
   charX.registerBeforeRender(function(){
  if(index > ttl){
  frameCount=0;
  charX.material.dispose(); charX.dispose();charX=null;     
  }
  else if (index <= ttl){
 //  else   if(index >= ttl/2){ charX.material.diffuseTexture.visibility=0.3;}
   // else   if(index >= ttl/5){ charX.material.diffuseTexture.visibility=0.6;}
 

if((index <  ttl) &&ImgIndex>=frameRate && frameCount>1){ 
	 

	 ImgIndex=0;currentFrame+=1;

    charX.material.diffuseTexture = new BABYLON.Texture(textureList[currentFrame], scene);
     charX.material.diffuseTexture.hasAlpha = true;
 visualFacing(charX,worldfacing);

			if(currentFrame >=  frameCount-1)
			{
				if(isNonRepeating)
				{
					ttl=0;
				}
				else{
			currentFrame=-1;
			}
			}

	 }
	 
index+=1;
ImgIndex+=1;
}
     });
	 

	 
return  charX;}
return undefined
}
function setEmissiveColorMainMesh(whoKeys)
{
for (var k = 0; k < scene.meshes.length; k++) {
	
		if( scene.meshes[k].name.startsWith("p"+whoKeys.who.toString()+"MainVisual")){

	if(typeof whoKeys["colorIndex"] =="undefined"  ){ whoKeys["colorIndex"]=0; }
	else 	if(  whoKeys["colorIndex"] == whoKeys.character.colorPalettes.length-1 ){delete whoKeys["colorIndex"] ;   scene.meshes[k].material.emissiveColor = new BABYLON.Color3(1,1,1);continue;}
	else {whoKeys["colorIndex"] = whoKeys["colorIndex"] +1}
	
 
	if(typeof whoKeys.hostileKey["colorIndex"] != "undefined" && whoKeys["colorIndex"] == whoKeys.hostileKey["colorIndex"]   
	&& gameSettings["whoCharIndexKeysP1"] == gameSettings["whoCharIndexKeysP2"]) // prevent identical same characters => if both are random, same color not possible (-1 as index). Alter maybe?
	{
		setEmissiveColorMainMesh(whoKeys);
		
		return;
	}else{
 
    scene.meshes[k].material.emissiveColor =  BABYLON.Color3.FromHexString(whoKeys.character.colorPalettes[whoKeys["colorIndex"]]);//"#dfb121");
	return;
	}
}
}


	
}

function setEmissiveColorBackground(backgroundMesh)
{
 	
 
	if(typeof document["colorIndex"] =="undefined"  ){ document["colorIndex"]=0; }
	else 	if(  document["colorIndex"] == gameSettings.stage.colorPalettes.length-1 ){delete document["colorIndex"] ;   backgroundMesh.material.emissiveColor = new BABYLON.Color3(1,1,1);return;}
	else {document["colorIndex"] = document["colorIndex"] +1}
	
 
    backgroundMesh.material.emissiveColor =  BABYLON.Color3.FromHexString(gameSettings.stage.colorPalettes[document["colorIndex"]]);//"#dfb121");
 

	
}

