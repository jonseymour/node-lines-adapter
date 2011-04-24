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

    for (prop in stream) {
	if (this[prop]) {
	    continue;
	}
	if (stream[prop] instanceof Function)  {
	    this[prop] = function() {
		return stream[prop].apply(stream, arguments);
	    };
	}
    }
    return this;
};

Lines.prototype = new EventEmitter();

module.exports=function(stream, encoding) {
    return new Lines(stream, encoding);
};
