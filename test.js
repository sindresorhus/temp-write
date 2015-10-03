import fs from 'fs';
import test from 'ava';
import path from 'path';
import tempWrite from './';

test('tempWrite(string)', async t => {
	const filepath = await tempWrite('unicorn', 'test.png');

	t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
	t.is(path.basename(filepath), 'test.png');
	t.end();
});

test('tempWrite(buffer)', async t => {
	const filepath = await tempWrite(new Buffer('unicorn'), 'test.png');

	t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
	t.end();
});

test('tempWrite(string, path)', async t => {
	const filepath = await tempWrite(new Buffer('unicorn'), 'foo/bar/test.png');

	t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
	t.regexTest(/foo\/bar\/test\.png$/, filepath);
	t.end();
});

test('tempWrite.sync()', t => {
	t.is(fs.readFileSync(tempWrite.sync('unicorn'), 'utf8'), 'unicorn');
	t.end();
});
