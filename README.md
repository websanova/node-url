# wurl()

A simple url parsing library for Node.js.

* [View the url demo](http://url.websanova.com)
* [Download the lastest version of url](https://github.com/websanova/node-url/tags)


## Notes

For path(1) and path(-1) will always act as if the path is in the form `/some/path/` regardless of whether the original path was `/some/path` or `/some/path/`.


## Install

```
npm install wurl
```

## Examples

```js
var url = require('url');
var testURL = 'http://rob:abcd1234@www.example.com/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese';

wurl('domain', testURL);    // example.com
wurl('hostname', testURL);  // www.example.com
wurl('sub', testURL);       // www
wurl('.0', testURL);        // (an empty string)
wurl('.1', testURL);        // www
wurl('.2', testURL);        // example
wurl('.-1', testURL);       // com
wurl('auth', testURL);      // rob:abcd1234
wurl('user', testURL);      // rob
wurl('pass', testURL);      // abcd1234
wurl('port', testURL);      // 80
wurl('protocol', testURL);  // http
wurl('path', testURL);      // /path/index.html
wurl('file', testURL);      // index.html
wurl('filename', testURL);  // index
wurl('fileext', testURL);   // html
wurl('1', testURL);         // path
wurl('2', testURL);         // index.html
wurl('3', testURL);         // (an empty string)
wurl('-1', testURL);        // index.html
wurl(1, testURL);           // path
wurl(2, testURL);           // index.html
wurl(-1, testURL);          // index.html
wurl('?', testURL);         // query1=test&silly=willy
wurl('?silly', testURL);    // willy
wurl('?poo', testURL);      // null
wurl('#', testURL);         // test=hash&chucky=cheese
wurl('#chucky', testURL);   // cheese
wurl('#poo', testURL);      // null
```


## License

MIT licensed

Copyright (C) 2011-2012 Websanova http://www.websanova.com