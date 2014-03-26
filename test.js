/**
 * Usage: node test.js
 */

var url = require('./url.js'),
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
strictEqual(url('', testUrl), testUrl);
strictEqual(url(null, testUrl), testUrl);
strictEqual(url(undefined, testUrl), testUrl);
strictEqual(url('domain'), undefined);
strictEqual(url('domain', ''), undefined);
strictEqual(url('domain', null), undefined);
strictEqual(url('domain', undefined), undefined);

// Test domain.
strictEqual(url('domain', testUrl), 'domain.com');
strictEqual(url('domain', testHttps), 'domain.com');
strictEqual(url('domain', testIp), '1.2.3.4');

// Test hostname.
strictEqual(url('hostname', testUrl), 'www.domain.com');
strictEqual(url('hostname', testHttps), 'www.domain.com');
strictEqual(url('hostname', testIp), '1.2.3.4');

// Test sub.
strictEqual(url('sub', testUrl), 'www');

// Test domain index.
strictEqual(url('.0', testUrl), '');
strictEqual(url('.1', testUrl), 'www');
strictEqual(url('.2', testUrl), 'domain');
strictEqual(url('.-1', testUrl), 'com');

// Test auth.
strictEqual(url('auth', testUrl), 'rob:abcd1234');

// Test user.
strictEqual(url('user', testUrl), 'rob');

// Test port.
strictEqual(url('port', testUrl), '80');
strictEqual(url('port', testUrl.toUpperCase() ), '80');
strictEqual(url('port', "http://example.com:80" ), '80');
strictEqual(url('port', testHttps ), '443');
strictEqual(url('port', testHttps.toUpperCase() ), '443');
strictEqual(url('port', "https://example.com:443" ), '443');

// Test pass.
strictEqual(url('pass', testUrl), 'abcd1234');

// Test protocol.
strictEqual(url('protocol', testUrl), 'http');

// Test path.
strictEqual(url('path', testUrl), '/path/index.html');
strictEqual(url('path', 'http://www.domain.com/first/second' ), '/first/second');
strictEqual(url('path', 'http://www.domain.com/first/second/' ), '/first/second/');
strictEqual(url('path', 'http://www.domain.com:8080/first/second' ), '/first/second');
strictEqual(url('path', 'http://www.domain.com:8080/first/second/' ), '/first/second/');
strictEqual(url('path', 'http://www.domain.com/first/second?test=foo' ), '/first/second');
strictEqual(url('path', 'http://www.domain.com/first/second/?test=foo' ), '/first/second/');
strictEqual(url('path', 'http://www.domain.com/path#anchor' ), '/path');
strictEqual(url('path', 'http://www.domain.com/path/#anchor' ), '/path/');
strictEqual(url('path', 'http://www.domain.com' ), '');
strictEqual(url('path', 'http://www.domain.com/' ), '/');
strictEqual(url('path', 'http://www.domain.com#anchor' ), '');
strictEqual(url('path', 'http://www.domain.com/#anchor' ), '/');
strictEqual(url('path', 'http://www.domain.com?test=foo' ), '');
strictEqual(url('path', 'http://www.domain.com/?test=foo' ), '/');
strictEqual(url('path', 'http://www.domain.com:80' ), '');
strictEqual(url('path', 'http://www.domain.com:80/' ), '/');
strictEqual(url('path', 'http://www.domain.com:80#anchor' ), '');
strictEqual(url('path', 'http://www.domain.com:80/#anchor' ), '/');
strictEqual(url('path', 'http://www.domain.com:80?test=foo' ), '');
strictEqual(url('path', 'http://www.domain.com:80/?test=foo' ), '/');

// Test file.
strictEqual(url('file', testUrl), 'index.html');
strictEqual(url('filename', testUrl), 'index');
strictEqual(url('fileext', testUrl), 'html');

// Test path index.
strictEqual(url('1', testUrl), 'path');
strictEqual(url(1, testUrl), 'path');
strictEqual(url('2', testUrl), 'index.html');
strictEqual(url('3', testUrl), '');
strictEqual(url('-1', testUrl), 'index.html');
strictEqual(url('1', 'http://www.domain.com/first/second' ), 'first');
strictEqual(url('1', 'http://www.domain.com/first/second/' ), 'first');
strictEqual(url('-1', 'http://www.domain.com/first/second?test=foo' ), 'second');
strictEqual(url('-1', 'http://www.domain.com/first/second/?test=foo' ), 'second');

// Test query string param
strictEqual(url('?', testUrl), 'query1=test&silly=willy');
strictEqual(url('?silly', testUrl), 'willy');
strictEqual(url('?poo', testUrl), null);
strictEqual(url('?poo', 'http://domain.com?poo=' ), '');
strictEqual(url('?poo', 'http://domain.com/?poo' ), '');
strictEqual(url('?poo', 'http://domain.com?poo' ), '');
strictEqual(url('?poo', 'http://domain.com?' ), null);
strictEqual(url('?poo', 'http://domain.com' ), null);

// Test hash string param.
strictEqual(url('#', testUrl), 'test=hash&chucky=cheese');
strictEqual(url('#chucky', testUrl), 'cheese');
strictEqual(url('#poo', testUrl), null);
strictEqual(url('#poo', 'http://domain.com#poo=' ), '');
strictEqual(url('#poo', 'http://domain.com/#poo' ), '');
strictEqual(url('#poo', 'http://domain.com#poo' ), '');
strictEqual(url('#poo', 'http://domain.com#' ), null);
strictEqual(url('#poo', 'http://domain.com' ), null);