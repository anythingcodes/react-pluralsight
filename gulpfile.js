"use strict";

var gulp = require("gulp");
var connect = require("gulp-connect"); // Runs a local dev server
var open = require("gulp-open"); // Opens a URL in a browser
var browserify = require("browserify"); // Bundles JS
var reactify = require("reactify"); // Transforms React JSX to JS
var source = require("vinyl-source-stream"); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Concatenates files
var lint = require('gulp-eslint'); // Lint JS files, including JSX

var config = {
    port: 9005,
    devBaseUrl: 'http://anything.codes/react-pluralsight',
    paths: {
        html: './src/*.html', // any HTML files in src folder is matched
        js: './src/**/*.js',
        images: './src/images/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
};

// Start a local dev server
gulp.task('connect', function() {

    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true // any time files change, will reload source in browser
    });

});

gulp.task('open', ['connect'], function(){ // when you run the task open, first run the task connect (dependency!)
    gulp.src('dist/index.html').pipe(open({ uri: config.devBaseUrl + ":" + config.port + "/"})); // get index.html and then open it at this URL
});

gulp.task('html', function() {
    gulp.src(config.paths.html).pipe(gulp.dest(config.paths.dist)).pipe(connect.reload());
    // go get any HTML files, put in destination path, and finally reload using connect (connect = the dev server we downloaded from npm)
});

gulp.task('js', function(){
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function(){
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + "/css"));
});

gulp.task('images', function(){
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

  //publish favicon
  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function(){
    return gulp.src(config.paths.js)
        // need to return results of function so we see the output of our linting
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['html']); // any time something changes in here, run the html task
    gulp.watch(config.paths.js, ['js', 'lint']); // also need to lint when JS changes
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']); // now if you type gulp in cmd, it will run the html, open, and watch tasks by default
