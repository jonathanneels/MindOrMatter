function attackBoxPosition(whoMesh)
{

if(!whoMesh.isStunned){
if(whoMesh.character.isWatchingOpponent){
if(whoMesh.mainMesh.position.x < whoMesh.hostileKey.mainMesh.position.x){
	
				if(whoMesh["isOtherActionSizeTinyChange"]){whoMesh.attackMesh.position.x =  whoMesh.mainMesh.position.x+0.3;}
				else{		whoMesh.attackMesh.position.x =  whoMesh.mainMesh.position.x+1.5;	}
		}
		else{
			if(whoMesh["isOtherActionSizeTinyChange"]){whoMesh.attackMesh.position.x =  whoMesh.mainMesh.position.x-0.3;}
			else {			whoMesh.attackMesh.position.x =  whoMesh.mainMesh.position.x-1.5;}	
		}

/*	boxp2Attack.position.x =  boxp2.position.x-1.5
		boxp2Attack.position.z=  boxp2.position.z
	boxp2Attack.position.y =  boxp2.position.y;*/

}

else{

if(whoMesh["isOtherActionSizeTinyChange"]){
	if(whoMesh.right==1){whoMesh.attackMesh.position.x =  whoMesh.mainMesh.position.x+0.3;}
else if(whoMesh.left==1){whoMesh.attackMesh.position.x =  whoMesh.mainMesh.position.x-0.3;}

}	else{	
if(whoMesh.right==1){whoMesh.attackMesh.position.x =  whoMesh.mainMesh.position.x+1.5;}
else if(whoMesh.left==1){whoMesh.attackMesh.position.x =  whoMesh.mainMesh.position.x-1.5;}
}

}


		whoMesh.attackMesh.position.z=  whoMesh.mainMesh.position.z
	whoMesh.attackMesh.position.y =  whoMesh.mainMesh.position.y
}
}

function checkForStunInjection(whoKeys)
{
	
	 if(whoKeys["nextHitCausesStun"])
	  {
		  whoKeys.ScoreAttackPoints +=300*(whoKeys.comboCount+1);

		  whoKeys.hostileKey.isStunned=true;
		  delete whoKeys["nextHitCausesStun"]; whoKeys.hostileKey["STUNNED"]=true;
		  whoKeys.hostileKey.textBox.text =  ("STUNNED");clearTimeout(whoKeys.hostileKey.textBoxTimeout);
whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  "";  }, 250);
 setTimeout(function(){   
 
 whoKeys.hostileKey.isStunned=false; 
 		 delete whoKeys.hostileKey["STUNNED"];


 
 }, 2500); 
	  }
}
//////////////////////////////////////////////////////////MOVES///////////////////////////////////////////////////////////////////////////////
function specialActionsList(id, whoKeys)
{ 
if(whoKeys.isInvisible){whoKeys.isInvisible=false;}

var isOktoShowVisual= true;
switch(id) {
  case 0:
  if(  ((whoKeys.character.special > (whoKeys.character.maxSpecial/4)) || !whoKeys.character.isWithSpecial  ) && (whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)|| whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh))){
whoKeys.character.special=0; //checkForStunInjection(whoKeys); => special is not a just hit attack, so Thane cannot use stun here.
 whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount   =0; whoKeys.hostileKey.dothealth= whoKeys.character.dotHealthTime; whoKeys.hostileKey.textBox.text =  ("Body drain");clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 500);
  }
  else {
  isOktoShowVisual= false;
  }
  
    break;
  case 1:
    if( (  (whoKeys.character.energy > (whoKeys.character.maxEnergy/4)) || !whoKeys.character.isWithEnergy  ) &&(whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)|| whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh))){

whoKeys.character.energy=whoKeys.character.energy/2; //checkForStunInjection(whoKeys); => special is not a just hit attack, so Thane cannot use stun here.
 whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount   =0; whoKeys.hostileKey.dotenergy= whoKeys.character.dotEnergyTime; whoKeys.hostileKey.textBox.text =  ("Mind drain");clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 500);
}
else {
  isOktoShowVisual= false;
  }
    break;
	
  case 2:
      if(  ((whoKeys.character.energy > (whoKeys.character.maxEnergy/4)) || !whoKeys.character.isWithEnergy  )&&(whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh) || whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh))){

 whoKeys.character.energy=whoKeys.character.energy/2; //checkForStunInjection(whoKeys); => special is not a just hit attack, so Thane cannot use stun here.

 whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount   =0; whoKeys.hostileKey.dotspecial= whoKeys.character.dotSpecialTime; whoKeys.hostileKey.textBox.text =  ("Soul drain");clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 500);
   }
   else {
  isOktoShowVisual= false;
  }
    break;
	case 3:
	      if( whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)|| whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh)){

whoKeys.character.special=0;  //checkForStunInjection(whoKeys); => special is not a just hit attack, so Thane cannot use stun here.
 whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  =0; 
 var hostileHealth=whoKeys.hostileKey.character.health;
  var myHealth=whoKeys.character.health;
whoKeys.character.health=hostileHealth;
whoKeys.hostileKey.character.health=myHealth;
  whoKeys.textBox.text =  ("Twist faith - STUNNED");
  whoKeys.isStunned=true; 
  whoKeys.isDown=false;
whoKeys["STUNNED"]=true;

 clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){   whoKeys.textBox.text =  ""; }, 500);
      setTimeout(function(){   whoKeys.isStunned=false; delete whoKeys["STUNNED"]; }, 1500);
   alterEffectVisual(whoKeys,whoKeys.hostileKey.mainMesh,whoKeys.character.images.hittedEffectImages , 15); 
   overrideIdleMesh(whoKeys.hostileKey,whoKeys.hostileKey.character.images.painImages,whoKeys.hostileKey.character.launchingTime*10);
}
else {
  isOktoShowVisual= false;
  }
 	break;
	
  default:
  break;
  
 }
return isOktoShowVisual;
}

function physicalActionsList(id, whoKeys)
{ 
if(whoKeys.isInvisible){whoKeys.isInvisible=false;}

var isOktoShowVisual= true;

 if( typeof whoKeys.hostileKey["isReversalPose"]=="undefined"  ){
switch(id) {
  case 0: // simple vertical hit with down status
  
  if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.1,0.5,1.5);

  }
  else
  {
	     whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.1 ,1, 3)// cut on x-axis

  }

  attackBoxPosition(whoKeys);
  
    setTimeout(function(){ 
  if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh)  ) {
	  checkForStunInjection(whoKeys);
	  	    whoKeys.hostileKey["showComboStarter"]=true;
			whoKeys.hostileKey.isDown=false;

whoKeys.hostileKey.character.launchedRemainTime=whoKeys.character.launchingTime; whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1;
whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +4;whoKeys.character.special=0; 
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=4+ whoKeys.character.damageModifier ;}     
whoKeys.hostileKey.textBox.text =  ("CRITICAL!");clearTimeout(whoKeys.hostileKey.textBoxTimeout);
whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; },300);
	  
}	
 else if(  whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh) && !whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.attackMesh) ){
	 
	 checkForStunInjection(whoKeys);
	 	    whoKeys.hostileKey["showComboStarter"]=true;
			whoKeys.hostileKey.isDown=false;

whoKeys.hostileKey.character.launchedRemainTime=whoKeys.character.launchingTime; whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +6;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=6+ whoKeys.character.damageModifier ;} whoKeys.ScoreAttackPoints +=400*(whoKeys.comboCount+1); whoKeys.hostileKey.textBox.text =  ("FLESH RIPPED!");clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 300);
 
 
}
else if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)   ) {
	
	checkForStunInjection(whoKeys);
		  	    whoKeys.hostileKey["showComboStarter"]=true;
				whoKeys.hostileKey.isDown=false;

whoKeys.hostileKey.character.launchedRemainTime=whoKeys.character.launchingTime; whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +2;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){ whoKeys.character.health+=2+ whoKeys.character.damageModifier ; }
whoKeys.hostileKey.textBox.text =  ("Awsh!");clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 300);
   
 }  
 }, 50);

    break;
  case 1: // horizontal 'kick' away
   if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(1.5,1,0.1);

  }
  else
  {
 whoKeys.attackMesh.scaling = new BABYLON.Vector3(3 ,2, 0.1)
  }
  
   if(whoKeys.character.energy >=10 && (whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh) || whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh))){
	whoKeys.hostileKey.isDown=true;

  whoKeys.character.energy-=10;checkForStunInjection(whoKeys);
 setTimeout(function(){ 

if(whoKeys.mainMesh.position.x >= whoKeys.hostileKey.mainMesh.position.x){
whoKeys.hostileKey.mainMesh.position.x -=1 ;whoKeys.hostileKey.mainMesh.position.y +=2 ;
setTimeout(function(){
whoKeys.hostileKey.mainMesh.position.x -=3 ;whoKeys.hostileKey.mainMesh.position.y -=3 ;
if(whoKeys.hostileKey.mainMesh.position.y <0)
{
whoKeys.hostileKey.mainMesh.position.y=0;
} 
}, 50);}
else if(whoKeys.hostileKey.mainMesh.position.x >=whoKeys.mainMesh.position.x){whoKeys.hostileKey.mainMesh.position.x +=1 ;whoKeys.hostileKey.mainMesh.position.y +=2 ;
setTimeout(function(){
whoKeys.hostileKey.mainMesh.position.x +=3 ;whoKeys.hostileKey.mainMesh.position.y -=3 ;
if(whoKeys.hostileKey.mainMesh.position.y <0)
{
whoKeys.hostileKey.mainMesh.position.y=0;
} 
}, 50);}
whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +2;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=2+ whoKeys.character.damageModifier ;} 
whoKeys.hostileKey.textBox.text =  ("Uppercutted!");
clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 200);
}, 50);

}
    break;
	
  case 2: //  vertical 'kick' away
  
    if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.5,1,1.5);

  }
  else
  {
 whoKeys.attackMesh.scaling = new BABYLON.Vector3(1 ,2, 3);
  }


  if(whoKeys.character.energy >=10 && (whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh) || whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh))){
	whoKeys.hostileKey.isDown=true; checkForStunInjection(whoKeys);
 setTimeout(function(){ 
  whoKeys.character.energy-=10; 

 if(whoKeys.mainMesh.position.z >= whoKeys.hostileKey.mainMesh.position.z){
whoKeys.hostileKey.mainMesh.position.z -=1 ;whoKeys.hostileKey.mainMesh.position.y +=2 ;
setTimeout(function(){
whoKeys.hostileKey.mainMesh.position.z -=1 ;whoKeys.hostileKey.mainMesh.position.y -=2 ;
if(whoKeys.hostileKey.mainMesh.position.y <0)
{
whoKeys.hostileKey.mainMesh.position.y=0;
} 
}, 50);
}
else if(whoKeys.hostileKey.mainMesh.position.z >=whoKeys.mainMesh.position.z){
whoKeys.hostileKey.mainMesh.position.z +=1 ;whoKeys.hostileKey.mainMesh.position.y +=2 ;
setTimeout(function(){ 
whoKeys.hostileKey.mainMesh.position.z +=1 ;whoKeys.hostileKey.mainMesh.position.y -=2 ;
if(whoKeys.hostileKey.mainMesh.position.y <0)
{
whoKeys.hostileKey.mainMesh.position.y=0;
} 
}, 50);}
whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +2;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=2+ whoKeys.character.damageModifier ;} 
whoKeys.hostileKey.textBox.text =  ("Tackle!");
clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 300);
}, 50);

}
    break;
	
 
 	case 3:// simple horizontal pummel (combo gainer)
	
 
