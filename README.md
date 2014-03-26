# url()

A simple url parsing library for Node.js.

* [View the url demo](http://url.websanova.com)
* [Download the lastest version of url](https://github.com/websanova/node-url/tags)


## Notes

For path(1) and path(-1) will always act as if the path is in the form `/some/path/` regardless of whether the original path was `/some/path` or `/some/path/`.


## Examples

```js
var testURL = 'http://rob:abcd1234@www.example.com/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese';

url('domain', testURL);    // example.com
url('hostname', testURL);  // www.example.com
url('sub', testURL);       // www
url('.0', testURL);        // (an empty string)
url('.1', testURL);        // www
url('.2', testURL);        // example
url('.-1', testURL);       // com
url('auth', testURL);      // rob:abcd1234
url('user', testURL);      // rob
url('pass', testURL);      // abcd1234
url('port', testURL);      // 80
url('protocol', testURL);  // http
url('path', testURL);      // /path/index.html
url('file', testURL);      // index.html
url('filename', testURL);  // index
url('fileext', testURL);   // html
url('1', testURL);         // path
url('2', testURL);         // index.html
url('3', testURL);         // (an empty string)
url('-1', testURL);        // index.html
url(1, testURL);           // path
url(2, testURL);           // index.html
url(-1, testURL);          // index.html
url('?', testURL);         // query1=test&silly=willy
url('?silly', testURL);    // willy
url('?poo', testURL);      // null
url('#', testURL);         // test=hash&chucky=cheese
url('#chucky', testURL);   // cheese
url('#poo', testURL);      // null
```

We can also pass a url in and use all the same options on it:

```js
url('domain', 'test.www.example.com/path/here');            // example.com
url('hostname', 'test.www.example.com/path/here');          // test.www.example.com
url('sub', 'test.www.example.com/path/here');               // test.www
url('protocol', 'www.example.com/path/here');               // http
url('path', 'http://www.example.com:8080/some/path');       // /some/path
url('port', 'http://www.example.com:8080/some/path');       // 8080
url('protocol', 'https://www.example.com:8080/some/path');  // https
etc...
```


## Resources

* [More jQuery plugins by Websanova](http://websanova.com/plugins)
* [Websanova JavaScript Extensions Project](http://websanova.com/extensions)
* [jQuery Plugin Development Boilerplate](http://wboiler.websanova.com)
* [The Ultimate Guide to Writing jQuery Plugins](http://www.websanova.com/blog/jquery/the-ultimate-guide-to-writing-jquery-plugins)


## License

MIT licensed

Copyright (C) 2011-2012 Websanova http://www.websanova.com