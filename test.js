'use strict';
var fs = require('fs');
var test = require('ava');
var path = require('path');
var tempWrite = require('./');

test('writeTemp(string)', async t => {
	try {
		var filepath = await tempWrite('unicorn', 'test.png');

		t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
		t.is(path.basename(filepath), 'test.png');
		t.end();
	}
	catch (err) {
		t.fail(err);
		t.end();
	}
});

test('writeTemp(buffer)', async t => {
	try {
		var filepath = await tempWrite(new Buffer('unicorn'), 'test.png');

		t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
		t.end();
	}
	catch (err) {
		t.fail(err);
		t.end();
	}
});

test('writeTemp(string, path)', async t => {
	try {
		var filepath = await tempWrite(new Buffer('unicorn'), 'foo/bar/test.png');

		t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
		t.regexTest(/foo\/bar\/test\.png$/, filepath);
		t.end();
	}
	catch (err) {
		t.fail(err);
		t.end();
	}
});

test('writeTemp.sync()', t => {
	t.is(fs.readFileSync(tempWrite.sync('unicorn'), 'utf8'), 'unicorn');
	t.end();
});