if(whoKeys.mainMesh.position.x < whoKeys.hostileKey.mainMesh.position.x){
whoKeys.israngeActive=false; attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
whoKeys.attackMesh.position.x += 2.5+whoKeys.character.movementModifier;
setTimeout(function(){  attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
whoKeys.attackMesh.position.x += 2.5+whoKeys.character.movementModifier;
setTimeout(function(){  attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
whoKeys.attackMesh.position.x += 2.5+whoKeys.character.movementModifier;
setTimeout(function(){ attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
whoKeys.attackMesh.position.x += 2.5+whoKeys.character.movementModifier;
setTimeout(function(){ 
whoKeys.attackMesh.position.x -= 10; attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);

}, 100);

}, 150);

}, 150);

}, 150);
}
else {

whoKeys.israngeActive=false; attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
whoKeys.attackMesh.position.x -= 2.5+whoKeys.character.movementModifier;
setTimeout(function(){  attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
whoKeys.attackMesh.position.x -= 2.5+whoKeys.character.movementModifier;
setTimeout(function(){  attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
whoKeys.attackMesh.position.x -= 2.5+whoKeys.character.movementModifier;
setTimeout(function(){ attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
whoKeys.attackMesh.position.x -= 2.5+whoKeys.character.movementModifier;
setTimeout(function(){ 
whoKeys.attackMesh.position.x += 10; attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);

}, 100);

}, 150);

}, 150);

}, 150);

}
 

	
	break;
	
	case 4: // simple vertical pummel (combo gainer)
	
 
 whoKeys.israngeActive=false;
whoKeys.attackMesh.position.y += 2.5+whoKeys.character.movementModifier;
setTimeout(function(){ attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
whoKeys.attackMesh.position.y += 2.5+whoKeys.character.movementModifier;
setTimeout(function(){  attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
whoKeys.attackMesh.position.y += 2.5+whoKeys.character.movementModifier;
setTimeout(function(){attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
whoKeys.attackMesh.position.y += 2.5+whoKeys.character.movementModifier;
setTimeout(function(){
whoKeys.attackMesh.position.y -= 10; attackBoxPosition(whoKeys);physicalActionsList(0, whoKeys);
 
}, 100);

}, 150);

}, 150);

}, 150);
  
	break;
	case 5: // overhead uppercut (land on other side)
	  if(whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh) || whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh)){

whoKeys.hostileKey["showBlood"]=true;

	 	  //	physicalActionsList(1,whoKeys);
 
	whoKeys.hostileKey.mainMesh.position.y  =whoKeys.hostileKey.mainMesh.position.y+2.5; 
	var worldfacing=	 calcFacingPosition(whoKeys.hostileKey);
	console.log(worldfacing);
	
		if(worldfacing ==0){
			
						whoKeys.hostileKey.mainMesh.position.x   =whoKeys.mainMesh.position.x+4; 

		}
		else if(worldfacing ==1){
			whoKeys.hostileKey.mainMesh.position.x=whoKeys.mainMesh.position.x  - 4; 
			
		}

	 	whoKeys.hostileKey.mainMesh.position.z  =whoKeys.mainMesh.position.z; 
 	//whoKeys.hostileKey.mainMesh.position.x  =whoKeys.mainMesh.position.x; 

		whoKeys.hostileKey.isDown=true; checkForStunInjection(whoKeys);

 	whoKeys.hostileKey.mainMesh.position.y =whoKeys.hostileKey.mainMesh.position.y+4; 
 		
whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +2;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=2+ whoKeys.character.damageModifier ;} 

//whoKeys.hostileKey["previousPositionY"]=whoKeys.hostileKey.mainMesh.position.y;
setTimeout(function(){ 
	whoKeys.hostileKey.mainMesh.position.y  =whoKeys.hostileKey.mainMesh.position.y/2; 
setTimeout(function(){ 
	whoKeys.hostileKey.mainMesh.position.y =0; 

		}, whoKeys.character.launchingTime*4 );
		}, whoKeys.character.launchingTime*4 );

 
 }
		break;
		case 6:  // simple horizontal hit with down status
		
		   if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(1.5 ,0.5, 0.1)

  }
  else
  {
   whoKeys.attackMesh.scaling = new BABYLON.Vector3(3 ,1, 0.1)// cut on x-axis
  }
  attackBoxPosition(whoKeys);
  
  setTimeout(function(){  // needs some time to reposition the box 
  if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh)  ) {
	  
	  checkForStunInjection(whoKeys);
	    whoKeys.hostileKey["showComboStarter"]=true;
		whoKeys.hostileKey.isDown=false;
		
whoKeys.hostileKey.character.launchedRemainTime=whoKeys.character.launchingTime; whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1;
whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +4;whoKeys.character.special=0; 
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=4+ whoKeys.character.damageModifier ;}     
whoKeys.hostileKey.textBox.text =  ("CRITICAL!");clearTimeout(whoKeys.hostileKey.textBoxTimeout);
whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 300);
	  
}	
 else if(  whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh) && !whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.attackMesh) ){
	 
	 checkForStunInjection(whoKeys);
	 	    whoKeys.hostileKey["showComboStarter"]=true;
			whoKeys.hostileKey.isDown=false;

whoKeys.hostileKey.character.launchedRemainTime=whoKeys.character.launchingTime; whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +6;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=6+ whoKeys.character.damageModifier ;}whoKeys.ScoreAttackPoints +=400*(whoKeys.comboCount+1);  whoKeys.hostileKey.textBox.text =  ("FLESH RIPPED!");clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 300);
 
 
}
else if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)   ) {
	
	checkForStunInjection(whoKeys);
		  	    whoKeys.hostileKey["showComboStarter"]=true;
				whoKeys.hostileKey.isDown=false;

whoKeys.hostileKey.character.launchedRemainTime=whoKeys.character.launchingTime; whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +2;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){ whoKeys.character.health+=2+ whoKeys.character.damageModifier ; }
whoKeys.hostileKey.textBox.text =  ("Awsh!");clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 300);
   
 }  
 }, 50);
    break;
		break;
	case 7:// uppercut straight up
	 if(whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh) || whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh)){

	 //	  	physicalActionsList(1,whoKeys);
 
 checkForStunInjection(whoKeys);
 whoKeys.hostileKey["showBlood"]=true;
 
	whoKeys.hostileKey.mainMesh.position.y  =whoKeys.hostileKey.mainMesh.position.y+3.5; 
	 

  
		whoKeys.hostileKey.isDown=true;

 	 	setTimeout(function(){ 
		whoKeys.hostileKey.mainMesh.position.y =whoKeys.hostileKey.mainMesh.position.y+5.5;
		
whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +2;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=2+ whoKeys.character.damageModifier ;} 

//whoKeys.hostileKey["previousPositionY"]=whoKeys.hostileKey.mainMesh.position.y;
setTimeout(function(){ 
	whoKeys.hostileKey.mainMesh.position.y  =whoKeys.hostileKey.mainMesh.position.y/2; 
setTimeout(function(){ 
	whoKeys.hostileKey.mainMesh.position.y =0; 

		}, whoKeys.character.launchingTime*4 );
		}, whoKeys.character.launchingTime*4 );

		}, 150);

 }
		break;
case 8:
// simple vertical hit with NO down status
  
  		   if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.1 ,0.5, 1.5);

  }
  else
  {
   whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.1 ,1, 3)// cut on x-axis
  }
  
  attackBoxPosition(whoKeys);
  
    setTimeout(function(){ 
  if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh)  ) {
	  checkForStunInjection(whoKeys);
	  whoKeys.hostileKey["showBloodUpper"]=true;
 whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1;
whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +4;whoKeys.character.special=0; 
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=4+ whoKeys.character.damageModifier ;}      
	  
}	
 
else if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)   ) {
	checkForStunInjection(whoKeys);
	whoKeys.hostileKey["showBlood"]=true;
 whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +2;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){ whoKeys.character.health+=2+ whoKeys.character.damageModifier ; } 
   
 }  
 }, 50);
