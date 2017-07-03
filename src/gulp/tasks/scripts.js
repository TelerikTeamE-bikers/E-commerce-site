let gulp = require('gulp'),
    webpack = require('webpack');
//using the configuration in webpack.config.js
gulp.task('scripts', function(callback) {
    webpack(require('../../../webpack.config'), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});