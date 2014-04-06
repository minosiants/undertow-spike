'use strict';

var gulp = require('gulp'),
	refresh = require('gulp-livereload'),
  browserSync = require('browser-sync'),
	livereload = require('tiny-lr'),
	server = livereload(),
	hogan = require('gulp-hogan-compile');



gulp.task('css', function () {
  gulp.src('app/**/*.css').pipe(refresh(server));
});
gulp.task('html', function () {
  gulp.src('app/**/*.html').pipe(refresh(server));
});
gulp.task('js', function () {
  gulp.src('app/**/*.js').pipe(refresh(server));
});

gulp.task('hogan', function () {
  gulp.src('templates/**/*.hogan')
    .pipe(hogan('templates.js', {
      hoganModule: '.app/hogan'
    }))
    .pipe(gulp.dest('build'))
    .pipe(refresh(server));
});

gulp.task('default',['browser-sync'], function () {
  gulp.watch('app/**/*.css',['css']);
  gulp.watch('app/**/*.js',['js']);  
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('templates/**/*.hogan', ['hogan']);
});

gulp.task('browser-sync', function() {
    browserSync.init(["app/**/*.css" ,"**/*.html", "app/**/*.js"], {
        server: {
            baseDir: "./app/"
        }
    });
});
