 function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function goclone(source) { //REF: https://stackoverflow.com/questions/12690107/clone-object-without-reference-javascript
    if (Object.prototype.toString.call(source) === '[object Array]') {
        var clone = [];
        for (var i=0; i<source.length; i++) {
            clone[i] = goclone(source[i]);
        }
        return clone;
    } else if (typeof(source)=="object") {
        var clone = {};
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                clone[prop] = goclone(source[prop]);
            }
        }
        return clone;
    } else {
        return source;
    }
}

 function isMobile()//REF:https://redstapler.co/detect-mobile-device-with-javascript/#:~:text=The%20basic%20and%20easy%20way,extract%20the%20information%20like%20this.&text=alert(%22You're%20using,userAgent.
{
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i))
 {
 return true;
}
else{return false;}
}
function getRandomInt(lower, upper)//REF: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
{
    //to create an even sample distribution
    //return Math.floor(lower + (Math.random() * (upper - lower + 1)));

    //to produce an uneven sample distribution
    return Math.round(lower + (Math.random() * (upper - lower)));

    //to exclude the max value from the possible values
    //return Math.floor(lower + (Math.random() * (upper - lower)));
}

function boolToIntConverter(booleanValue)
{
	if(booleanValue == true){return 1;}
	else {return 0;}
	
}

function intToBoolConverter(intValue)
{
	if(0 == parseInt(intValue)){return false;}
	else {return true;}
	
}

function wait(milliseconds) {//REF: https://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

    function extractLastArrayElements(Elements,elementsCount){
    var x = [];

    for(var i=Elements.length - elementsCount; i <=Elements.length-1; i++)
    {
   x.push(Elements[i]);
    }
	
	return x;

}

////////////////////////////////////////////////////////////////DIRECTION CALCULATION//////////////////////////////////////////////////////////
function reverseString(str) {//REF: https://www.freecodecamp.org/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

function isInputAHitInArray(  theArray, yourStringsList, isSkipReturningFollowups, charsIgnoreList, isFacingLeftReverseLR, currentFacing) /// isSkipReturningFollowups=> LL = L
{	var isMatch=false;

for (var z = 0; z < yourStringsList.length; z++) {
	
	if(!isMatch){
	var yourString= yourStringsList[z];
	
	if(typeof theArray != "undefined"  && typeof yourString != "undefined"){
		var testMatch="";

	if( typeof isFacingLeftReverseLR != "undefined" &&  isFacingLeftReverseLR && typeof currentFacing != "undefined" && currentFacing == 1)
	{
				var newString= ""; 
					for (var i = 0; i < yourString.length; i++) {
						
						if(yourString[i] == "L")
						{
						newString+=yourString[i].replace("L","R");	
						}
						else if(yourString[i] == "R")
						{
							newString+=yourString[i].replace("R","L");
						}
						else{
						newString+=yourString[i];
						}
						
				
				}
				yourString=newString;

	}
	
	
 	for (var i = theArray.length-1; i > 0; i--) {
	
	 
	if((typeof charsIgnoreList != "undefined" && charsIgnoreList.includes( theArray[i])))
	{
 				continue;
 
	}
  if(testMatch.length >0 && isSkipReturningFollowups   )
{
	if(testMatch[testMatch.length-1] == theArray[i])
	{
		continue;
	}
}
 
	 testMatch+= theArray[i];
 
		if(testMatch.length >= yourString.length)
		{
	

  if(reverseString(testMatch)== yourString)
{
	
	isMatch=true;
}
		break;
		}
		 
		 
}
}
}
}
return isMatch;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
