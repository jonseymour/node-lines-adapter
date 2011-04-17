var
lines=require("lines-adapter"),
count=0;

lines(process.stdin)
.on('data', function (line) {
	count++;
    })
.on('end', function ()
    {
	console.log(count);
    }
);


process.stdin.resume();