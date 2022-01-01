const http = require('http');
//const http = require('http');
 const fs = require('fs');
var os = require( 'os' );
const path = require('path');


//const { Server } = require('ws'); => does not work on heroku atm ...

 
 
 
 var port = process.env.PORT || 8000;  // IMPORTANT: WEBSERVER PORT HERE IS SAME AS HTTP PORT (index.js project is the http port + 1)
  

 	launchServer();


function launchServer(){
var serverMain= http.createServer((req, res) => {

var feedbackUrl = req.url;

  if (feedbackUrl.split('?')[0] === '/') {//REF: https://stackoverflow.com/questions/4720343/loading-basic-html-in-node-js
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('index.html').pipe(res);
    }     
 else if (feedbackUrl .includes( '/DIR') )
  {	  var path =__dirname +feedbackUrl.replace("DIR",""); //REF: https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
   fs.readdir(path, (err, files) => {
	       if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
      res.writeHead(200);
    res.end(files.join());

});
  
  } 
  else{  
  fs.readFile(__dirname + feedbackUrl, function (err,data) {//REF:https://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
  
  }
  
}).listen(port, () => {
    console.log("Running on port ${ PORT }. (Default = 8000). SET  static/assets/gameConfig.config to correct directory!");
});


/* => does not work on heroku atm :(.
const wss = new Server({ server: serverMain });//REF: https://stackoverflow.com/questions/59706001/why-do-we-pass-an-http-server-to-a-websocket-instance-in-javascript-on-nodejs

 wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
	  var feedbackList= message.split(',');  // prefer list instead of json, much smaller data exchange.
	  wss[feedbackList[0]]=feedbackList;
  //  console.log('received: %s',  wss[feedbackList[0]]);// message);
	
	if(feedbackList[0].indexOf('_p1') >= 0 )
	{
				if(typeof wss[feedbackList[0].replace("_p1","_p2")] != "undefined")
				{
					 ws.send( wss[feedbackList[0].replace("_p1","_p2")].join(','));
				}
			else{
			 	  ws.send( feedbackList[0].replace("_p1","")+' - waiting for p2');
	 
					  }

	}
	else if (feedbackList[0].indexOf('_p2') >= 0 ){
		
			if(typeof wss[feedbackList[0].replace("_p2","_p1")] != "undefined")
				{
			  ws.send( wss[feedbackList[0].replace("_p2","_p1")].join(','));
				}
			else{
					 			  ws.send( feedbackList[0].replace("_p2","")+' - waiting for p1');

					  }


	}
	else{
		
			  ws.send( 'waiting...');

	}
 
  });

 // ws.send( 'something'); => outside is once
});
¨*/
 }

 
