var gulp = require('gulp');
var flatten = require('gulp-flatten');
var notify = require('gulp-notify');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename'); 

// Task for moving index.html 
// and html templates to the dist folder
gulp.task('move', function(){

	//	Set the source
	gulp.src(['./src/index.html'])
	//	Pipe it and store it in the dist folder
	.pipe(gulp.dest('./dist'))
	//	Notify the user
	.pipe(notify('Moved index.html'));


	// Set the source. You can exclude files with !
	gulp.src(['!./src/index.html', './src/**/*.html'])
	// Remove any relative folders, subfolders
	.pipe(flatten())
	.pipe(gulp.dest('./dist/templates'))
	.pipe(notify('Moved templates'));

});

//	Task for concating and moving all js files
gulp.task('scripts', function(){
	gulp.src(['./src/app.js', './src/**/*.js'])
	// Concat all the js files into a single all.js file
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./dist/js'))
	.pipe(notify('Generated all.js'));
});

// Task for moving images
gulp.task('images', function() {
	gulp.src('./src/images/**/*')
  	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Task for compiling Sass
gulp.task('sass', function() {
  return sass('src/sass/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Sass task complete' }));
});

//	Task for running a webserver
gulp.task('serve', function(){
	gulp.src('.')
	// Start a webserver with livereload on localhost:48080
	.pipe(webserver({
		port: 48080,
		livereload: true,
		open: 'http://localhost:48080/dist/'
	}));

});

//	Task for running watchers. When watch is called
//	the serve task will be called as well
gulp.task('watch', ['serve'], function(){

	//	Run tasks on start
	gulp.start(['scripts', 'move', 'sass', 'images']);

	//	Create a watcher that will run the scripts task
	//	anytime a .js file changes
	gulp.watch(['./src/**/*.js'], ['scripts']);
	gulp.watch(['./src/**/*.html'], ['move']);
	gulp.watch(['./src/sass/main.scss'], ['sass']);
	gulp.watch(['./src/images/*'], ['images']);
});