var es6 = require('es6-promise').polyfill();
var gulp = require ('gulp'), // rewrite and versioning
    livereload = require('gulp-livereload'), //livereload
    sass = require('gulp-sass'), // Conversion des SCSS en CSS
    minifyCss = require('gulp-minify-css'), // Minification des CSS
    rename = require('gulp-rename'), // Minification des CSS
    autoprefixer = require('gulp-autoprefixer'), // Minification des CSS
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    clean = require("gulp-clean");

var paths = {
    js : ['./app/components/*/*.module.js', './app/components/*/*.services.js', './app/components/*/*.routing.js', './app/components/*/*.controllers.js'],
    scss : ['./app/Styles/*.scss', './app/components/*/*.scss'],
    trans : ['./app/Translations/*.trans.js', './app/Translations/transconfig.js']
};

// SCSS TASK
gulp.task('css', function()
{
    return gulp.src(paths.scss)    // Prend en entrée les fichiers *.scss
        .pipe(sass())                      // Compile les fichiers
        .pipe(minifyCss({keepBreaks: false}))   // Minifie le CSS qui a été généré
        .pipe(rename('styles.min.css'))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/web/'))  // Sauvegarde le tout dans /src/assets/css
        .pipe(livereload());
});

// task
gulp.task('minify-js', function () {
    gulp.src(paths.js) // path to your files
        .pipe(concat('tmp/concatjs.js'))
        .pipe(gulp.dest('./app/web/'))
        .pipe(rename('application.min.js'))
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest('./app/web/'));
});

gulp.task('compile-translations', function () {
    gulp.src(paths.trans) // path to your files
        .pipe(concat('tmp/concattrans.js'))
        .pipe(gulp.dest('./app/web/'))
        .pipe(rename('translations.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/web/'));
    /*   gulp.src('./app/web/tmp/concattrans.js', {read: false})
     .pipe(clean({force: true}))
     .pipe(gulp.dest('app/web/tmp'));*/
});


// WATCH TASK
gulp.task('watch', function()
{
    livereload.listen();
    gulp.watch(paths.scss, ['css']);
    gulp.watch(paths.js, ['minify-js']);
    gulp.watch(paths.trans, ['compile-translations']);
});

gulp.task('default', ['css', 'minify-js', 'compile-translations', 'watch']);
