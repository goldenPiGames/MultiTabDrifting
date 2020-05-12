function pinSingle(i) {
	var sin = Math.sin(i);
	var sin2 = sin**2;
	var digs = Math.floor(sin2*1000)%1000;
	return digs;
}

function pinRange(start, end) {
	var total = 0;
	for (var i = start; i < end; i++) {
		total = (total + pinSingle(i)) % 1000;
	}
	return total;
}

function pinSeq(end) {
	return pinRange(0, end);
}