 let gulp = require('gulp'),
     postcss = require('gulp-postcss'),
     autoprefixer = require('autoprefixer'),
     cssvars = require('postcss-simple-vars'),
     nested = require('postcss-nested'),
     cssImport = require('postcss-import'),
     mixins = require('postcss-mixins'),
     hexrgba = require('postcss-hexrgba');
 gulp.task('styles', function() {
     return gulp.src('./src/styles/*.css')
         .pipe(postcss([cssImport, mixins, nested, cssvars, hexrgba, autoprefixer]))
         .on('error', function(errorInfo) {
             console.log(errorInfo.toString());
             this.emit('end');
         })
         .pipe(gulp.dest('./public/styles'));
 }); // eslint-disable-line