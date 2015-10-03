'use strict';
var path = require('path');
var osTmpdir = require('os-tmpdir');
var fs = require('graceful-fs');
var mkdirp = require('mkdirp');
var uuid = require('uuid');
var PinkiePromise = require('pinkie-promise');
var TMP_DIR = osTmpdir();

function tempfile(filepath) {
	return path.join(TMP_DIR, uuid.v4(), (filepath || ''));
}

module.exports = function (str, filepath) {
	return new PinkiePromise(function (resolve, reject) {
		var fullpath = tempfile(filepath);

		mkdirp(path.dirname(fullpath), function (err) {
			if (err) {
				return reject(err);
			}

			fs.writeFile(fullpath, str, function (err) {
				if (err) {
					return reject(err);
				}

				resolve(fullpath);
			});
		});
	});
};

module.exports.sync = function (str, filepath) {
	var fullpath = tempfile(filepath);

	mkdirp.sync(path.dirname(fullpath));
	fs.writeFileSync(fullpath, str);

	return fullpath;
};
