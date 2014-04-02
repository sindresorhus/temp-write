'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var tempWrite = require('./index');

describe('writeTemp()', function () {
	it('should write string to a random temp file', function (cb) {
		tempWrite('unicorn', 'test.png', function (err, filepath) {
			assert.equal(fs.readFileSync(filepath, 'utf8'), 'unicorn');
			assert.equal(path.basename(filepath), 'test.png');
			cb();
		});
	});

	it('should write buffer to a random temp file', function (cb) {
		tempWrite(new Buffer('unicorn'), function (err, filepath) {
			assert.equal(fs.readFileSync(filepath, 'utf8'), 'unicorn');
			cb();
		});
	});

	it('should write string to a random temp filepath', function (cb) {
		tempWrite('unicorn', 'foo/bar/test.png', function (err, filepath) {
			assert.equal(fs.readFileSync(filepath, 'utf8'), 'unicorn');
			assert(/foo\/bar\/test\.png$/.test(filepath));
			cb();
		});
	});
});

describe('writeTemp.sync()', function () {
	it('should write to a random temp file async', function () {
		assert.equal(fs.readFileSync(tempWrite.sync('unicorn'), 'utf8'), 'unicorn');
	});
});