break;
case 9: // simple horizontal hit with NO down status
		
				   if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(1.5,0.5,0.1);

  }
  else
  {
   whoKeys.attackMesh.scaling = new BABYLON.Vector3(3 ,1, 0.1)// cut on x-axis
  }
  attackBoxPosition(whoKeys);
  
  setTimeout(function(){  // needs some time to reposition the box 
  if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh)  ) {
	  checkForStunInjection(whoKeys);
	  whoKeys.hostileKey["showBloodUpper"]=true;
whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1;
whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +4;whoKeys.character.special=0; 
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=4+ whoKeys.character.damageModifier ;}     
 
	  
}	
 
else if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)   ) {
	checkForStunInjection(whoKeys);
	whoKeys.hostileKey["showBlood"]=true;
whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +2;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){ whoKeys.character.health+=2+ whoKeys.character.damageModifier ; } 
   
 }  
 }, 50);
break;
case 10: // horizontal - low hit
			   if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.9,0.1,0.1);

  }
  else
  {
   whoKeys.attackMesh.scaling = new BABYLON.Vector3(1.5 ,0.1, 0.1)// cut on x-axis
  }
    attackBoxPosition(whoKeys);
	  setTimeout(function(){  // needs some time to reposition the box 

 if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh)  ||  whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)  ) {
	 checkForStunInjection(whoKeys);
	  whoKeys.hostileKey["showCritical"]=true;
whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1;
whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +8;whoKeys.character.special=0; 
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=8+ whoKeys.character.damageModifier ;}   
  
 whoKeys.hostileKey.isDown=true;
	  
	  whoKeys.hostileKey.character.launchedRemainTime=1;
}
 }, 50);

break;
case 11: // vertical low hit
			   if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.1,0.1,0.9);

  }
  else
  {
   whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.1,0.1, 1.5)// cut on x-axis
  }
    attackBoxPosition(whoKeys);
	  setTimeout(function(){  // needs some time to reposition the box 

 if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh)  ||  whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)  ) {
	 checkForStunInjection(whoKeys);
	  whoKeys.hostileKey["showCriticalUpper"]=true;
whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1;
whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +8;whoKeys.character.special=0; 
if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=8+ whoKeys.character.damageModifier ;}   
  
 whoKeys.hostileKey.isDown=true;
	  
	  whoKeys.hostileKey.character.launchedRemainTime=1;
}
 }, 50);
break;
case 12: // fake faint
setTimeout(function(){
	if(!whoKeys.isDown){
whoKeys.isDown=true;}
else{whoKeys.isDown=false;}
 }, 250);

break;
case 13: // horizontal move kick and displacement 'push'

			   if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(1.2,0.1,0.1);

  }
  else
  {
   whoKeys.attackMesh.scaling = new BABYLON.Vector3(1.9 ,0.1, 0.1) 
  }

 setTimeout(function(){ 
 
	 var iHitsMatch=false;
	 	var worldfacing=	 calcFacingPosition(whoKeys.hostileKey);

		if(worldfacing ==0){
	 whoKeys.mainMesh.position.x -= 2.5;
 		 } 
		 else 		if(worldfacing ==1){
			 	 whoKeys.mainMesh.position.x += 2.5;
 		 } 
	
			
			  if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh)  ) { 
			  iHitsMatch=true;
				  whoKeys.hostileKey["showBloodUpper"]=true;
				  whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +6;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){ whoKeys.character.health+=6+ whoKeys.character.damageModifier ; } 

				  }
			  else   if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)  ) { 
			  iHitsMatch=true;
				  whoKeys.hostileKey["showBlood"]=true;
				  whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +4;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){ whoKeys.character.health+=4+ whoKeys.character.damageModifier ; } 

			  }
	
	 if(iHitsMatch){
 
		if(worldfacing ==0){
 	 	 whoKeys.hostileKey.mainMesh.position.x -= 3.5;
		 } 
		 else 		if(worldfacing ==1){
 	 	 whoKeys.hostileKey.mainMesh.position.x += 3.5;
		 } 

		 	checkForStunInjection(whoKeys);}


	 
	  
 }, 50);
break;
case 14:
 // vertical move 'kick' and displacement 'push'

			   if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.1,0.1,1.2);

  }
  else
  {
   whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.1 ,0.1,1.9) 
  }

 setTimeout(function(){ 
 
	 var isMatch=false;
	 	 	var worldfacing=	 calcFacingPosition(whoKeys.hostileKey);
	if(worldfacing ==0){
	 whoKeys.mainMesh.position.x -= 2.5;
 		 } 
		 else 		if(worldfacing ==1){
			 	 whoKeys.mainMesh.position.x += 2.5;
 		 } 
	
			
			  if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainUpperMesh)  ) { 
			  isMatch=true;
				  whoKeys.hostileKey["showBloodUpper"]=true;
				  whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +6;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){ whoKeys.character.health+=6+ whoKeys.character.damageModifier ; } 

				  }
			  else   if (   whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)  ) { 
			  isMatch=true;
				  whoKeys.hostileKey["showBlood"]=true;
				  whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1; whoKeys.hostileKey.character.health-=whoKeys.character.special+ whoKeys.character.damageModifier +4;whoKeys.character.special=0;
if(whoKeys.character.isWithHealthRestore){ whoKeys.character.health+=4+ whoKeys.character.damageModifier ; } 

			  }
	
	 if(isMatch){

		if(worldfacing ==0){
 	 	 whoKeys.hostileKey.mainMesh.position.x -= 3.5;
		 } 
		 else 		if(worldfacing ==1){
 	 	 whoKeys.hostileKey.mainMesh.position.x += 3.5;
		 } 


 if(whoKeys.mainMesh.position.z >= whoKeys.hostileKey.mainMesh.position.z){
whoKeys.hostileKey.mainMesh.position.z -=1.5 ; 
 }
else if(whoKeys.hostileKey.mainMesh.position.z >=whoKeys.mainMesh.position.z){
whoKeys.hostileKey.mainMesh.position.z +=1.5 ; 
 }
		 	checkForStunInjection(whoKeys);
			
			}


	 
	  
 }, 50);
break;
case 15: // jump kick horizontal
whoKeys.jump=1;
physicalActionsList(13,whoKeys);
break;
case 16:  // jump kick vertical
whoKeys.jump=1;
physicalActionsList(14,whoKeys);

break;

  default:
  break;
  
 }
 }
 return isOktoShowVisual;

}

function RangeActionsList(id, whoKeys)
{

if(whoKeys.isInvisible){whoKeys.isInvisible=false;}

var isOktoShowVisual=true;

attackBoxPosition(whoKeys.hostileKey);
attackBoxPosition(whoKeys);
setTimeout(function(){   // delay to calculate the attackboxPos

switch(id) {
  case 0:
if(    whoKeys.attackMesh.position.x >= whoKeys.mainMesh.position.x    ){ 
 

 whoKeys.isStunned=true;  
 
setTimeout(function(){     whoKeys.isStunned=false;  },600);

	  create3DProjectile("hit", 2.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x+1.5,  whoKeys.attackMesh.position.y-0.5, whoKeys.attackMesh.position.z ,whoKeys.character.images.projectileImages,whoKeys.character.projectileRange,0);
}
else if(    whoKeys.attackMesh.position.x < whoKeys.mainMesh.position.x ){

    // whoKeys.kick=0;
whoKeys.isStunned=true;  
  
setTimeout(function(){whoKeys.isStunned=false;      },600);
create3DProjectile("hit", 2.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x-1.5,  whoKeys.attackMesh.position.y-0.5, whoKeys.attackMesh.position.z ,whoKeys.character.images.projectileImages ,whoKeys.character.projectileRange,1);

 }
    break;
  case 1:
 
 
 if(whoKeys.isInvisible){whoKeys.isInvisible=false;}

var isOktoShowVisual=true;

attackBoxPosition(whoKeys.hostileKey);
attackBoxPosition(whoKeys);

 if(    whoKeys.attackMesh.position.x >= whoKeys.mainMesh.position.x    ){ 
 

 whoKeys.isStunned=true;  
 
setTimeout(function(){     whoKeys.isStunned=false;  },600);

	  create3DProjectile("hit", 7.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x+4.5,  whoKeys.attackMesh.position.y+4.5, whoKeys.attackMesh.position.z ,whoKeys.character.images.projectileImages,whoKeys.character.projectileRange/2,0,10,true);
}
else if(    whoKeys.attackMesh.position.x < whoKeys.mainMesh.position.x ){

    // whoKeys.kick=0;
whoKeys.isStunned=true;  
  
setTimeout(function(){whoKeys.isStunned=false;      },600);
create3DProjectile("hit", 7.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x-4.5,  whoKeys.attackMesh.position.y+4.5, whoKeys.attackMesh.position.z ,whoKeys.character.images.projectileImages ,whoKeys.character.projectileRange/2,1,10,true);

 }
    break;
	
  case 2:

    break;
	
  default:
  break;
  
 }
}, 100);

 return isOktoShowVisual;

}

function grabActionsList(id, whoKeys)
{  
if(whoKeys.isInvisible){whoKeys.isInvisible=false;}

var isOktoShowVisual=true;

switch(id) {
  case 0: // push away

if(whoKeys.shieldMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)){
	checkForStunInjection(whoKeys);
	 whoKeys.kick=0;

if(whoKeys.mainMesh.position.x < whoKeys.hostileKey.mainMesh.position.x)
{
whoKeys.hostileKey.mainMesh.position.x +=3;
}
else{
whoKeys.hostileKey.mainMesh.position.x -=3;

}
 				whoKeys.hostileKey.character.energy-=30;

whoKeys.hostileKey.textBox.text =  ("Pushed!");clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 500);

 whoKeys.back=0; whoKeys.front=0; whoKeys.right=0; whoKeys.left=0;

}

else {
 whoKeys.back=0; whoKeys.front=0; whoKeys.right=0; whoKeys.left=0;
isOktoShowVisual=false;
whoKeys.textBox.text =  ("Push failed!");clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){ whoKeys.textBox.text =  ""; }, 500);


} 

