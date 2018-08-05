const gulp = require('gulp')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')

const autoprefixerOptions = {
    browsers: ['last 2 versions']
}

// Static server
gulp.task('serve', () => {
    browserSync.init({
        server: './'
    })
    gulp.watch('js/*.js', ['js'])
    gulp.watch('scss/*.scss', ['sass'])
    gulp.watch('*.html').on('change', browserSync.reload)
})

// Sass
gulp.task('sass', () => {
    gulp.src('scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream())
})

// Javascript
gulp.task('js', () => {
    gulp.src('js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('scripts'))
        .pipe(browserSync.stream())
})

gulp.task('default', ['sass', 'js', 'serve'])
