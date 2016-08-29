var through = require('through2');

function handleStream() {
    var stream = through();
    return stream;
}

function gulpCssVersionUrl(version) {
	var needle = /url\(['"]?((?!data)[^'"\s]+)['"]?\)/g;
    var replacement;

    if (!version) {
        version = Date.now();
    }

    return through.obj(function (file, enc, cb) {

		replacement = 'url("$1?v=' + version + '")';

        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            file.contents = file.contents.pipe(replace(needle, replacement));
        } else if (file.isBuffer()) {
            file.contents = new Buffer(String(file.contents).replace(needle, replacement));
        }

        return cb(null, file);
    });
}

module.exports = gulpCssVersionUrl;