// whoKeys.isStunned=true;     whoKeys["STUNNED"]=true;
//setTimeout(function(){ delete whoKeys["STUNNED"];    whoKeys.isStunned=false;  },600);

    break;
  case 1: // classic grab (to other side).
  
 whoKeys.rangehit=0;//important here!

 if(whoKeys["isOtherActionSizeTinyChange"])
  {
	  	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.6,0.6,0.6);

  }
  
  
if((whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh) || whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.attackMesh))){//whoKeys.shieldMesh.intersectsMesh(whoKeys.hostileKey.mainMesh) &&

checkForStunInjection(whoKeys);
var newPosP1 = whoKeys.hostileKey.mainMesh.position.x;
var newPosP2 = whoKeys.mainMesh.position.x;

whoKeys.hostileKey.mainMesh.position.x = newPosP2;
whoKeys.mainMesh.position.x = newPosP1;

 
if(whoKeys.worldFacing ==1)
{
whoKeys.mainMesh.position.x -=1.5+whoKeys.character.sizeModifier;
whoKeys.hostileKey.mainMesh.position.x +=1.5+whoKeys.hostileKey.character.sizeModifier;

}
else //if(whoKeys.hostileKey.mainMesh.position.x >  whoKeys.mainMesh.position.x)
{
whoKeys.mainMesh.position.x +=1.5+whoKeys.character.sizeModifier;
whoKeys.hostileKey.mainMesh.position.x -=1.5+whoKeys.hostileKey.character.sizeModifier;

}
		whoKeys.unique=0;
		whoKeys.character.energy-=10;
		whoKeys.hostileKey.character.energy-=20;

whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1;whoKeys.hostileKey.character.health-=whoKeys.character.special+14;whoKeys.character.special=0; if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=14;}     
whoKeys.hostileKey.textBox.text =  ("Thrown!");clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 500);
// high dps, because other valuse work with repeated attack.
whoKeys.ScoreAttackPoints +=100*(whoKeys.comboCount+1);
}
else {
 whoKeys.back=0; whoKeys.front=0; whoKeys.right=0; whoKeys.left=0;
	  whoKeys.textBox.text =  ("Throw failed!");clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){ whoKeys.textBox.text =  ""; }, 500);

}

attackBoxPosition(whoKeys.hostileKey);
attackBoxPosition(whoKeys);


    break;
	
  case 2:
 if((whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.mainMesh) || whoKeys.attackMesh.intersectsMesh(whoKeys.hostileKey.attackMesh))){
	 		whoKeys.character.energy-=10;

  
 if(whoKeys.worldFacing ==1)
{
 whoKeys.hostileKey.mainMesh.position.x  =whoKeys.mainMesh.position.x -6.5+whoKeys.hostileKey.character.sizeModifier;

}
else //if(whoKeys.hostileKey.mainMesh.position.x >  whoKeys.mainMesh.position.x)
{
 whoKeys.hostileKey.mainMesh.position.x  =whoKeys.mainMesh.position.x +6.5+whoKeys.hostileKey.character.sizeModifier;

}
  whoKeys.hostileKey.textBox.text =  ("STUNNED & THROWN!");
  whoKeys.hostileKey.isStunned=true;
  whoKeys.hostileKey.isDown=false; 
  whoKeys.hostileKey["STUNNED"]=true;
  
 clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){   whoKeys.hostileKey.textBox.text =  ""; }, 500);
      setTimeout(function(){   whoKeys.hostileKey.isStunned=false;  delete whoKeys.hostileKey["STUNNED"];}, 1500);
whoKeys.ScoreAttackPoints +=100*(whoKeys.comboCount+1);

 }
 else
{
	  whoKeys.textBox.text =  ("Throw failed!");clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){ whoKeys.textBox.text =  ""; }, 500);

}
    break;
	
	case 3:
	if(whoKeys.shieldMesh.intersectsMesh(whoKeys.hostileKey.mainMesh)){
	whoKeys.hostileKey.comboCount  =0;whoKeys.comboCount  +=1;whoKeys.hostileKey.character.health-=whoKeys.character.special+14;whoKeys.character.special=0; if(whoKeys.character.isWithHealthRestore){whoKeys.character.health+=14;}     
	grabActionsList(0, whoKeys);
  whoKeys.hostileKey.textBox.text =  ("Headbutted!");clearTimeout(whoKeys.hostileKey.textBoxTimeout);whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  ""; }, 500);

whoKeys.ScoreAttackPoints +=100*(whoKeys.comboCount+1);

}
else
{
	  whoKeys.textBox.text =  ("Headbut failed!");clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){ whoKeys.textBox.text =  ""; }, 500);

}
	break;
	case 4:
	break;
  default:
  break;
  
 }

 return isOktoShowVisual;

}

function otherActionsList(id, whoKeys)
{  

if(whoKeys.isInvisible){whoKeys.isInvisible=false;}

var isOktoShowVisual=true;

switch(id) {
	case -1: // break free!
	if(!gameSettings.isEndgame){
		
		checkForStunInjection(whoKeys); // might give too much of an advantage?
		
		if( whoKeys.character.health  >= -99)
	{
 			var prizeOfFreedom=parseFloat(whoKeys.character.health -((whoKeys.character.maxHealth*50)/100));  
	whoKeys.character.health = prizeOfFreedom;
	}
	else if( whoKeys.character.health  >= -110)
	{
 			var prizeOfFreedom=30;//parseFloat(whoKeys.character.health -((whoKeys.character.maxHealth*50)/100));  
	whoKeys.character.health =whoKeys.character.health- prizeOfFreedom;
	}
	 else if( whoKeys.character.health  >= -130)
	{
 			var prizeOfFreedom=10;//parseFloat(whoKeys.character.health -((whoKeys.character.maxHealth*50)/100));  
	whoKeys.character.health =whoKeys.character.health- prizeOfFreedom;
	}
	else
	{
		  whoKeys.textBox.text =  ("Can't BREAK FREE.");
  clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){   whoKeys.textBox.text =  ""; }, 500);
	
		return;
	}
	whoKeys.isStunned=false;
	  		 delete whoKeys["STUNNED"]; 
	whoKeys.isDown=false;
	whoKeys.jump=1;
	whoKeys.ScoreAttackPoints +=300*(whoKeys.comboCount+1);



	  whoKeys.textBox.text =  ("Broke FREE!");
  clearTimeout(whoKeys.textBoxTimeout);whoKeys.textBoxTimeout= setTimeout(function(){   whoKeys.textBox.text =  ""; }, 500);
  
  if( Math.abs(   (whoKeys.mainMesh.position.x)- (whoKeys.hostileKey.mainMesh.position.x) )< 5 ){
	  	whoKeys.hostileKey.isDown=true;

  	var worldfacing=	 calcFacingPosition(whoKeys.hostileKey);
 		if(worldfacing ==0    ){
			
						whoKeys.hostileKey.mainMesh.position.x   =whoKeys.hostileKey.mainMesh.position.x-4; 

		}
		else if(worldfacing ==1){
			whoKeys.hostileKey.mainMesh.position.x=whoKeys.hostileKey.mainMesh.position.x  + 4; 
			
		}
		}
	}
	break;
  case 0: // load special while holding button
whoKeys.character.special+=0.01;

    break;
  case 1: // counter incoming attacks
   if (whoKeys.hostileKey.character.isAllowStun && !whoKeys.hostileKey.isStunned && ( whoKeys.hostileKey.attackMesh.intersectsMesh(whoKeys.attackMesh) || whoKeys.hostileKey.attackMesh.intersectsMesh(whoKeys.mainMesh)) 
  && (isInputAHitInArray( whoKeys.hostileKey.movementhistory, ["K"],true,["-"," ","***" ],true, whoKeys.worldFacing) ||  isInputAHitInArray( whoKeys.hostileKey.movementhistory, ["V"],true,["-"," ","***" ],true, whoKeys.worldFacing) 
  || isInputAHitInArray( whoKeys.hostileKey.movementhistory, ["U"],true,["-"," ","***" ],true, whoKeys.worldFacing)  || isInputAHitInArray( whoKeys.hostileKey.movementhistory, ["H"],true,["-"," ","***" ],true, whoKeys.worldFacing) 
  ||isInputAHitInArray( whoKeys.hostileKey.movementhistory, ["P"],true,["-"," ","***" ],true, whoKeys.worldFacing))) 
 {
 whoKeys.hostileKey.movementhistory.push("---");
 

whoKeys.hostileKey.isStunned=true; 
  whoKeys.hostileKey.isDown=false; 
whoKeys.hostileKey["STUNNED"]=true;
whoKeys.ScoreAttackPoints +=300*(whoKeys.comboCount+1);

setTimeout(function(){
	
whoKeys.hostileKey.textBox.text =  ("STUNNED");clearTimeout(whoKeys.hostileKey.textBoxTimeout);
whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  "";  }, 2500);
 setTimeout(function(){   
 
 whoKeys.hostileKey.isStunned=false; 
  		delete whoKeys["isReversalPose"];
		whoKeys.kick=0;
		 delete whoKeys.hostileKey["STUNNED"]; 
 }, 2500); 
 }, 200);
 }
 else if (typeof whoKeys["isReversalPose"] == "undefined")/* && !(whoKeys.hostileKey.character.isAllowStun && !whoKeys.hostileKey.isStunned && ( whoKeys.hostileKey.attackMesh.intersectsMesh(whoKeys.attackMesh) || whoKeys.hostileKey.attackMesh.intersectsMesh(whoKeys.mainMesh)) 
  && (isInputAHitInArray( whoKeys.hostileKey.movementhistory, ["K"],true,["-"," ","***" ],true, whoKeys.worldFacing) ||  isInputAHitInArray( whoKeys.hostileKey.movementhistory, ["V"],true,["-"," ","***" ],true, whoKeys.worldFacing) 
  || isInputAHitInArray( whoKeys.hostileKey.movementhistory, ["U"],true,["-"," ","***" ],true, whoKeys.worldFacing)  || isInputAHitInArray( whoKeys.hostileKey.movementhistory, ["H"],true,["-"," ","***" ],true, whoKeys.worldFacing) 
  ||isInputAHitInArray( whoKeys.hostileKey.movementhistory, ["P"],true,["-"," ","***" ],true, whoKeys.worldFacing))) )*/
 {
  whoKeys["isReversalPose"]= true;

 }
    break;
	  case 2: // invisible
	  	    whoKeys.kick=0;

	  if(whoKeys.isInvisible){whoKeys.isInvisible=false;}
	else{  alterCharacterMainVisual(6, whoKeys,  "",5);whoKeys.isInvisible=true; }

     break;
	 case 3: // make yourself small
	 	  	    
