import fs from 'fs';
import path from 'path';
import test from 'ava';
import fn from './';

test('tempWrite(string)', async t => {
	const filepath = await fn('unicorn', 'test.png');

	t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
	t.is(path.basename(filepath), 'test.png');
});

test('tempWrite(buffer)', async t => {
	const filepath = await fn(new Buffer('unicorn'), 'test.png');

	t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
});

test('tempWrite(string, path)', async t => {
	const filepath = await fn(new Buffer('unicorn'), 'foo/bar/test.png');

	t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
	t.regexTest(/foo\/bar\/test\.png$/, filepath);
});

test('tempWrite.sync()', t => {
	t.is(fs.readFileSync(fn.sync('unicorn'), 'utf8'), 'unicorn');
	t.end();
});
