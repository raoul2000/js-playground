var gulp = require('gulp');
var argv = require('yargs').argv;
var del = require('del');
var print = require('gulp-print');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('cli-play', function() {
  console.log(argv);
});

gulp.task('clean', function () {
  var basePath =  argv.project ? argv.project + '/' : '';
  console.log("deleting "+basePath);
  return del([
    basePath + '/build/**/*',
  ]);
});

gulp.task('build-project-A', function(){
   return gulp.src('project-A/server/**/*')
    .pipe(print())
    .pipe(gulp.dest('project-A/build'));
});

gulp.task('build-all', function(){
   return gulp.src('*/server/**/*')
    .pipe(print())
    .pipe(gulp.dest('build'));
});