setTimeout(function(){whoKeys.kick=0;},200); // time to show other visual

	 if(typeof  whoKeys["isOtherActionSizeTinyChange"]!= "undefined")
	 {
		 delete whoKeys["isOtherActionSizeTinyChange"];
		 //  delete whoKeys["connectedFloor"];
		 	 whoKeys.mainMesh.scaling = new BABYLON.Vector3(1,1,1);
	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(1,1,1);
	   	 whoKeys.shieldMesh.scaling = new BABYLON.Vector3(1,1,1);
	 	   whoKeys.mainUpperMesh.scaling = new BABYLON.Vector3(1,1,1);
		   whoKeys.shadowMesh.scaling  = new BABYLON.Vector3(1,1,1);
 whoKeys.mainMesh.position.y = whoKeys.mainMesh.position.y +0.6

 
	 }
	 else{
	 whoKeys["isOtherActionSizeTinyChange"]=true;
 // delete whoKeys["connectedFloor"];
	 whoKeys.mainMesh.scaling = new BABYLON.Vector3(0.6,0.6,0.6);
	   	 whoKeys.attackMesh.scaling = new BABYLON.Vector3(0.6,0.6,0.6);
	   	 whoKeys.shieldMesh.scaling = new BABYLON.Vector3(0.6,0.6,0.6);
	 	   whoKeys.mainUpperMesh.scaling = new BABYLON.Vector3(0.6,0.6,0.6);// IMPORTANT TO KEEP POSITION MESH WHERE IT IS! (otherwise no damage from top possible in 2D)
		   whoKeys.shadowMesh.scaling  = new BABYLON.Vector3(0.6,0.6,0.6);
		// whoKeys.mainMeshVisual.scaling  = new BABYLON.Vector3(0.3,0.3,0.3); => alter in createCharacterShape()!
	
	 whoKeys.mainMesh.position.y = whoKeys.mainMesh.position.y -0.6;
whoKeys.ScoreAttackPoints +=200*(whoKeys.comboCount+1);

	

}
 	 break;
	  case 4: // teleport
	  
	//  if(whoKeys["respawnSickness"]){
	//	  			whoKeys.textBox.text =  ("Can't ambush. Respawn Sickness.");clearTimeout(whoKeys.textBoxTimeout);
//whoKeys.textBoxTimeout= setTimeout(function(){ whoKeys.textBox.text =  "";  }, 500);

		  
	  //}
	//  else 
		if(typeof whoKeys["timeToHoldBeforeCastOtherAction3"] == "undefined")
		{
			whoKeys["timeToHoldBeforeCastOtherAction3"]=0
		}
		else
		{
			whoKeys["timeToHoldBeforeCastOtherAction3"]+=1;
			if(typeof whoKeys["TIMEOUTTimeToHoldBeforeCastOtherAction3"] == "undefined"){
		whoKeys["TIMEOUTTimeToHoldBeforeCastOtherAction3"] =	setTimeout(function(){ delete whoKeys["timeToHoldBeforeCastOtherAction3"]; delete whoKeys["TIMEOUTTimeToHoldBeforeCastOtherAction3"]; }, 500);
				}
		}
		
 		if(whoKeys["timeToHoldBeforeCastOtherAction3"] >= 3){
		 whoKeys.ScoreAttackPoints +=500*(whoKeys.comboCount+1);

		delete whoKeys["timeToHoldBeforeCastOtherAction3"] ;
		 delete whoKeys["TIMEOUTTimeToHoldBeforeCastOtherAction3"];
		 
	  var worldfacing=	 calcFacingPosition(whoKeys);
	  
 	//	if( Math.abs(   (whoKeys.mainMesh.position.x)- (whoKeys.hostileKey.mainMesh.position.x) ) > 12){//8 ){//< 5 ){
			
 	  		if(worldfacing ==0){
			
			whoKeys.mainMesh.position.x=whoKeys.hostileKey.mainMesh.position.x +4;//+ 8; 			
			if(whoKeys.mainMesh.position.z <= whoKeys.hostileKey.mainMesh.position.z){		whoKeys.mainMesh.position.z=  whoKeys.hostileKey.mainMesh.position.z+2; }
			else 	  {whoKeys.mainMesh.position.z= whoKeys.hostileKey.mainMesh.position.z   -2; 		}

		}
		else if(worldfacing ==1){
			whoKeys.mainMesh.position.x=whoKeys.hostileKey.mainMesh.position.x  -4;// 8; 		
			if(whoKeys.mainMesh.position.z <= whoKeys.hostileKey.mainMesh.position.z){		whoKeys.mainMesh.position.z= whoKeys.hostileKey.mainMesh.position.z+ 2; }
			else 	 {whoKeys.mainMesh.position.z=   whoKeys.hostileKey.mainMesh.position.z -2; 		}

 			whoKeys.hostileKey.textBox.text =  ("Ambushed!");clearTimeout(whoKeys.hostileKey.textBoxTimeout);
whoKeys.hostileKey.textBoxTimeout= setTimeout(function(){ whoKeys.hostileKey.textBox.text =  "";  }, 500); 

 		 
	  }
	  }
break;	 
	  case 5:
	  
	  whoKeys["nextHitCausesStun"]=true;
	   			whoKeys.textBox.text =  ("Next hit = STUN!");clearTimeout(whoKeys.textBoxTimeout);
whoKeys.textBoxTimeout= setTimeout(function(){ whoKeys.textBox.text =  "";  }, 500); 

break;	  
 	  case 6:
break;	  

  default:
  break;
  
 }
 
  return isOktoShowVisual;

}

////////////////////////////////////////////// MOVE EXECUTION//////////////////////////////////////////////////////////////////////////////////////////////////////
 function actionsHandler(whoKeys)
{

		setVisualFacing(whoKeys);
		
		if( typeof whoKeys.hostileKey["isReversalPose"]!="undefined"  ){
  		delete whoKeys["isReversalPose"];
		}

if(!whoKeys.isStunned){ 



  if((whoKeys["tmpJump"] || whoKeys.jump==1 )&& !whoKeys.isjumping && whoKeys.character.hangtime <1 )
{   

if(whoKeys["isOtherActionSizeTinyChange"])
{ // undo shrink
	otherActionsList(3, whoKeys);
 }

whoKeys.isjumping=true; 	  	  playOneShot(whoKeys.character.sounds.jumpSound); whoKeys.character.hangtime =whoKeys.character.maxHangTime;
 resetComboBuildUp(whoKeys);

if(whoKeys.isDown && !gameSettings.isEndgame)
{
whoKeys.isDown=false;
}

 if(typeof whoKeys["canBlockHold"]){delete keysP1["tmpCrouchY"];delete keysP1["canBlockHold"]; }
if(typeof whoKeys["tmpJump"] != "undefined"){whoKeys["tmpJump"]=false; setTimeout(function(){ delete whoKeys["tmpJump"];}, 800);}
 if(typeof whoKeys.character.tmpImages == "undefined"){
alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.jumpImages);}

 whoKeys.mainMesh.position.y+=2.3+whoKeys.character.movementModifier;
 	 setTimeout(function(){ whoKeys.mainMesh.position.y+=1.5+whoKeys.character.movementModifier;
	   	whoKeys.shadowMesh.scaling.y= 2.0;
	    	whoKeys.shadowMesh.scaling.x= 0.9;
				    	whoKeys.shadowMesh.scaling.z= 0.9;

setTimeout(function(){ whoKeys.mainMesh.position.y+=1.7+whoKeys.character.movementModifier;  
	   	whoKeys.shadowMesh.scaling.y= 1.5;
	    	whoKeys.shadowMesh.scaling.x= 0.7;
				    	whoKeys.shadowMesh.scaling.z= 0.7; 

if(typeof whoKeys["tmpDblJumpAllowed"] == "undefined"){
 					setTimeout(function(){
	whoKeys["tmpDblJumpAllowed"]=true;
}, 200);
}
}, whoKeys.character.maxHangTime);

 }, whoKeys.character.maxHangTime);
 

 
}
else if(whoKeys.character.isCanDoDoubleJump  && whoKeys["tmpDblJumpAllowed"] && typeof  whoKeys["tmpDblJump"] == "undefined" && (  whoKeys.jump==1 )&&  whoKeys.isjumping && whoKeys.character.hangtime >=1 )
{   
if(whoKeys["isOtherActionSizeTinyChange"])
{ // undo shrink
	otherActionsList(3, whoKeys);
 
}
whoKeys.character.hangtime+=10;

whoKeys["tmpDblJump"] =true; 
whoKeys.mainMesh.position.y+=2.5+whoKeys.character.movementModifier;
	if(whoKeys["isOtherActionSizeTinyChange"])
 {
	 	whoKeys.shadowMesh.scaling.y= 0.8;
	    	whoKeys.shadowMesh.scaling.x= 0.2;
				    	whoKeys.shadowMesh.scaling.z= 0.6;
 }
 else{
	  	   	whoKeys.shadowMesh.scaling.y= 1.0;
	    	whoKeys.shadowMesh.scaling.x= 0.4;
				    	whoKeys.shadowMesh.scaling.z= 0.4;
						}

setTimeout(function(){
	
	whoKeys.mainMesh.position.y-=2.5+whoKeys.character.movementModifier;
	
	if(whoKeys["isOtherActionSizeTinyChange"])
 {
	 whoKeys.shadowMesh.scaling.y= 1.2;
	    	whoKeys.shadowMesh.scaling.x= 0.3;
				    	whoKeys.shadowMesh.scaling.z= 0.8;
 }
 else{
	  	   	whoKeys.shadowMesh.scaling.y= 1.5;
	    	whoKeys.shadowMesh.scaling.x= 0.5;
				    	whoKeys.shadowMesh.scaling.z= 0.5;
						}

}, 200);


}

if(whoKeys["tmpDblJump"] != "undefined" && !whoKeys.isjumping)
{
delete whoKeys["tmpDblJump"] ;	
delete whoKeys["tmpDblJumpAllowed"];
}

if(!whoKeys["canBlock"] && whoKeys.left==1)
{  
if(whoKeys.character.isCanDash && whoKeys.movementhistory.length > 1 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] == "-" && whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "L")
{ 
whoKeys.movementhistory.push("<L");   resetComboBuildUp(whoKeys,100);// quick restore kick button

   
whoKeys.mainMesh.position.x-=2.5+whoKeys.character.movementModifier; 

 
}
else{
whoKeys.movementhistory.push("L");   resetComboBuildUp(whoKeys);

whoKeys.mainMesh.position.x-=0.1+whoKeys.character.movementModifier;  

 
} 

}
if(!whoKeys["canBlock"] && whoKeys.right==1)
{  
if( whoKeys.character.isCanDash && whoKeys.movementhistory.length > 1 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] == "-" && whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "R")
{ 
whoKeys.movementhistory.push("R>");   resetComboBuildUp(whoKeys,100);// quick restore kick button


whoKeys.mainMesh.position.x+=2.5+whoKeys.character.movementModifier;  
 
 
}
else{
whoKeys.movementhistory.push("R");   resetComboBuildUp(whoKeys);

whoKeys.mainMesh.position.x+=0.1+whoKeys.character.movementModifier; 

 

}	
}	

