 function aiBehaviour(whoKeys)
{
whoKeys.left=0;	whoKeys.right=0; whoKeys.jump=0;

if( (gameSettings.aiInteractionFrequency > 30 || whoKeys.character.energy < 20)&& getRandomInt(0,15) ==15 ){ // keeping movement dynamic, few horizontal stops
whoKeys.front=0;	whoKeys.back=0; return;
}
if(typeof boxFloorA != "undefined" && whoKeys["connectedFloor"] && getRandomInt(0,10) ==10)
 {
	 delete  whoKeys["connectedFloor"];
	 var tmpMax= whoKeys.maxHangTime ;
 whoKeys.maxHangTime = 0; // good way to alter jump in heights
 setTimeout(function(){  
 whoKeys.maxHangTime =tmpMax; whoKeys.hangtime =0;

 if(whoKeys["isOtherActionSizeTinyChange"])
{
 whoKeys.mainMesh.position.y -=  2-( boxFloorA.position.y);

}else{
 whoKeys.mainMesh.position.y =  (7-boxFloorA.position.y);
 }
 }, 10); 
 }
 
 if (  (  (whoKeys.hostileKey["showComboStarter"] || whoKeys.hostileKey["STUNNED"] && getRandomInt(0,55) >(0+gameSettings.aiInteractionFrequency)  ) || (whoKeys.isStunned  && getRandomInt(0,gameSettings.aiInteractionFrequency) ==2  )) && !gameSettings.isEndgame){whoKeys.unique=1;}// not with (!whoKeys.isStunned || !whoKeys.isDown), they'll be doing silly things...



if(!whoKeys.isStunned && !gameSettings.isEndgame){

//if(whoKeys.character.isCanJump){whoKeys.jump=1;}

// prevent hitting walls
	if(whoKeys.mainMesh.position. x < -26.0){whoKeys.right=1; whoKeys.left=0; /*whoKeys.mainMesh.position. x=-26.0*/  }
		else if(whoKeys.mainMesh.position. x > 26.0){whoKeys.left=1;whoKeys.right=0;  /*whoKeys.mainMesh.position. x= 26.0*/}
 	 else if(whoKeys.textBox.text.indexOf("Projectile") >-1) // block projectiles
	{
		var worldfacing=	 calcFacingPosition(whoKeys);
		if(worldfacing==1){whoKeys.left=0;whoKeys.right=1;}
		else if(worldfacing==0){whoKeys.left=1; whoKeys.right=0;}
 		return;
	}
if(!whoKeys.isDown && !whoKeys.isPacified && !gameSettings.isEndgame)
{
	 
	
	if(whoKeys.character.actionList.rangeActionA>-1&& getRandomInt(0,2) !=2 &&  (whoKeys.character.energy > 20 || !whoKeys.character.isWithEnergy)  &&Math.abs(Math.abs(whoKeys.hostileKey.mainMesh.position.x) - Math.abs(whoKeys.mainMesh.position.x))> 4&&Math.abs(Math.abs(whoKeys.hostileKey.mainMesh.position.x) - Math.abs(whoKeys.mainMesh.position.x))<10)
	{
		whoKeys.movementhistory.push("///")
		
setTimeout(function(){  
		whoKeys.kick=1;
		whoKeys.unique=1;
 
		}, 200);
	}
	
	else{
		
////////////////////// SPECIAL HANDLING
		if(!whoKeys.isDown &&  getRandomInt(0,2) ==2 && whoKeys.character.actionList.otherActionA == 3 &&typeof  whoKeys["isOtherActionSizeTinyChange"] =="undefined" )
		{
						whoKeys.kick=1;//otherActionsList(3, whoKeys);
			
		}
		else 	if(!whoKeys.isDown &&  getRandomInt(0,2) ==2 && whoKeys.character.actionList.otherActionA == 2 && !whoKeys.isInvisible)
		{
			otherActionsList(2, whoKeys);
			
		}
		else 	if(!whoKeys.isDown &&  getRandomInt(0,2) ==2 && whoKeys.character.actionList.otherActionA == 4  && whoKeys.hostileKey.mainMesh.position. x < 20.0 && whoKeys.hostileKey.mainMesh.position. x > -20.0 )
		{
			whoKeys.kick=1
 			
		}
		else if( getRandomInt(0,7) ==7){

			if(gameSettings.aiCount <2){
			whoKeys.jump=1;}
			else  if(gameSettings.aiCount >1 && getRandomInt(0,10) ==10){// ai vs ai, would be a jumpfest.
			whoKeys.jump=1;}

			
			}

////////////////////////////////////////////////////////

	if( whoKeys.character.energy >20 &&  getRandomInt(0,2) ==2)
{
	whoKeys.verticalhit=1;
}




if( whoKeys.character.energy < 20 || getRandomInt(0,2) ==2)//if(( whoKeys.character.energy < 20 && !gameSettings.isEndgameWithWalls  ) || ( whoKeys.character.energy > 30 && gameSettings.isEndgameWithWalls && getRandomInt(0,2) ==2 ) || (!gameSettings.isEndgameWithWalls && getRandomInt(0,2) ==2 ) )
{

var distanceKeepingCalc = 5;
 if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  distanceKeepingCalc = 3;
  }
if(whoKeys.character.isCanGoHorizontal && Math.floor(whoKeys.mainMesh.position.x) <  Math.floor(whoKeys.hostileKey.mainMesh.position.x) +distanceKeepingCalc)
{
	  whoKeys.right=1;   
 
} else if(whoKeys.character.isCanGoHorizontal && Math.floor(whoKeys.mainMesh.position.x) > Math.floor(whoKeys.hostileKey.mainMesh.position.x) -distanceKeepingCalc)
{
	 
whoKeys.left=1; 
}
//whoKeys.kick=1; //advanced action

}

else{
	var distanceKeepingCalc = 2;
 if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  distanceKeepingCalc = 0.5;
  }
  
  if(getRandomInt(0,2) ==2 && whoKeys.character.isCanGoHorizontal && Math.floor(whoKeys.mainMesh.position.x+ distanceKeepingCalc) < Math.floor(whoKeys.hostileKey.mainMesh.position.x)  )
{
  	  whoKeys.rangehit=1;
}
else if(whoKeys.character.isCanGoHorizontal && Math.floor(whoKeys.mainMesh.position.x+ distanceKeepingCalc) < Math.floor(whoKeys.hostileKey.mainMesh.position.x)  )
{
whoKeys.right=1;	

  if( !whoKeys.isDown && whoKeys.character.energy >30 &&  getRandomInt(0,2) ==2)
{
	whoKeys.verticalhit=1;
}

} else if(  whoKeys.character.isCanGoHorizontal && Math.floor(whoKeys.mainMesh.position.x- distanceKeepingCalc) >  Math.floor(whoKeys.hostileKey.mainMesh.position.x)   )
{
whoKeys.left=1;  

 if( !whoKeys.isDown &&  whoKeys.character.energy >30 &&  getRandomInt(0,2) ==2)
{
	whoKeys.verticalhit=1;
}
	
}

if(whoKeys.character.isCanGoVertical && Math.floor(whoKeys.mainMesh.position.z) <  Math.floor(whoKeys.hostileKey.mainMesh.position.z) )
{
whoKeys.front=1;	 

if(!whoKeys.isDown && whoKeys.character.energy >40 &&  getRandomInt(0,2) ==2)
{
 whoKeys.horizontalhit=1;	

}

}else if(whoKeys.character.isCanGoVertical && Math.floor(whoKeys.mainMesh.position.z) >  Math.floor(whoKeys.hostileKey.mainMesh.position.z) )
{
whoKeys.back=1;	
if( !whoKeys.isDown && whoKeys.character.energy >40 &&  getRandomInt(0,2) ==2)
{
 whoKeys.horizontalhit=1;	
}
}

if( !whoKeys.isDown &&  whoKeys.character.energy >40 &&  getRandomInt(0,2) ==2)
{
 whoKeys.horizontalhit=1;	
}

}
}

 }
 else	 if(whoKeys.isDown && !whoKeys.isPacified && (!gameSettings.isEndgame || (typeof document["demoMode"] != "undefined" && document["demoMode"] == true)) )
{
			
if(getRandomInt(0,2) ==2){	whoKeys.jump=1;}

 
}
}
}


var aiInteractCounter=0;
var aiHaltCounter=0;
function periodAiActions()
{
	
	
if(gameSettings.aiCount >0)
{
aiInteractCounter+=1;
aiHaltCounter+=1;

if(gameSettings.aiInteractionFrequency <= aiInteractCounter){

aiInteractCounter=0;

if(gameSettings.aiCount >=1)

{


aiBehaviour(keysP2)

}

if(gameSettings.aiCount ==2)

{
aiBehaviour(keysP1)
}
}
else

{

 if( aiHaltCounter >=10 &&  (Math.floor(keysP1.mainMesh.position.x) != Math.floor(keysP2.mainMesh.position.x) && Math.floor(keysP1.mainMesh.position.z) == Math.floor(keysP2.mainMesh.position.z)))
{
aiHaltCounter=0;
if(gameSettings.aiCount >=1)

{
  	// limit adhd movement	
		keysP2.left=0;	keysP2.right=0;
keysP2.front=0;	keysP2.back=0;

}
if(gameSettings.aiCount ==2)

{
// limit adhd movement
 		keysP1.left=0;	keysP1.right=0;
keysP1.front=0;	keysP1.back=0;


}
}
}

	}
}