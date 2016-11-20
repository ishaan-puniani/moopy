var gulp = require('gulp');
var cp = require('child_process');
var del = require('del');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');

/**
 * Build (Webpack)
 */

gulp.task('clean:build', function () {
    del('./dist')
})

gulp.task('build', ['clean:build'], function () {
    return gulp.src('./src/app/app.js')
        .pipe(webpack(webpackConfig))
        .on('error', function handleError() {
            this.emit('end'); // Recover from errors
        })
        .pipe(gulp.dest('./'));
});

gulp.task('watch:build', function () {
    return gulp.watch('./src/app/**/*', ['build']);
});


gulp.task('copy:server', function () {
    return gulp.src(['./src/server/**/*']).pipe(gulp.dest('./dist/server'));
});
gulp.task('copy:files', function () {
    return gulp.src(['./index.html']).pipe(gulp.dest('./dist/server'));
});
gulp.task('copy:css', function () {
    return gulp.src(['./src/css/styles.css']).pipe(gulp.dest('./dist/app/css'));
});
gulp.task('copy:package', function () {
    return gulp.src(['./package.json']).pipe(gulp.dest('./dist'));
});

/**
 * Node Server (Express)
 */

gulp.task('serve:node',['package'] ,function (done) {
    nodemon({
        exec: 'node ./node_modules/babel-cli/bin/babel-node.js ./dist/server/server.js',
        watch: ['server.js'],
        ext: 'js html'
    });
});


/**
 * Main tasks
 */

gulp.task('serve', ['serve:node']);

gulp.task('package', ['build', 'copy:server', 'copy:package', 'copy:css', 'copy:files']);
gulp.task('watch', ['build', 'watch:build']);
gulp.task('default', ['serve']);
