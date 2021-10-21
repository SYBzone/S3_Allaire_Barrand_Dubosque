var gulp = require('gulp');

gulp.task('bonjour', async function() {
    console.log('Bonjour tout le monde');
});
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var sourcemaps = require('gulp-sourcemaps');

gulp.task("less",function () {
    return gulp.src('./app/styles/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix],
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/styles'))
        ;
});

gulp.task('watch', function () {
    gulp.watch('./app/styles/**/*.less', gulp.series('less') );
});



var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');

gulp.task('bundle-js', function () {
    return browserify('./app/js/app.js')
        .transform('babelify', {
            "presets": ["@babel/preset-env"]
        })
        .bundle()
        .pipe(source('bundle.js')) // Converts To Vinyl Stream
        .pipe(buffer()) // Converts Vinyl Stream To Vinyl Buffer
        // Gulp Plugins Here (pour es5) !
        .pipe(gulp.dest('./dist/js'));
});



gulp.task('copy-html', function () {
    return gulp.src('./app/*.html')
        // Gulp Plugins içi ?
        .pipe(gulp.dest('./dist'));
});



gulp.task('copy-js', gulp.series('bundle-js', function () {
    return gulp.src('./app/js/**/*.js')
        // Gulp Plugins içi pour es6 ?
        .pipe(gulp.dest('./dist/js'));
}));

gulp.task('copy-css', gulp.series('less' , function () {
    return gulp.src('./app/styles/**/*.css')
        // Gulp Plugins içi ?
        .pipe(gulp.dest('./dist/styles'));
}));


gulp.task('dist',gulp.parallel('copy-html','copy-css','copy-js'));

var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './app'
        },
    })
});

gulp.task('watch', gulp.parallel('browserSync','less', function () {
    gulp.watch('./app/styles/**/*.less', gulp.series('less')).on('change', browserSync.reload);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
}));



