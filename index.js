import {promisify} from 'node:util';
import path from 'node:path';
import stream from 'node:stream';
import {randomUUID} from 'node:crypto';
import fs from 'graceful-fs';
import {isStream} from 'is-stream';
import tempDirectory from 'temp-dir';

const writeFileP = promisify(fs.writeFile);
const mkdirP = promisify(fs.mkdir);
const pipelineP = promisify(stream.pipeline);
const tempfile = (filePath = '') => path.join(tempDirectory, randomUUID(), filePath);
const writeStream = async (filePath, data) => pipelineP(data, fs.createWriteStream(filePath));

export default async function tempWrite(fileContent, filePath) { // eslint-disable-line unicorn/prevent-abbreviations
	const temporaryPath = tempfile(filePath);
	const write = isStream(fileContent) ? writeStream : writeFileP;

	await mkdirP(path.dirname(temporaryPath), {recursive: true});
	await write(temporaryPath, fileContent);

	return temporaryPath;
}

tempWrite.sync = (fileContent, filePath) => {
	const temporaryPath = tempfile(filePath);

	fs.mkdirSync(path.dirname(temporaryPath), {recursive: true});
	fs.writeFileSync(temporaryPath, fileContent);

	return temporaryPath;
};
