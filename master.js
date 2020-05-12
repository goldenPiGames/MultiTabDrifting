var slaves = [];
var returned = [];
var result;
var done = 0;
var nslaves = 10;
var max = 10000000;
var timeStart;
var timeEnd;
const PER_ROW = 10;

function receiveMessage(e) {
	console.log(e.data);
	switch(e.data.what) {
		case "ready": e.source.postMessage({what:"command", operation:"pin", start:iStart(e.data.from, nslaves, max), end:iStart(e.data.from+1, nslaves, max)}, "*"); break;
		case "result":
			returned[e.data.from] = e.data.result;
			done++;
			if (done >= nslaves)
				finish();
			break;
	}
}

window.addEventListener("message", receiveMessage, false);

function masterBegin() {
	closeEverything();
	done = 0;
	nslaves = parseInt(document.getElementById("inputThreads").value);
	max = parseInt(document.getElementById("inputN").value);
	//console.log(nslaves)
	//console.log(max)
	timeStart = Date.now();
	document.getElementById("hereResult").innerHTML = "Waiting";
	document.getElementById("hereTime").innerHTML = "Waiting";
	openWindows();
}

function openWindows() {
	slaves = [];
	for (var i = 0; i < nslaves; i++) {
		//console.log(i)
		slaves[i] = window.open("slave.html", i, "menubar=yes,width=150,height=150,screenX="+(150*(i%PER_ROW))+",screenY="+(200*Math.floor(i/PER_ROW)));
	}
}

function iStart(rank, nranks, max) {
	return Math.floor(max*rank/nranks);
}

function finish() {
	timeEnd = Date.now();
	result = returned.reduce((a,c)=>(a+c)%1000);
	document.getElementById("hereResult").innerHTML = result;
	document.getElementById("hereTime").innerHTML = timeEnd - timeStart;
	//setTimeout(closeEverything, 1000);
}

function closeEverything() {
	slaves.forEach(s=>s.close());
}
