'user strict';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function isDebug() {
//	return true
	return false
}

function isExperimental() {
	return false
}

function loadCSS(url) {
	const link = document.createElement('link');
	link.href = url;
	link.type = 'text/css';
	link.rel = 'stylesheet';
	(document.head || document.documentElement).appendChild(link);
}

function loadScript(url, async = false) {
	var s = document.createElement('script');
	s.type = "text/javascript";
	s.src = url;
	s.async = async;
	/*
	s.onload = function () {
		//this.remove();
		//console.log(url + "is loaded");
	};*/
		(document.head || document.documentElement).appendChild(s);
}

function makeid(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export { isExperimental, isDebug, wait, makeid, loadCSS, loadScript }
