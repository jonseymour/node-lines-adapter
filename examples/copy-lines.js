var
lines=require("lines-adapter");

lines(process.stdin)
.on('data', function (line) {
	console.log(line);
    });

process.stdin.resume();