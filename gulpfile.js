// import gulp from 'gulp'
// import gulpSass from 'gulp-sass'
// import gulpSourcemaps from 'gulp-sourcemaps'
// import gulpAutoprefixer from 'gulp-autoprefixer'
// import gulpConcat from 'gulp-concat'
// import gulpCleanCss from 'gulp-clean-css'
// import gulpIf from 'gulp-if'
// import browserSync from 'browser-sync'
const gulp = require('gulp')
const gulpSass = require('gulp-sass')
const gulpSourcemaps = require('gulp-sourcemaps')
const gulpAutoprefixer = require('gulp-autoprefixer')
const gulpConcat = require('gulp-concat')
const gulpCleanCss = require('gulp-clean-css')
const gulpIf = require('gulp-if')
const browserSync = require('browser-sync').create()

const config = {
    paths: {
        scss: './src/scss/**/*.scss',
        html: './public/index.html',
    },
    output: {
        cssName: 'bundle.min.css',
        path: './public',
    },
    isDevelop: true,
}

// gulp.task( 'scss', () => {
//     return gulp.src( config.paths.scss )
//         .pipe( gulpIf( config.isDevelop, gulpSourcemaps.init() ) )
//         .pipe( gulpSass() )
//         .pipe( gulpConcat( config.output.cssName ) )
//         .pipe( gulpAutoprefixer() )
//         .pipe( gulpIf( config.isDevelop, gulpSourcemaps.write() ) )
//         .pipe( gulpIf( !config.isDevelop, gulpCleanCss() ) )
//         .pipe( gulp.dest( config.output.path ) )
//         .pipe( browserSync.stream() )
// })

// gulp.task( 'serve', () => {
//     browserSync.init({
//         server: {
//             baseDir: config.output.path,
//         },
//     })

//     gulp.watch( config.paths.scss, ['scss'] )
//     gulp.watch( config.paths.html ).on( 'change', browserSync.reload )
// })

const scss = () => {
    return gulp.src( config.paths.scss )
        .pipe( gulpIf( config.isDevelop, gulpSourcemaps.init() ) )
        .pipe( gulpSass() )
        .pipe( gulpConcat( config.output.cssName ) )
        .pipe( gulpAutoprefixer() )
        .pipe( gulpIf( config.isDevelop, gulpSourcemaps.write() ) )
        .pipe( gulpIf( !config.isDevelop, gulpCleanCss() ) )
        .pipe( gulp.dest( config.output.path ) )
        .pipe( browserSync.stream() )
}

const serve = () => {
    browserSync.init({
        server: {
            baseDir: config.output.path,
        },
    })

    gulp.watch( config.paths.scss, ['scss'] )
    gulp.watch( config.paths.html ).on( 'change', browserSync.reload )
}

// gulp.task( 'default', ['scss'] )
function defaultTask(cb) {
    scss()
    // serve()
    cb();
  }
  
  exports.default = defaultTask