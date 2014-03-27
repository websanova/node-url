/**
 * Usage: node test.js
 */

var wurl = require('./wurl.js'),
    assert = require('assert');

function strictEqual(a, b) {
  console.log('Test: ' + a + ' === ' + b);
  assert.strictEqual.apply(null, arguments);
}

// Test URLs.
var testUrl = 'http://rob:abcd1234@www.domain.com/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese',
    testHttps = 'https://rob:abcd1234@www.domain.com/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese',
    testIp = 'https://rob:abcd1234@1.2.3.4/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese';

// Test dead values.
strictEqual(wurl('', testUrl), testUrl);
strictEqual(wurl(null, testUrl), testUrl);
strictEqual(wurl(undefined, testUrl), testUrl);
strictEqual(wurl('domain'), undefined);
strictEqual(wurl('domain', ''), undefined);
strictEqual(wurl('domain', null), undefined);
strictEqual(wurl('domain', undefined), undefined);

// Test domain.
strictEqual(wurl('domain', testUrl), 'domain.com');
strictEqual(wurl('domain', testHttps), 'domain.com');
strictEqual(wurl('domain', testIp), '1.2.3.4');

// Test hostname.
strictEqual(wurl('hostname', testUrl), 'www.domain.com');
strictEqual(wurl('hostname', testHttps), 'www.domain.com');
strictEqual(wurl('hostname', testIp), '1.2.3.4');

// Test sub.
strictEqual(wurl('sub', testUrl), 'www');

// Test domain index.
strictEqual(wurl('.0', testUrl), '');
strictEqual(wurl('.1', testUrl), 'www');
strictEqual(wurl('.2', testUrl), 'domain');
strictEqual(wurl('.-1', testUrl), 'com');

// Test auth.
strictEqual(wurl('auth', testUrl), 'rob:abcd1234');

// Test user.
strictEqual(wurl('user', testUrl), 'rob');

// Test port.
strictEqual(wurl('port', testUrl), '80');
strictEqual(wurl('port', testUrl.toUpperCase() ), '80');
strictEqual(wurl('port', "http://example.com:80" ), '80');
strictEqual(wurl('port', testHttps ), '443');
strictEqual(wurl('port', testHttps.toUpperCase() ), '443');
strictEqual(wurl('port', "https://example.com:443" ), '443');

// Test pass.
strictEqual(wurl('pass', testUrl), 'abcd1234');

// Test protocol.
strictEqual(wurl('protocol', testUrl), 'http');

// Test path.
strictEqual(wurl('path', testUrl), '/path/index.html');
strictEqual(wurl('path', 'http://www.domain.com/first/second' ), '/first/second');
strictEqual(wurl('path', 'http://www.domain.com/first/second/' ), '/first/second/');
strictEqual(wurl('path', 'http://www.domain.com:8080/first/second' ), '/first/second');
strictEqual(wurl('path', 'http://www.domain.com:8080/first/second/' ), '/first/second/');
strictEqual(wurl('path', 'http://www.domain.com/first/second?test=foo' ), '/first/second');
strictEqual(wurl('path', 'http://www.domain.com/first/second/?test=foo' ), '/first/second/');
strictEqual(wurl('path', 'http://www.domain.com/path#anchor' ), '/path');
strictEqual(wurl('path', 'http://www.domain.com/path/#anchor' ), '/path/');
strictEqual(wurl('path', 'http://www.domain.com' ), '');
strictEqual(wurl('path', 'http://www.domain.com/' ), '/');
strictEqual(wurl('path', 'http://www.domain.com#anchor' ), '');
strictEqual(wurl('path', 'http://www.domain.com/#anchor' ), '/');
strictEqual(wurl('path', 'http://www.domain.com?test=foo' ), '');
strictEqual(wurl('path', 'http://www.domain.com/?test=foo' ), '/');
strictEqual(wurl('path', 'http://www.domain.com:80' ), '');
strictEqual(wurl('path', 'http://www.domain.com:80/' ), '/');
strictEqual(wurl('path', 'http://www.domain.com:80#anchor' ), '');
strictEqual(wurl('path', 'http://www.domain.com:80/#anchor' ), '/');
strictEqual(wurl('path', 'http://www.domain.com:80?test=foo' ), '');
strictEqual(wurl('path', 'http://www.domain.com:80/?test=foo' ), '/');

// Test file.
strictEqual(wurl('file', testUrl), 'index.html');
strictEqual(wurl('filename', testUrl), 'index');
strictEqual(wurl('fileext', testUrl), 'html');

// Test path index.
strictEqual(wurl('1', testUrl), 'path');
strictEqual(wurl(1, testUrl), 'path');
strictEqual(wurl('2', testUrl), 'index.html');
strictEqual(wurl('3', testUrl), '');
strictEqual(wurl('-1', testUrl), 'index.html');
strictEqual(wurl('1', 'http://www.domain.com/first/second' ), 'first');
strictEqual(wurl('1', 'http://www.domain.com/first/second/' ), 'first');
strictEqual(wurl('-1', 'http://www.domain.com/first/second?test=foo' ), 'second');
strictEqual(wurl('-1', 'http://www.domain.com/first/second/?test=foo' ), 'second');

// Test query string param
strictEqual(wurl('?', testUrl), 'query1=test&silly=willy');
strictEqual(wurl('?silly', testUrl), 'willy');
strictEqual(wurl('?poo', testUrl), null);
strictEqual(wurl('?poo', 'http://domain.com?poo=' ), '');
strictEqual(wurl('?poo', 'http://domain.com/?poo' ), '');
strictEqual(wurl('?poo', 'http://domain.com?poo' ), '');
strictEqual(wurl('?poo', 'http://domain.com?' ), null);
strictEqual(wurl('?poo', 'http://domain.com' ), null);

// Test hash string param.
strictEqual(wurl('#', testUrl), 'test=hash&chucky=cheese');
strictEqual(wurl('#chucky', testUrl), 'cheese');
strictEqual(wurl('#poo', testUrl), null);
strictEqual(wurl('#poo', 'http://domain.com#poo=' ), '');
strictEqual(wurl('#poo', 'http://domain.com/#poo' ), '');
strictEqual(wurl('#poo', 'http://domain.com#poo' ), '');
strictEqual(wurl('#poo', 'http://domain.com#' ), null);
strictEqual(wurl('#poo', 'http://domain.com' ), null);