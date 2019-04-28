import fs from 'fs';
import path from 'path';
import stream from 'stream';
import test from 'ava';
import tempWrite from '.';

test('tempWrite(string)', async t => {
	const filePath = await tempWrite('unicorn', 'test.png');
	t.is(fs.readFileSync(filePath, 'utf8'), 'unicorn');
	t.is(path.basename(filePath), 'test.png');
});

test('tempWrite(buffer)', async t => {
	const filePath = await tempWrite(Buffer.from('unicorn'), 'test.png');
	t.is(fs.readFileSync(filePath, 'utf8'), 'unicorn');
});

test('tempWrite(buffer, path)', async t => {
	const filePath = await tempWrite(Buffer.from('unicorn'), 'foo/bar/test.png');
	t.is(fs.readFileSync(filePath, 'utf8'), 'unicorn');
	t.regex(filePath, /foo\/bar\/test\.png$/);
});

test('tempWrite(stream)', async t => {
	const readable = new stream.Readable({
		read() {} // Noop
	});
	readable.push('unicorn');
	readable.push(null);
	const filePath = await tempWrite(readable, 'test.png');
	t.is(fs.readFileSync(filePath, 'utf8'), 'unicorn');
});

test('tempWrite.sync()', t => {
	t.is(fs.readFileSync(tempWrite.sync('unicorn'), 'utf8'), 'unicorn');
});
