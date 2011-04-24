NAME
====
lines-adapter - an evented, line-oriented I/O library for node.js

SYNOPSIS
========

        var lines=require("lines-adapter");

        lines(stream, 'utf8')
        .on('data',
           function(line) {
                 // invoked for each line of input
           }
        )
        .end('end',
           function() {
                 // invoked at the end of stream
           }
         );

DESCRIPTION
===========
Adapts a readable buffer stream to produce a stream of lines.

lines(stream,encoding)
----------------------
The lines-adapter module is a function which constructs a line stream from a buffer stream and an optional
encoding argument. The supported encodings are those supported by Buffer.toString(). If no encoding is
specified, 'utf8' is assumed.

Event: 'data'
-------------
The 'data' event emits a string for each line of input in the adapted byte stream. The emitted
line does not contain a trailing \\n.

Event: 'end'
------------
Emitted when the stream has received an EOF. Indicates that no more 'data' events will happen.

Other functions of the underlying stream not implemented by the adapter itself are proxied to
the implementations provided by the stream.

INSTALLATION
============
        npm install lines-adapter

EXAMPLES
========
example/example.js contains the following example:

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

which can be invoked like this:

        npm explore lines-adapter
        (echo foo; echo bar) | node example/example.js
        exit  # to return to where you were


SIMILAR PACKAGES
================
Floby's [node-lines](https://github.com/Floby/node-lines) package provides similar functionality to this
library although it has a different philosophy. In particular node-lines emits 'line' events whereas
node-lines-adapter emits 'data' events.

Peteris Krumin's [node-lazy](https://github.com/pkrumins/node-lazy) provides an alternative
solution that offers a different, more functional abstraction - that of a lazy list.

For example:

         var Lazy=require("lazy");

         (function() {
            var count=0;
            new Lazy(process.stdin)
                 .on('end', function() { console.warn(count + " lines processed"); })
                 .lines
                 .forEach(
                    function(buffer)
                    {
                        count++;
                        console.log(buffer.toString());
                    );
         })();

         process.stdin.resume();

In fact, lines-adapter currently uses node-lazy as its implementation.

The node-lazy API is probably a better solution to use if you don't actually need a stream-like
interface, but just need some way to extract lines from an input stream. The reason is that provides
a very concise way to construct processing pipelines.

The lines-adapter API itself is suited to cases where you need a stream-like interface in which
the 'data' events are constrained to be single strings, corresponding to each line of input.

REVISION HISTORY
================
v0.0.5
        Resurrected. There is actually some value in presenting a stream-like interface, even if
        node-lazy is probably better suited to most purposes.

v0.0.4
        Re-implemented in terms of node-lazy.

v0.0.3
        last version that does not generate deprecation warnings.
