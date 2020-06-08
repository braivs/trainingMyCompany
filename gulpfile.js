var
	gulp = require('gulp'),
	livereload = require("gulp-livereload"),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	pug =  require('gulp-pug'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass-compile', function(){
	return gulp.src('source/sass/*.sass')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('docs/css/'))
})

gulp.task('pug', function(){
	return gulp.src('source/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('docs/'))
})

gulp.task('reload-css', function() {
	return gulp.src('docs/css/*.css')
	.pipe(livereload())
});

gulp.task('reload-html', function() {
	return gulp.src('docs/*.html')
	.pipe(livereload())
	//
});


gulp.task('default', function(){
	gulp.watch('source/sass/*.sass', gulp.series('sass-compile'))
	gulp.watch('source/**/*.pug', gulp.series('pug'))
	livereload.listen()
	gulp.watch('docs/css/*.css', gulp.series('reload-css'))
	gulp.watch('docs/*.html', gulp.series('reload-html'))
})
