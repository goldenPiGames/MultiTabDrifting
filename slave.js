var tindex;

function receiveMessage(e) {
	console.log(e.data);
	switch (e.data.what) {
		case "command":exec(e.data); break;
	}
}

window.addEventListener("message", receiveMessage, false);

function affirmLoad() {
	tindex = parseInt(window.name);
	document.getElementById("hereIndex").innerHTML = tindex;
	window.opener.postMessage({what:"ready", from:tindex}, "*");
}

window.addEventListener("load", affirmLoad, false);

function exec(data) {
	document.getElementById("hereRange").innerHTML = data.start + "-" + data.end;
	var toret;
	switch (data.operation) {
		case "pin": toret=pinRange(data.start, data.end); break;
	}
	document.getElementById("hereResult").innerHTML = toret;
	window.opener.postMessage({what:"result", from:tindex, result:toret}, "*");
}