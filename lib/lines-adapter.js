//
// (C) Copyright Jon Seymour 2011
//

var
EventEmitter=require("events").EventEmitter;

function Lines(stream, encoding)
{
    var
    self=this,
    buffers = [],
    total=0;

    if (!encoding) {
	encoding='utf8'; // perhaps this should be the platform default?
    }

    function onData(data) {
	var i,k,min=0,dump,copied;
	for (i=0; i<data.length; ++i) {
	    switch (data[i]) {
	    case 0x0a:
		copied=0;
		total+=(i-min);
		dump=new Buffer(total);
		for (k in buffers) {
		    buffers[k].copy(dump, copied, 0);
		    copied += buffers[k].length;
		}
		if (i>0) {
		    data.copy(dump, copied, min, i);
		    copied+=(i-min);
		}
		min=i+1;

		// remove trailing \r if there is one
		if (copied > 1 && dump[copied-2] == 0x0d) {
		    copied--;
		}
		self.emit('data', dump.toString(encoding, 0, copied));
		buffers=[];
		total=0;
		break;

	    default:
		break;
	    }
	}
	if (min < data.length - 1) {
	    buffers.push(data.slice(min+1));
	    total+=(data.length - min+1);
	}
    }


    stream
	.on('data', onData)
	.on('end', function() {
		if (buffers.length > 0) {
		    onData(new Buffer('\n'));
		}
		self.emit('end');
	    });

    return this;
}

Lines.prototype = EventEmitter.prototype;

module.exports=function(stream) {
    return new Lines(stream);
};