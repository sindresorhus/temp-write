'use strict';
var path = require('path');
var osTmpdir = require('os-tmpdir');
var fs = require('graceful-fs');
var isStream = require('is-stream');
var mkdirp = require('mkdirp');
var uuid = require('uuid');
var pify = require('pify');
var Promise = require('pinkie-promise');

var TMP_DIR = osTmpdir();

function tempfile(filepath) {
	return path.join(TMP_DIR, uuid.v4(), (filepath || ''));
}

module.exports = function (str, filepath) {
	var fullpath = tempfile(filepath);

	return pify(mkdirp, Promise)(path.dirname(fullpath))
		.then(function () {
			const pipeStream = () => {
				return new Promise((resolve, reject) => {
					str.pipe(fs.createWriteStream(fullpath))
						.on('error', reject)
						.on('finish', resolve);
				});
			};
			return isStream(str) ? pipeStream() : pify(fs.writeFile, Promise)(fullpath, str);
		})
		.then(function () {
			return fullpath;
		});
};

module.exports.sync = function (str, filepath) {
	var fullpath = tempfile(filepath);

	mkdirp.sync(path.dirname(fullpath));
	fs.writeFileSync(fullpath, str);

	return fullpath;
};
