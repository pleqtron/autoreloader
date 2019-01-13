import * as io from 'socket.io-client';

document.addEventListener("DOMContentLoaded",function(){
	let scriptTag = document.querySelector('script[src*="autoreloader.min.js"]');
	let initFailed = false;
	if(!scriptTag){
		console.error("autoreloader failed - missing correct scriptTag");
		initFailed = true;
	}	
	const port = scriptTag.getAttribute('data-port');
	if(!port){
		console.error("autoreloader failed - missing port information");
		initFailed = true;
	}

	if(typeof io === 'undefined'){
		console.error("autoreloader failed - missing socket.io library");
		initFailed = true;
	}

	if(!initFailed){
		const socket = io('http://localhost:'+port);
		let reloadInitiated = false;
		socket.on('do reload', function(fileChange) {
			if(reloadInitiated) return;
			console.debug("autoreloader.js", "reload initiated at "+new Date().toUTCString()+" / action: "+fileChange);

			reloadInitiated = true;
			setTimeout(function(){
				window.location.reload(true);
			}, 100);
		});
	}
	
});