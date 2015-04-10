/*
|--------------------------------------------------------------------------
| Bootstrap Gulp Tasks and Declare Default Task
|--------------------------------------------------------------------------
|
| Here we bootstrap gulp task and declare default gulp task. Every other tasks
| should be placed in `tasks` folder and it will be loaded automatically.
|
*/

var gulp = require('gulp');
var util = require('gulp-util');
var requireDir = require('require-dir');

// If gulp is executed with option of `production` flag, do not include
// development related tasks.
requireDir('./tasks', { recurse: util.env.production ? false : true });

/**
 * Default task for gulp.
 */
gulp.task('default', ['build']);
