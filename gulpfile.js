/**
 *@class gulpfile.js
 *@description gulp 配置文件
 *@time 2014-11-28 10:12
 *@author StarZou
 **/

var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var del = require('del');

/**
 * 主目录
 */
var root = 'public/';

/**
 * 清空build目录
 */
gulp.task('clean', function (cb) {
    del(root + 'build', cb);
});

/**
 * 复制资源文件
 */
gulp.task('copy-assets', function () {
    gulp.src(root + 'src/assets/**/*')
        .pipe(gulp.dest(root + 'build'));
});

/**
 * 复制,压缩 html模板文件
 */
gulp.task('copy-templates', function () {
    gulp.src(root + 'src/app/**/*.html')
        .pipe(usemin({
            html: [minifyHtml({empty: true, quotes: true})]
        }))
        .pipe(gulp.dest(root + 'build'));
});

/**
 * 压缩首页, 会压缩引用的css, js
 */
gulp.task('usemin', function () {
    return gulp.src(root + 'src/index.html')
        .pipe(usemin({
            css : [minifyCss(), rev()],
            html: [minifyHtml({empty: true, quotes: true})],
            js  : [uglify(), rev()]
        }))
        .pipe(gulp.dest(root + 'build/'));
});

/**
 * 默认任务 : 依次执行 下面任务
 * 使用 命令行: gulp运行
 */
gulp.task('default', function (cb) {
    runSequence('clean', ['usemin', 'copy-templates', 'copy-assets'], cb);
});