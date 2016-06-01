/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'), //基础库
    imagemin = require('gulp-imagemin'), //图片压缩
    minifycss = require('gulp-minify-css'), //css压缩
    uglify = require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    clean = require('gulp-clean'), //清空文件夹
    htmlmin = require('gulp-htmlmin');

// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './public/';

    var options = {
        removeComments: false,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };

    gulp.src(htmlSrc)
        // .pipe(uglify())
        .pipe(htmlmin(options))
        .pipe(gulp.dest(htmlDst))
});

// 样式处理
gulp.task('css', function() {
    var cssSrc = './src/css/*.css',
        cssDst = './public/css';
    gulp.src(cssSrc)
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst));
});

// 图片处理
gulp.task('image', function() {
    var imgSrc = './src/image/*',
        imgDst = './public/image';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
})

// js处理
gulp.task('js', function() {
    var jsSrc = './src/js/*.js',
        jsDst = './public/js';
    gulp.src(jsSrc)
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./public/css', './public/js', './public/image'], { read: false })
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function() {
    gulp.start('html', 'css', 'image', 'js');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {

    server.listen(port, function(err) {
        if (err) {
            return console.log(err);
        }
        // 监听html
        gulp.watch('./src/*.html', function(event) {
            gulp.run('html');
        })
        // 监听css
        gulp.watch('./src/css/*.css', function() {
            gulp.run('css');
        });
        // 监听images
        gulp.watch('./src/image/*', function() {
            gulp.run('image');
        });
        // 监听js
        gulp.watch('./src/js/*.js', function() {
            gulp.run('js');
        });
    });
});
