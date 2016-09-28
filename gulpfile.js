/**
 * required modules
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');

/**
 * importing config variables
 */
var config = require('./config');

/**
 * task to bundle all the javscript files from scripts folder
 */
gulp.task('scripts', function() {

  var bundler = watchify(browserify(config.ROOT_DIR + '/Root.jsx'), {
    extensions: config.BROWSERIFY_EXTENSIONS
  });

  var compile = function() {
    bundler
      .transform('babelify')
      .bundle()
      .pipe(source(config.MAIN_JS_FILE))
      .pipe(gulp.dest(config.APP_ROOT_DIR + '/build'))
  }

  bundler.on('update', function() {
    compile();
    gutil.log('Re bundling javascript files...');
  })

  gutil.log('Bundling javascript files...');
  return compile();

});

/**
 * task to start browserSync
 */
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: config.APP_ROOT_DIR
    },
    ghostMode: false
  });
  gulp.watch(config.APP_ROOT_DIR + '/build/' + config.MAIN_JS_FILE, browserSync.reload);
});

/**
 * default task for gulp
 */
gulp.task('default', ['scripts', 'browserSync'], function() {
  gutil.log('Gulp initiating your project');
});
