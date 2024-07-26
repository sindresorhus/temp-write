import fs from 'node:fs';
import path from 'node:path';
import stream from 'node:stream';
import test from 'ava';
import {stringToUint8Array} from 'uint8array-extras';
import tempWrite from './index.js';

test('tempWrite(string)', async t => {
	const filePath = await tempWrite('unicorn', 'test.png');
	t.is(fs.readFileSync(filePath, 'utf8'), 'unicorn');
	t.is(path.basename(filePath), 'test.png');
});

test('tempWrite(data)', async t => {
	const filePath = await tempWrite(stringToUint8Array('unicorn'), 'test.png');
	t.is(fs.readFileSync(filePath, 'utf8'), 'unicorn');
});

test('tempWrite(data, path)', async t => {
	const filePath = await tempWrite(stringToUint8Array('unicorn'), 'foo/bar/test.png');
	t.is(fs.readFileSync(filePath, 'utf8'), 'unicorn');
	t.regex(filePath, /foo\/bar\/test\.png$/);
});

test('tempWrite(stream)', async t => {
	const readable = new stream.Readable({
		read() {}, // Noop
	});

	readable.push('unicorn');
	readable.push(null); // eslint-disable-line unicorn/no-array-push-push

	const filePath = await tempWrite(readable, 'test.png');
	t.is(fs.readFileSync(filePath, 'utf8'), 'unicorn');
});

test('tempWrite.sync()', t => {
	t.is(fs.readFileSync(tempWrite.sync('unicorn'), 'utf8'), 'unicorn');
});
