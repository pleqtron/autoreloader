const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const crypto = require('crypto');
const config = require('./autoreloader.json');
const fs = require('fs');

if(typeof config.watchdir === 'undefined' || typeof config.port === 'undefined'){
	console.log("Please check config file.");
	return;
}

if(!fs.existsSync(config.watchdir)){
	console.log("Cannot find watchdir at "+config.watchdir);	
	return;
}

const uuid = crypto.createHash('md5').update(config.watchdir).digest('hex');
app.use(express.static('assets'));

http.listen(config.port, function(){
  console.log('autoreloader startet on port '+config.port);
  console.log('watching', config.watchdir);
  console.log('please include the following snippet in your project template head:');
  console.log('<script type="text/javascript" data-port="'+config.port+'" src="http://localhost:'+config.port+'/autoreloader.min.js"></script>')
});


io.on('connection', function(socket) {
	socket.join(uuid);
})


// AutoReload Server
require('log-timestamp');

fs.watch(config.watchdir, {
	recursive: true
} ,function(eventType, filename){
	console.log(eventType+" "+filename);
	io.to(uuid).emit('do reload', eventType+" "+filename);
});