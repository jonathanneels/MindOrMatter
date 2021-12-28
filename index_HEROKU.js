const https = require('https');
//const http = require('http');
 const fs = require('fs');
var os = require( 'os' );
const path = require('path');

const WebSocket = require('ws');//https://www.linode.com/docs/guides/introduction-to-websockets/

const options = {
  key: fs.readFileSync('testkey.pem'),
  cert: fs.readFileSync('test.crt')//cert.pem
};

const directoryPath = path.join(__dirname, 'static');

 var port = process.env.PORT || 8000;
 var ip= "0.0.0.0";
 
 const wss = new WebSocket.Server({ port: port+1 });

 require('dns').lookup(require('os').hostname(), function (err, add, fam) {
 // console.log('addr: '+add);
  ip = add; // if netwerk allows it - Windows  Firewall - https://stackoverflow.com/questions/5489956/how-could-others-on-a-local-network-access-my-nodejs-app-while-its-running-on/5490033
 	console.log("HTTPS server started at https://"+ip+":" + port.toString());
	
	launchServer();
	
});

function launchServer(){
https.createServer(options, function (req, res) { 

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
    console.log("Our app is running on port ${ PORT }. (Default = 8000)");
});}


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


 
