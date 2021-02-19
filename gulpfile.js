const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const sync = require('browser-sync').create()
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')



function html() {
    return (
        //брать все файлы в папке src с расширением .html
        src('src/**.html')
            .pipe(include({
                prefix: '@@'
            }))
            //минификация html файлов убираем пробелы collapswhitespace
            // .pipe(htmlmin({
            //     collapseWhitespace: true
            // }))
            //добавить в папку dist сгенирированые файлы
            .pipe(dest('dist'))
    )
}
function scss() {
    return (
        //брать все файлы в папке src/scss с расширением .scss
        src('src/scss/index.scss')
            //сгенирировать с помощью пакета sass файлы scss в css
            .pipe(sass())
            //добавляем автопрефиксы
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            //минификация css
            // .pipe(csso())
        // соединяем все в один файл
            .pipe(concat('index.css'))
            .pipe(dest('dist/css'))
    )
}
function images() {
    return (
        src('src/images/*.+(png|jpg|gif|ico|svg|webp)')
            //добавить в папку dist сгенирированые файлы
            // .pipe(imagemin({
            //     progressive: true,
            //     svgPlugins: [{removeViewBox: false}],
            //     interlaced: true,
            //     optimizationLevel: 3
            // }))
            .pipe(dest('dist/images'))
    )
}
function css() {
    return (
        src('src/css/**.css')
            //добавить в папку dist сгенирированые файлы
            // .pipe(imagemin({
            //     progressive: true,
            //     svgPlugins: [{removeViewBox: false}],
            //     interlaced: true,
            //     optimizationLevel: 3
            // }))
            .pipe(dest('dist/css'))
    )
}
function js() {
    return (
        src('src/js/**.js')
            .pipe(dest('dist/js'))
    )
}

function clear() {
    return (
        //очищаем папку dist
        del('dist')
    )
}
function serve() {
    //организовываем сервер
    sync.init({
        server: './dist'
    })
    //наблюдаем за файлами .html  и если что то изменилось запускаем последовательность действий,
    //в данном случае (html) и если что то изменилось ('change') обращаемся к серверу sync и перезапускаем его
    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/parts/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
    watch('src/images/*.+(png|jpg|gif|ico|svg|webp)', series(images)).on('change', sync.reload)
    watch('src/js/**.js', series(js)).on('change', sync.reload)
    watch('src/css/**.css', series(css)).on('change', sync.reload)
}

//series-позволяет вызывать последовательно определенные действия
exports.build = series(clear, scss, html, js, css, images)
exports.serve = series(clear, scss, html, js, css, images, serve)
exports.clear = clear