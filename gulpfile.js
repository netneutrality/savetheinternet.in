var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

// Task
gulp.task('default', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: 'app.js',
		watch : ['src/js/main.js' , 'src/index.html', 'app.js']
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('src/index.html')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	})

	//ToDo watch for changes to foll files and restart those browser if there is a change

})
