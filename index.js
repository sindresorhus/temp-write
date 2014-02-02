'use strict';
var path = require('path');
var tmpdir = require('os').tmpdir();
var fs = require('graceful-fs');
var uuid = require('uuid');

function tempfile(filename) {
	return path.join(tmpdir, uuid.v4(), (filename || ''));
}

module.exports = function (str, filename, cb) {
	if (typeof filename === 'function') {
		cb = filename;
		filename = null;
	}


	var filepath = tempfile(filename);

	fs.mkdir(path.dirname(filepath), function (err) {
		if (err && err.code !== 'EEXIST') {
			return cb(err);
		}

		fs.writeFile(filepath, str, function (err) {
			cb(err, filepath);
		});
	});
};

module.exports.sync = function (str, filename) {
	var filepath = tempfile(filename);

	try {
		fs.mkdirSync(path.dirname(filepath));
	} catch (err) {
		if (err.code !== 'EEXIST') {
			throw err;
		}
	}

	fs.writeFileSync(filepath, str);
	return filepath;
};
