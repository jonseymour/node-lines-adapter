//
// (C) Copyright Jon Seymour 2011
//

var
   Lazy=require("lazy"),
   EventEmitter=require("events").EventEmitter;

function Lines(stream, encoding)
{
    var self = this;

    var lazy = new Lazy(stream)
	.on(
	    'end',
	    function () {
		self.emit('end');
	    })
	.lines
	.forEach(
	    function(line)
	    {
		self.emit('data', line.toString(encoding || 'utf8'));
	    }
	);

   return this;
};

Lines.prototype = new EventEmitter();

module.exports=function(stream, encoding) {
    console.warn("warn: as of v0.0.4 lines-adapter is deprecated - please use 'lazy' instead. see README.md");
    console.warn("warn: If for some reason, you really want to continue using this package, use v0.0.3");
    return new Lines(stream, encoding);
};
