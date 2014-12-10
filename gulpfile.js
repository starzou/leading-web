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
var runSequence = require('run-sequence');

/**
 * 主目录 路径
 */
var root = 'public/';

/**
 * 首页 路径
 */
var indexPath = 'src/index3.html';

/**
 * 清空 dist目录
 */
gulp.task('clean', function (cb) {
    del(root + 'dist', cb);
});

/**
 * 复制 资源文件
 */
gulp.task('copy-assets', function () {
    gulp.src(root + 'src/assets/**/*')
        .pipe(gulp.dest(root + 'dist/assets'));
});

/**
 * 复制 字体文件
 */
gulp.task('copy-fonts', function () {
    gulp.src([root + 'bower_components/font-awesome/fonts/*', root + 'bower_components/simple-line-icons/fonts/*', root + 'bower_components/bootstrap/dist/fonts/*'])
        .pipe(gulp.dest(root + 'dist/assets/fonts'));
});

/**
 * 复制,压缩 控制器html模板文件
 */
gulp.task('copy-controller-templates', function () {
    gulp.src(root + 'src/app/**/*.html')
        .pipe(usemin({
            html: [minifyHtml({empty: true, quotes: true})]
        }))
        .pipe(gulp.dest(root + 'dist/app'));
});

/**
 * 复制,压缩 指令html模板文件
 */
gulp.task('copy-directive-templates', function () {
    gulp.src(root + 'src/common/**/*.html')
        .pipe(usemin({
            html: [minifyHtml({empty: true, quotes: true})]
        }))
        .pipe(gulp.dest(root + 'dist/common'));
});

/**
 * 压缩首页, 会压缩引用的css, js
 */
gulp.task('minimize-index', function () {
    return gulp.src(root + indexPath)
        .pipe(usemin({
            css : [minifyCss(), rev()],
            html: [minifyHtml({empty: true, quotes: true})],
            js  : [uglify(), rev()]
        }))
        .pipe(gulp.dest(root + 'dist/'));
});

/**
 * 默认任务 : 依次执行 下面任务
 * 使用 命令行: gulp运行
 */
gulp.task('default', function (cb) {
    runSequence('clean', ['minimize-index', 'copy-controller-templates', 'copy-directive-templates', 'copy-assets', 'copy-fonts'], cb);
});