'use strict';
const {promisify} = require('util');
const path = require('path');
const stream = require('stream');
const fs = require('graceful-fs');
const isStream = require('is-stream');
const makeDir = require('make-dir');
const uuid = require('uuid');
const tempDir = require('temp-dir');

const writeFileP = promisify(fs.writeFile);
const pipelineP = promisify(stream.pipeline);

const tempfile = filePath => path.join(tempDir, uuid.v4(), (filePath || ''));

const writeStream = async (filePath, fileContent) => {
	await pipelineP(fileContent, fs.createWriteStream(filePath));
};

module.exports = async (fileContent, filePath) => {
	const tempPath = tempfile(filePath);
	const write = isStream(fileContent) ? writeStream : writeFileP;

	await makeDir(path.dirname(tempPath));
	await write(tempPath, fileContent);

	return tempPath;
};

module.exports.sync = (fileContent, filePath) => {
	const tempPath = tempfile(filePath);

	makeDir.sync(path.dirname(tempPath));
	fs.writeFileSync(tempPath, fileContent);

	return tempPath;
};
