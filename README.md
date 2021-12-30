# Mind Or Matter
Mind Or Matter is a 2.5D Fighter Engine; open source project written in javascript (babylon js + jquery)

Multiplayer works locally (albeit simple), but is not functional in the Heroku url. 
Through the Heroku app you can do the following: arcade, survival, single vs, training, tutorial. 

----------------------------------------------
START OFFLINE: 
Download this project. 

Make sure you've changed the values 'server' and 'ws' in \static\assets\gameConfig.config to: 

"server":"https://192.168.1.40:11111", => current IP of your local machine
"ws":"ws://127.0.0.1:11112"

otherwise the project will not launch. 
After the aforementioned alteration you can run the project by opening cmd in the directory and then type 'node index.js'.
----------------------------------------------
Your own fighting game:
To create your own fighting game, you need to make edits in the following folders (mainly in assets): 
static/assets/char
static/assets/stages
...
Also adding of changing existing 'moves' can be done through static/js/engine/MOVES.js

Enjoy (and place your creations in the issues or Projects here on github)! 
----------------------------------------------



Do note: 
Using the characters or this engine requires you to refer to Jonathan F.M. Neels. 
If you make profit +10.000 euro, you must give me a honest share of 2.25 percent ;).
