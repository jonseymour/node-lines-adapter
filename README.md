NAME
====
lines-adapter - an evented, line-oriented I/O library for node.js

SYNOPSIS
========

<pre>
   var lines=require("lines-adapter");

   lines(stream, 'utf8')
    .on(
        'data',
        function(line) {
            // invoked for each line of input
        }
    )
    .end(
        'end',
        function() {
            // invoked at the end of stream
        }
    );
</pre>

Note that this lines-adapter is now implemented in terms of and deprecated in favour of node-lazy.
Please read the ALTERNATIVES section below for details.

DESCRIPTION
===========
Adapts a readable byte stream to produce a stream of lines.

lines(stream,encoding)
----------------------
The lines-adapter module is a function which constructs a line stream from a byte stream and an optional
encoding argument. The supported encodings are those supported by Buffer.toString(). If no encoding is
specified, 'utf8' is assumed.

Event: 'data'
-------------
The 'data' event emits a string for each line of input in the adapted byte stream. The emitted
line does not contain a trailing \\n. A single trailing \\r will be removed, if present.

Event: 'end'
------------
Emitted when the stream has received an EOF. Indicates that no more 'data' events will happen.

INSTALLATION
============
        git clone git://github.com/jonseymour/node-lines-adapter
        npm link

EXAMPLES
========
Two examples are provided in the examples/ directory: count-lines and copy-lines.

    $> echo foobar | node examples/count-lines.js
    1

    $> (echo foo; echo bar) | node examples/count-lines.js
    2

    $> echo foobar | node examples/copy-lines.js
    foobar

    $> (echo foo; echo bar) | node examples/copy-lines.js
    foo
    bar

SIMILAR PACKAGES
================
Floby's [node-lines](https://github.com/Floby/node-lines) package provides similar functionality to this
library although it has a different philosophy. In particular node-lines emits 'line' events whereas
node-lines-adapter emits 'data' events.

Peteris Krumin's [node-lazy](https://github.com/pkrumins/node-lazy) solution has a much better and more general solution to this problem.

For example:

    var Lazy=require("lazy");

    new Lazy(process.stdin)
        .lines
        .forEach(
            function(line)
            {
                console.log(line.toString());
            }
        );

    process.stdin.resume();

REVISION HISTORY
================
v0.0.4
        Deprecated this package in favour of node-lazy.
        This is the last version of lines-adapter. Consumers are encouraged to use node-lazy directly instead.

v0.0.3
        last version that does not generate deprecation warnings.