if(whoKeys.front==1)
{  
if(whoKeys.character.isCanDash && whoKeys.movementhistory.length > 1 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] == "-" && whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "F")
{ 
whoKeys.movementhistory.push("F^");  resetComboBuildUp(whoKeys,100);// quick restore kick button

 
whoKeys.mainMesh.position.z+=2.5+whoKeys.character.movementModifier; 
 
}
else{
whoKeys.movementhistory.push("F");  resetComboBuildUp(whoKeys);

whoKeys.mainMesh.position.z+=0.1+whoKeys.character.movementModifier;  
 

}
}
if(whoKeys.back==1)
{  
if(whoKeys.character.isCanDash && whoKeys.movementhistory.length > 1 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] == "-" && whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "B")
{ 
whoKeys.movementhistory.push("Bv");  resetComboBuildUp(whoKeys,100);// quick restore kick button

whoKeys.mainMesh.position.z-=2.5+whoKeys.character.movementModifier;  
  

}
else{
whoKeys.movementhistory.push("B");  resetComboBuildUp(whoKeys);

whoKeys.mainMesh.position.z-=0.1+whoKeys.character.movementModifier;   
 

}
}

if(whoKeys.rangehit==1 )//&&!whoKeys.israngeActive)
{   
whoKeys.movementhistory.push("P");// p for projectile  
 resetComboBuildUp(whoKeys);

 whoKeys.rangehit=0;

whoKeys.israngeActive=true;
   setTimeout(function(){whoKeys.israngeActive=false;}, 200); 

 }
if(!whoKeys["canBlock"] && whoKeys.character.energy >= 10 && whoKeys.verticalhit==1 )//&&!whoKeys.isverticalhitactive && !whoKeys.ishorizontalhitactive)
{  
whoKeys.movementhistory.push("V");  resetComboBuildUp(whoKeys);

whoKeys.character.energy-=10;

whoKeys.isverticalhitactive=true;
if(!whoKeys.israngeActive){
 attackBoxPosition(whoKeys);
}
whoKeys.verticalhit=0;
   setTimeout(function(){whoKeys.isverticalhitactive=false;}, 200); 

 }
 
 if(!whoKeys["canBlock"] && whoKeys.character.energy >= 20 && whoKeys.horizontalhit==1)// &&!whoKeys.isverticalhitactive && !whoKeys.ishorizontalhitactive)
{  
whoKeys.movementhistory.push("H");  resetComboBuildUp(whoKeys);

whoKeys.character.energy-=20;
whoKeys.ishorizontalhitactive=true;
if(!whoKeys.israngeActive){
 attackBoxPosition(whoKeys);
}

whoKeys.horizontalhit=0;
 setTimeout(function(){whoKeys.ishorizontalhitactive=false;}, 200); 

 
 }
 
   if(!whoKeys["canBlock"] && whoKeys.character.energy >= 1&& !whoKeys.iskickactive && whoKeys.kick==1)// &&!whoKeys.isverticalhitactive && !whoKeys.ishorizontalhitactive)
{  
whoKeys.iskickactive=true;
whoKeys.movementhistory.push("K");   resetComboBuildUp(whoKeys);

whoKeys.character.energy-=1;
 //whoKeys.kick=0;=> different than other buttons. Hold is not possible if =0 set here.

 setTimeout(function(){whoKeys.iskickactive=false;}, 200); 

 }
 
 
 if(!whoKeys["canBlock"] &&  !whoKeys.isuniqueactive && whoKeys.character.energy >= 30 && whoKeys.unique==1 )//&& !whoKeys.isverticalhitactive && !whoKeys.ishorizontalhitactive &&!whoKeys.israngeActive)
{  
whoKeys.character.energy-=30;
whoKeys.isuniqueactive=true; 
whoKeys.unique=0;

 setTimeout(function(){whoKeys.isuniqueactive=false;}, 200); 

whoKeys.movementhistory.push("U");  resetComboBuildUp(whoKeys);

 
if(whoKeys.movementhistory.length > 2 && whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "H")
{ 

 var posTocheck=whoKeys.mainMesh.position.x;
var nPos =  (whoKeys.attackMesh.position.x)+5;
if(posTocheck >=whoKeys.hostileKey.mainMesh.position.x){nPos = posTocheck-5; }

whoKeys.mainMesh.position.x = nPos;  


}

if(whoKeys.movementhistory.length > 2 && whoKeys.movementhistory[whoKeys.movementhistory.length-2] == "V")
{ 
  var posTocheck=whoKeys.mainMesh.position.z;
var nPos =  (whoKeys.mainMesh.position.z)+5;

if(posTocheck<=whoKeys.hostileKey.mainMesh.position.z){nPos =   posTocheck-5; } 
 whoKeys.mainMesh.position.z = nPos; 


}
//whoKeys.unique=0;
  attackBoxPosition(whoKeys);
 }
 
 if(!whoKeys.ishorizontalhitactive&&!whoKeys.isverticalhitactive &&!whoKeys.israngeActive)
 {
  attackBoxPosition(whoKeys);

 }
 } else if(whoKeys.character.isCanBreakFree &&   (whoKeys.isStunned || isDown) && whoKeys.unique==1){  
	whoKeys.unique=0;whoKeys.isuniqueactive=false;  whoKeys.movementhistory.push("U"); resetComboBuildUp(whoKeys,100);
	 
 }
 

}

////////////////////////////////////////////// MOVE VISUALISATION//////////////////////////////////////////////////////////////////////////////////////////////////////

 var actionTimeout;
  function audioAndVisualsByInput(whoKeys)
{  

if(typeof whoKeys["isAllowedToAlterVisual"] == "undefined"){
//if(!whoKeys.isStunned){ 

 	 var worldFacing=whoKeys.worldFacing;
if(whoKeys.isVictor){   alterCharacterMainVisual(5, whoKeys, whoKeys.character.images.victoryImages,50);}

else if(whoKeys.isDown){

 		 delete whoKeys.hostileKey["STUNNED"]; // if down != stunned

	alterCharacterMainVisual(5, whoKeys, whoKeys.character.images.downImages,50); 
if(whoKeys["isOtherActionSizeTinyChange"])
 {
  	whoKeys.shadowMesh.scaling.y= 1.2;
	    	whoKeys.shadowMesh.scaling.x= 0.4;
				    	whoKeys.shadowMesh.scaling.z= 0.8;
						
						whoKeys.mainMesh.position.y= -1.5;
  	}
else{whoKeys.shadowMesh.scaling.y= 1.5;
	    	whoKeys.shadowMesh.scaling.x= 0.7;
				    	whoKeys.shadowMesh.scaling.z= 0.7; }
						
						whoKeys.mainUpperMesh.scaling = new BABYLON.Vector3(0.0 , 0.0, 0.0);

    }
	
	else   if( whoKeys["STUNNED"]){ 
      clearTimeout(actionTimeout); 
	  
	  		  whoKeys.isStunned=true; // NOTE: added because of  checkForStunInjection(whoKeys) that does not correctly makes the opponent stun (image comes, but person can move). Fault in sprite showing/too much happening @ once?


//delete whoKeys["STUNNED"]; => not here
playOneShot(whoKeys.character.sounds.stunSound);
		//  overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10); 		
		

if(whoKeys.character.images.isStunnedStandalone){
		 	createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x,  whoKeys.attackMesh.position.y , whoKeys.attackMesh.position.z-2 ,whoKeys.character.images.stunnedImages ,2 ); 

}
else{

 	    alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.stunnedImages);

}
			  whoKeys["isAllowedToAlterVisual"]=false;
 	 setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 500);

}
if(!gameSettings.isEndgame){



if(whoKeys["showBloodUpper"])
{
	delete whoKeys["showBloodUpper"];
	     alterEffectVisual(whoKeys,whoKeys.mainUpperMesh,whoKeys.character.images.hittedEffectImages , 15);
		 		      playOneShot(whoKeys.character.sounds.hittedSound);	 

}
else if(whoKeys["showBlood"])
{
	delete whoKeys["showBlood"];
	     alterEffectVisual(whoKeys,whoKeys.mainMesh,whoKeys.character.images.hittedEffectImages , 15);
		 		      playOneShot(whoKeys.character.sounds.hittedSound);	 


}
if(whoKeys["showCriticalUpper"])
{
	whoKeys.ScoreAttackPoints +=500*(whoKeys.comboCount+1); 
	delete whoKeys["showCriticalUpper"];
	     alterEffectVisual(whoKeys,whoKeys.mainUpperMesh,whoKeys.character.images.hitEffectImages , 15);
		      playOneShot(whoKeys.hostileKey.character.sounds.hitSound);	 

}
else if(whoKeys["showCritical"])
{
	whoKeys.ScoreAttackPoints +=400*(whoKeys.comboCount+1); 
	delete whoKeys["showCritical"];
	     alterEffectVisual(whoKeys,whoKeys.mainMesh,whoKeys.character.images.hitEffectImages , 15);
		      playOneShot(whoKeys.hostileKey.character.sounds.hitSound);	 


}
if( whoKeys["showComboStarter"] ){ 

delete whoKeys["showComboStarter"];
     alterEffectVisual(whoKeys,whoKeys.mainUpperMesh,whoKeys.character.images.hittedEffectImages , 15);
	 overrideIdleMesh(whoKeys, whoKeys.character.images.painImages,whoKeys.hostileKey.character.launchingTime*10);
     playOneShot(whoKeys.character.sounds.hittedSound);	 

			  whoKeys["isAllowedToAlterVisual"]=false;
 	 setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 700);

}
 if( whoKeys["Blocked"]){ 
  					
   delete whoKeys["Blocked"];

  var shieldingM=alterEffectVisual(whoKeys,whoKeys.mainUpperMesh,whoKeys.character.images.blockingEffectImages , 2);
  if(typeof shieldingM != "undefined"){
     playOneShot(whoKeys.character.sounds.blockSound);

    clearTimeout(actionTimeout); 
    	 	 alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.blockImages,10);  
			 
			  whoKeys["isAllowedToAlterVisual"]=false;
 	 setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 700);


    whoKeys["blockFeedGiven"]=true;

