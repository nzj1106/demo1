//引用gulp
var gulp = require('gulp');
// 引用gulp-htmlmin
var htmlmin = require('gulp-htmlmin');
// 编译less文件
var less = require('gulp-less');
// less转成css
var cssnano = require('gulp-cssnano');
// 压缩js文件
var uglify = require('gulp-uglify');
// 开启一个同步服务
var browserSync = require('browser-sync').create();

gulp.task("html",function(){
	gulp.src('src/**/*.html')
	.pipe(htmlmin({
		removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
	}))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.reload({stream:true}));
})

gulp.task('less',function(){
	gulp.src('src/less/**/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({stream:true}));
})

gulp.task('js',function(){
	gulp.src('src/js/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({stream:true}));
})

// 监视文件
gulp.task('watch',['html','less','js'],function(){
	gulp.watch('src/**/*.html',['html']);
	gulp.watch('src/less/**/*.less',['less']);
	gulp.watch('src/js/**/*.js',['js']);
})
// 自动更新
gulp.task('serve',function(){
	browserSync.init({
		server:{
			baseDir:'dist/'
		}
	})
})
gulp.task('default',['watch','serve']);