//convert less to css file
var gulp = require("gulp"),
	fs = require("fs"),
	less = require("gulp-less"),
	cleanCSS = require('gulp-clean-css');
var uglifycss = require('gulp-uglifycss');

gulp.task("0-build_less", function () {
	return gulp.src('wwwroot/css/default.less')
		.pipe(less())
		.pipe(gulp.dest('wwwroot/css/'));
});

gulp.task('1-minify-css', function () {
	gulp.src('wwwroot/css/default.css')
		.pipe(uglifycss({
			"maxLineLen": 80,
			"uglyComments": true
		}))
		.pipe(gulp.dest('wwwroot/css/'));
});

//join all 3rd library to 1 file to reduce response files
var concat = require('gulp-concat');

//3rd css
gulp.task('1-build_css_lib',
	function () {
		return gulp.src([
			'./node_modules/bootstrap/dist/css/bootstrap.min.css'
		])
			.pipe(concat('lib.css'))
			.pipe(gulp.dest('wwwroot/css/'));
	});


//Library javascript
gulp.task('1-build_js_lib',
	function () {
		return gulp.src([
				'./node_modules/jquery/dist/jquery.min.js',
				'./node_modules/popper.js/dist/umd/popper.min.js',
				'./node_modules/tether/dist/js/tether.min.js',
				'./node_modules/bootstrap/dist/js/bootstrap.min.js',
				'./node_modules/angular/angular.min.js',
				'./node_modules/angular-sanitize/angular-sanitize.min.js',
				'./node_modules/angular-cookies/angular-cookies.min.js',
				'./node_modules/angular-md5/angular-md5.min.js',
				'./node_modules/angular-modal-service/dst/angular-modal-service.min.js',
				'./node_modules/angular-ui-notification/dist/angular-ui-notification.min.js'
		])
			.pipe(concat('lib.js'))
			.pipe(gulp.dest('wwwroot/js/_dist'));
	});
