var gulp        = require('gulp');
var path        = require('path');
var cssmin      = require('gulp-cssmin');
var less        = require('gulp-less');
var runSequence = require('run-sequence');

/**
 * Watch less files and compile on every change.
 */
gulp.task('watch', function () {
  return gulp.watch('./less/**/*.less', ['less']);
});

/**
 * Compile less file. Thsi task will not minify the css. Use `cssmin` for that.
 */
gulp.task('less', function () {
  return gulp.src('./less/global.less')
    .pipe(less())
    .pipe(gulp.dest('./css'));
});

/**
 * Minify css files.
 */
gulp.task('cssmin', function () {
  return gulp.src('./css/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./css'));
});

/**
 * Defaukt task for Gulp. Compile less and start watch task.
 */
gulp.task('default', ['less', 'watch']);

/**
 * Build task. Currently it will compile less file and minify it.
 */
gulp.task('build', function () {
  runSequence(
    'less',
    'cssmin'
  );
});
