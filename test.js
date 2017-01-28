import fs from 'fs';
import path from 'path';
import stream from 'stream';
import test from 'ava';
import m from './';

test('tempWrite(string)', async t => {
	const filepath = await m('unicorn', 'test.png');
	t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
	t.is(path.basename(filepath), 'test.png');
});

test('tempWrite(stream)', async t => {
	const readable = new stream.Readable({
		read() { /* noop */ }
	});
	readable.push('unicorn');
	readable.push(null);
	const filepath = await m(readable, 'test.png');
	t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
});

test('tempWrite(buffer)', async t => {
	const filepath = await m(new Buffer('unicorn'), 'test.png');
	t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
});

test('tempWrite(buffer, path)', async t => {
	const filepath = await m(new Buffer('unicorn'), 'foo/bar/test.png');
	t.is(fs.readFileSync(filepath, 'utf8'), 'unicorn');
	t.regex(filepath, /foo\/bar\/test\.png$/);
});

test('tempWrite.sync()', t => {
	t.is(fs.readFileSync(m.sync('unicorn'), 'utf8'), 'unicorn');
});
