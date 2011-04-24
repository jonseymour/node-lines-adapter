var
lines=require("lines-adapter");

(function() {
    var count=0;
    lines(process.stdin)
	 .on('data',
	     function (line) {
		 count++;
		 console.log(line);
	     })
	 .on('end',
	     function() {
		console.warn(count+" lines copied");
	    });
})();

process.stdin.resume();
