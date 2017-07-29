const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('pre-test', () => {
    return gulp.src([
            './src/data/**/*.js',
            './src/models/**/*.js',
            // Triabva da se dobaviat oste
        ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});


gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
            './src/test/unit/**/*.js',
            './src/test/integration/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports());
});