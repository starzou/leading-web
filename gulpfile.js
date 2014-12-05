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

var root = 'public/'; // 主目录

/**
 * 清空build目录
 */
gulp.task('clean', function (cb) {
    del('build', cb);
});

gulp.task('usemin', function () {
    return gulp.src(root + 'src/index.html')
        .pipe(usemin({
            css : [minifyCss(), 'concat', rev()],
            html: [minifyHtml({empty: true, quotes: true})],
            js  : [uglify(), rev()]
        }))
        .pipe(gulp.dest(root + 'build/'));
});

/**
 * 默认任务 :
 * 使用 命令行: gulp运行
 */
gulp.task('default', function () {
    console.log('run default...');
});