shieldingM.scaling = new BABYLON.Vector3(1.5+whoKeys.character.sizeModifier,1.5+whoKeys.character.sizeModifier,1.5+whoKeys.character.sizeModifier);
shieldingM.material.alpha = 0.9;//ref: https://stackoverflow.com/questions/59315347/using-the-alpha-in-babylon-mesh-color-vertices
 shieldingM.material.diffuseTexture.hasAlpha = true;
shieldingM.material.useAlphaFromDiffuseTexture = true;

shieldingM.position.y = whoKeys.attackMesh.position.y
 shieldingM.position.x = whoKeys.attackMesh.position.x

if(worldFacing ==0)
{
shieldingM.position.x = shieldingM.position.x+0.2
}
else if(worldFacing==1)
{
shieldingM.position.x = shieldingM.position.x-0.2
}
}
 
  }
else if(typeof whoKeys["nextAttackBreakOn"] =="undefined" &&  (whoKeys["canBlockHold"] ||( (whoKeys["canBlock"] && whoKeys.back==1 &&   !whoKeys.isjumping))))
{
clearTimeout(actionTimeout);
if(((whoKeys.left==1 && worldFacing ==0 )|| (whoKeys.right==1 && worldFacing ==1) )){
  alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.kneelBlockImages,5);}
  else{alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.kneelImages,5); whoKeys.back=1; }
   if(whoKeys["isOtherActionSizeTinyChange"])
 {
  	whoKeys.shadowMesh.scaling.y= 1.2;
	    	whoKeys.shadowMesh.scaling.x= 0.4;
				    	whoKeys.shadowMesh.scaling.z= 1.0;}
  
 else{
  	whoKeys.shadowMesh.scaling.y= 1.5;
	    	whoKeys.shadowMesh.scaling.x= 0.7;
				    	whoKeys.shadowMesh.scaling.z= 0.7;}
					if(!whoKeys.isDown &&   ! whoKeys["isOtherActionSizeTinyChange"]){ 	whoKeys.mainUpperMesh.scaling = new BABYLON.Vector3(whoKeys.mainUpperMesh.scaling.x , 0.5, whoKeys.mainUpperMesh.scaling.z);}



}
else if(typeof whoKeys["nextAttackBreakOn"] =="undefined" && (!whoKeys.isStunned && ( (whoKeys.left==1 || whoKeys.right==1 || whoKeys.back==1 || whoKeys.front==1 ) &&(
(whoKeys.movementhistory.length >0 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] != "F") || (whoKeys.movementhistory.length >0 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] != "F^") ||
 (whoKeys.movementhistory.length >0 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] != "B") || (whoKeys.movementhistory.length >0 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] != "Bv") ||
(whoKeys.movementhistory.length >0 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] != "R") || (whoKeys.movementhistory.length >0 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] != "R>") ||
 (whoKeys.movementhistory.length >0 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] != "L") || (whoKeys.movementhistory.length >0 && whoKeys.movementhistory[whoKeys.movementhistory.length-1] != "<L")) 
 &&(typeof whoKeys.character.tmpImages == "undefined" && !whoKeys.isjumping && !whoKeys.isuniqueactive &&  !whoKeys.iskickactive && !whoKeys.isverticalhitactive &&  !whoKeys.ishorizontalhitactive)))){


if(whoKeys.movementhistory[whoKeys.movementhistory.length-1] == "F^" || whoKeys.movementhistory[whoKeys.movementhistory.length-1] == "Bv" || whoKeys.movementhistory[whoKeys.movementhistory.length-1] == "R>" || whoKeys.movementhistory[whoKeys.movementhistory.length-1] == "<L" )
{
 playOneShot(whoKeys.character.sounds.evadeSound);

}

if(   whoKeys.back==1 && gameSettings.isAbsolute2D && !whoKeys.isjumping &&((whoKeys.left==0 && worldFacing ==1 )|| (whoKeys.right==0 && worldFacing ==0) ))
{
alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.kneelImages,5);
  if(whoKeys["isOtherActionSizeTinyChange"])
 {
  	whoKeys.shadowMesh.scaling.y= 1.2;
	    	whoKeys.shadowMesh.scaling.x= 0.4;
				    	whoKeys.shadowMesh.scaling.z= 1.0;}
  
 else{
  	whoKeys.shadowMesh.scaling.y= 1.5;
	    	whoKeys.shadowMesh.scaling.x= 0.7;
				    	whoKeys.shadowMesh.scaling.z= 0.6;}
if(!whoKeys.isDown && ! whoKeys["isOtherActionSizeTinyChange"]){ whoKeys.mainUpperMesh.scaling = new BABYLON.Vector3(whoKeys.mainUpperMesh.scaling.x , 0.5, whoKeys.mainUpperMesh.scaling.z);}



}
else
{
//clearTimeout(actionTimeout);
alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.movementImages,5);

}
}

if(whoKeys.isInvisible && whoKeys.mainMeshVisual.visibility ==1)
{
whoKeys.mainMeshVisual.visibility=0;  whoKeys.shadowMesh.visibility=0;

}
else if(!whoKeys.isInvisible  && whoKeys.mainMeshVisual.visibility !=1)
{
whoKeys.mainMeshVisual.visibility=1;  whoKeys.shadowMesh.visibility=1;


}

 if(whoKeys["connectedFloor"] && whoKeys.shadowMesh.visibility ==1)
  {
  whoKeys.shadowMesh.visibility=0;
  }
  else if(!whoKeys["connectedFloor"] && whoKeys.shadowMesh.visibility != 1 && !whoKeys.isInvisible)
  {
  whoKeys.shadowMesh.visibility=1;
  }
  
   
      if( whoKeys["specialA"]){ 
	  
	  	 	 delete whoKeys["specialA"];

	 	     alterEffectVisual(whoKeys,whoKeys.mainMesh,whoKeys.character.images.hittedEffectImages , 15); 
   overrideIdleMesh(whoKeys, whoKeys.character.images.painImages,whoKeys.hostileKey.character.launchingTime*10);
	 playOneShot(whoKeys.character.sounds.hittedSound);	 

	  	  	 		  overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10); 		

	  	if(whoKeys.character.images.isSpecialAStandalone){
				 	createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x,  whoKeys.attackMesh.position.y-0.5, whoKeys.attackMesh.position.z-2 ,whoKeys.character.images.specialAImages ,3 ); 

		  }
		  
		  else{
		  actionTimeout= setTimeout(function(){ 	overrideIdleMesh(whoKeys.hostileKey, whoKeys.hostileKey.character.images.specialAImages, 350);}, 10);

			  whoKeys["isAllowedToAlterVisual"]=false;
 	 setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 350);
	 
	 
}
  }
    /* else if( whoKeys["specialB"]){ 
	 	 delete whoKeys["specialB"];

	 	     alterEffectVisual(whoKeys,whoKeys.mainMesh,whoKeys.character.images.hittedEffectImages , 15); 
   overrideIdleMesh(whoKeys, whoKeys.character.images.painImages,whoKeys.hostileKey.character.launchingTime*10);
	 playOneShot(whoKeys.character.sounds.hittedSound);	 

	 		  	 	 		  overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10); 		

					if(whoKeys.character.images.isSpecialBStandalone){
							 	createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x,  whoKeys.attackMesh.position.y-0.5, whoKeys.attackMesh.position.z-2 ,whoKeys.character.images.specialBImages ,3 ); 

		  }
		  
		  else{
		  actionTimeout= setTimeout(function(){ 	overrideIdleMesh(whoKeys.hostileKey, whoKeys.hostileKey.character.images.specialBImages, 350);}, 10);
			  whoKeys["isAllowedToAlterVisual"]=false;
 	 setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 350);

		  } 

  }
*/  else  if(whoKeys["push"]){ 
  
  delete whoKeys["push"];
   delete  whoKeys.hostileKey["nextAttackBreakOn"] ;

      clearTimeout(actionTimeout); 

		  overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10); 		

 playOneShot(whoKeys.character.sounds.pushSound);	 

