const gulp = require('gulp');
const watch = require('gulp-watch');

gulp.task('watch', function() {
    //  if there is change in some css file immediately 
    //  run postcss modules and move files to gulp.dest(/public/styles)
    watch('./src/styles/**/*.css', function() {
        gulp.start('styles');
    });

    //  if there is a change in some js file it automatically 
    // run webpack and bundle files and move files to gulp.dest(/public/scripts)
    watch('./src/scripts/**/*.js', function() {
        gulp.start('scripts');
    });
}); // eslint-disable-line