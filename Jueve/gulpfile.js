var gulp = require('gulp'),
    clone = require('gulp-clone'),
    merge = require('gulp-merge'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    wait = require('gulp-wait'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss');


// CSS via Sass and Autoprefixer
gulp.task('styles', function() {
  var source = gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(wait(500))
    .pipe(sass({
      outputStyle: 'nested',
      indentType: 'tab',
      indentWidth: 1
    }).on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
  
  var pipe1 = source.pipe(clone())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css'))

  var pipe2 = source.pipe(clone())
    .pipe(rename({
      basename: 'style',
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());

  return merge(pipe1, pipe2);
  
});



// Bundle and minify JS scripts
gulp.task('scripts', function() {
  return gulp.src([
    './src/js/*.js',
    './src/revolution/js/jquery.themepunch.tools.min.js',
    './src/revolution/js/jquery.themepunch.revolution.min.js',
    '!./src/js/jquery.min.js',
    '!./src/js/scripts.min.js'
  ])
    .pipe(concat('scripts.js'))
    .pipe(minify({
      noSource: true,
      ext: {
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('./src/js'))  
});

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});


// Watch files for changes
gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "src"
    }
  });

  gulp.watch(['./src/**/*.scss' ], gulp.series('styles'));
  gulp.watch(['./src/**/*.html']).on('change', browserSync.reload);
  gulp.watch(['./src/js/*.js', '!./src/js/scripts.min.js'], gulp.series(['scripts', 'reload']));
});

// Default
gulp.task('default', gulp.series('watch'));