if(whoKeys.character.images.isPushedStandalone){

		 	createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x,  whoKeys.attackMesh.position.y , whoKeys.attackMesh.position.z-2 ,whoKeys.character.images.pushImages ,3 ); 

}
else{

alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.pushImages,5);

 
	 }
	 			  whoKeys["isAllowedToAlterVisual"]=false;
 	 setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 200);


}

  else   if( whoKeys["grabA"]){ 
  
  delete whoKeys["grabA"];
     delete  whoKeys.hostileKey["nextAttackBreakOn"] ;

      clearTimeout(actionTimeout); 

playOneShot(whoKeys.character.sounds.grabSound);	  	 
		  overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10); 		

if(whoKeys.character.images.isGrabAStandalone){
		 	createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x,  whoKeys.attackMesh.position.y , whoKeys.attackMesh.position.z-2 ,whoKeys.character.images.grabAImages ,3 ); 

}
else{
alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.grabAImages,5); 
}
			  whoKeys["isAllowedToAlterVisual"]=false;
 	 setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 200);

}
else if( whoKeys.textBox.text.indexOf("Uppercutted!") >-1 ){ 

    //alterEffectVisual(whoKeys,whoKeys.mainMesh,whoKeys.character.images.hittedEffectImages , 15)  
    alterEffectVisual(whoKeys,whoKeys.mainMesh,whoKeys.hostileKey.character.images.hitEffectImages , 15);
	overrideIdleMesh(whoKeys, whoKeys.character.images.painImages,whoKeys.hostileKey.character.launchingTime*10);
playOneShot(whoKeys.hostileKey.character.sounds.hitSound);	

			  whoKeys["isAllowedToAlterVisual"]=false;
 	 setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 700);

}
  else if( whoKeys.textBox.text.indexOf("Tackle") >-1 ){ 

    alterEffectVisual(whoKeys,whoKeys.mainMesh,whoKeys.hostileKey.character.images.hitEffectImages , 15);
	overrideIdleMesh(whoKeys, whoKeys.character.images.painImages,whoKeys.hostileKey.character.launchingTime*10);
playOneShot(whoKeys.hostileKey.character.sounds.hitSound);	

			  whoKeys["isAllowedToAlterVisual"]=false;
 	 setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 700);

}
    
 else if( whoKeys.textBox.text.indexOf("Awsh") >-1  ){ 
     alterEffectVisual(whoKeys.hostileKey,whoKeys.mainMesh,whoKeys.hostileKey.character.images.hitEffectImages , 15);
	 overrideIdleMesh(whoKeys, whoKeys.character.images.painImages,whoKeys.hostileKey.character.launchingTime*10);
     playOneShot(whoKeys.hostileKey.character.sounds.hitSound);	 
	
	whoKeys["isAllowedToAlterVisual"]=false;
 	 setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 700);

}
  

  else if(  whoKeys["horizontalAttackC"]){
 					  delete whoKeys["horizontalAttackC"];
					  
					 	 overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10); 		   
					  clearTimeout(actionTimeout);
						if(whoKeys.character.images.isHorizontalAttackCStandalone){
						 		
	 	 	  		createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x,  whoKeys.attackMesh.position.y-0.5, whoKeys.attackMesh.position.z ,whoKeys.character.images.horizontalAttackCImages ,3 ); 
						
					}else{ 
											 
alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.horizontalAttackCImages,350);												
   whoKeys["isAllowedToAlterVisual"]=false;
  setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 130);

	 
 	}
					  // whoKeys.movementhistory.push("TACKLE")
					}
else if(  whoKeys["horizontalAttackB"]) {
 					   					  delete whoKeys["horizontalAttackB"];

					  clearTimeout(actionTimeout);
					  					 	 overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10); 		   

						if(whoKeys.character.images.isHorizontalAttackBStandalone){
						 		
	 	 	  		createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x,  whoKeys.attackMesh.position.y-0.5, whoKeys.attackMesh.position.z ,whoKeys.character.images.horizontalAttackBImages ,3 ); 
						
					}else{ 
						
	 alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.horizontalAttackBImages,350);
   whoKeys["isAllowedToAlterVisual"]=false;
  setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 130);

 	}
 					}
  else if( whoKeys["horizontalAttackA"]){
			 					   					  delete whoKeys["horizontalAttackA"];

						 	clearTimeout(actionTimeout);	
							 overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10);

					if(whoKeys.character.images.isHorizontalAttackAStandalone){
 
	 	 	  		createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x ,  whoKeys.attackMesh.position.y-0.5, whoKeys.attackMesh.position.z ,whoKeys.character.images.horizontalAttackAImages ,3 ); 
						
}
							else{
alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.horizontalAttackAImages,350);
   whoKeys["isAllowedToAlterVisual"]=false;
  setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 130);

						// 	actionTimeout=   setTimeout(function(){  			 overrideIdleMesh(whoKeys, whoKeys.character.images.horizontalAttackAImages, 350);			 			 }, 10);
						}

			 }
			 
else if(  whoKeys["verticalAttackC"] ) {
 					    delete whoKeys["verticalAttackC"];
						
					 			   overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10); 
	clearTimeout(actionTimeout);
			if(whoKeys.character.images.isVerticalAttackCStandalone){
	 	createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x ,  whoKeys.attackMesh.position.y-0.5, whoKeys.attackMesh.position.z ,whoKeys.character.images.verticalAttackCImages ,3 ); 
		
	}else{
 						alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.verticalAttackCImages,350); // better than override
   whoKeys["isAllowedToAlterVisual"]=false;
  setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 130);

 			}		}			 
else if(    whoKeys["verticalAttackB"]) {
 					     delete whoKeys["verticalAttackB"];
						 
					 			   overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10); 
	clearTimeout(actionTimeout);
			if(whoKeys.character.images.isVerticalAttackBStandalone){
	 	createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x ,  whoKeys.attackMesh.position.y-0.5, whoKeys.attackMesh.position.z ,whoKeys.character.images.verticalAttackBImages ,4 ); 
		
	}else{

					alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.verticalAttackBImages,350); // better than override
   whoKeys["isAllowedToAlterVisual"]=false;
  setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 130);
 			
			
			}		}			 
  else if( whoKeys["verticalAttackA"]){
   					     delete whoKeys["verticalAttackA"];

  
			   overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10);
		clearTimeout(actionTimeout);	  
				if(whoKeys.character.images.isVerticalAttackAStandalone){
		 	createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x ,  whoKeys.attackMesh.position.y-0.5, whoKeys.attackMesh.position.z ,whoKeys.character.images.verticalAttackAImages ,4 ); 

				}
				else{
					alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.verticalAttackAImages,350); // better than override
   whoKeys["isAllowedToAlterVisual"]=false;
  setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 130);

	/*	actionTimeout= setTimeout(function(){ 		 
			   overrideIdleMesh(whoKeys, whoKeys.character.images.verticalAttackAImages, 350);
			   }, 10);*/
			   }
			 }
  
 else     if(  whoKeys["otherActionA"]    )
  
{whoKeys["isAllowedToAlterVisual"]=false; delete whoKeys["otherActionA"];
//clearTimeout(actionTimeout);
alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.otherActionAImages,5);
  	// playOneShot(whoKeys.hostileKey.character.sounds.energizeSound);	 
	 setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 10);
}
 else     if(  whoKeys["rangeActionA"]    )
  
{		whoKeys["isAllowedToAlterVisual"]=false; delete whoKeys["rangeActionA"];
			  clearTimeout(actionTimeout);
					  					 	 overrideIdleMesh(whoKeys, whoKeys.character.images.idleImages, 10); 		   

						if(whoKeys.character.images.isRangeActionAStandalone){
						 		
	 	 	  		createStandaloneAction(whoKeys, 5.0+ whoKeys.character.sizeModifier,  whoKeys.attackMesh.position.x,  whoKeys.attackMesh.position.y-0.5, whoKeys.attackMesh.position.z ,whoKeys.character.images.rangeActionAImages ,3 ); 
						
					}else{ 
						
	 alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.rangeActionAImages,350);}
   whoKeys["isAllowedToAlterVisual"]=false;
  setTimeout(function(){  delete whoKeys["isAllowedToAlterVisual"]; }, 350);

	 
}
//}

//   if( (!whoKeys.isjumping && whoKeys.left==0 && whoKeys.right==0 && whoKeys.back==0 && whoKeys.front==0 ) ||(whoKeys.character.isWithSpecial==true    && !whoKeys.isStunned && whoKeys.kick!=1 && whoKeys.mainMeshVisual.material.diffuseTexture.name == whoKeys.character.images.energizeImages )    )
    if  (!whoKeys.isjumping && whoKeys.left==0 && whoKeys.right==0 && whoKeys.back==0 && whoKeys.front==0  && whoKeys.unique==0  && whoKeys.verticalhit==0  && whoKeys.kick==0  && whoKeys.horizontalhit==0     )

{

   	whoKeys.mainMesh.scaling.y= 1.0;

  alterCharacterMainVisual(6, whoKeys, whoKeys.character.images.idleImages);
  	if(whoKeys["isOtherActionSizeTinyChange"])
 {
	 whoKeys.shadowMesh.scaling.y= 1.8;
	    	whoKeys.shadowMesh.scaling.x= 0.5;
				    	whoKeys.shadowMesh.scaling.z= 0.6;
 }
 else{
    	whoKeys.shadowMesh.scaling.y= 2.5;
	    	whoKeys.shadowMesh.scaling.x= 1;
				    	whoKeys.shadowMesh.scaling.z= 1;}
					if(!whoKeys.isDown  && ! whoKeys["isOtherActionSizeTinyChange"]){ 	whoKeys.mainUpperMesh.scaling = new BABYLON.Vector3(1,1,1);//whoKeys.mainUpperMesh.scaling.x , 1, whoKeys.mainUpperMesh.scaling.z);
					}


}
}
}
}
