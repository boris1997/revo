let project_folder = "dist";
let source_folder = 'public';



let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js",
        assets: project_folder + "/assets/",
        favicons: project_folder + "/assets/favicon/",
        fonts: project_folder + "/fonts/"
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/css/**/*.scss",
        js: source_folder + "/js/**/*.js",
        assets: [source_folder + "/assets/**/*.{jpg,png,svg,gif,ico,mp4}", "!" + source_folder + "/assets/favicon/**/*.{jpg,png,svg,gif,ico,mp4}"],
        favicons: source_folder + "/assets/favicon/**/*.{jpg,png,svg,gif,ico,mp4}",
        fonts: source_folder + "/fonts/**/*.{ttf,woff,woff2,eot,css}"
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/css/**/*.scss",
        js: source_folder + "/js/**/*.js",
        assets: source_folder + "/assets/**/*.{jpg,png,svg,gif,ico,mp4}"
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require("gulp-file-include"),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    terser = require('gulp-terser'),
    concat = require('gulp-concat'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    scss = require('gulp-dart-sass'),
    babel = require('gulp-babel')
/*  videofy = require('videofy'), */
fs = require('fs')


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function images() {
    return src(path.src.assets)
        .pipe(
            webp({
                quality: 85
            })
        )
        .pipe(dest(path.build.assets))
        /*   .pipe(dest(path.src.assets))
          .pipe(
              imagemin({
                  progressive: true,
                  svgoPlugins: [{ removeViewBox: false }],
                  interlaced: true,
                  optimazationLevel: 1
              })
          )
          .pipe(dest(path.build.assets)) */
        .pipe(browsersync.stream())
}
function favicons() {
    return src(path.src.favicons)
        .pipe(dest(path.build.favicons))
        .pipe(browsersync.stream())
}


function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        /*     .pipe(scss({
                outputStyle: "expanded"
            }))
            .pipe(dest(path.src.outPutCss)) */
        .pipe(concat("style.scss"))
        .pipe(scss({
            outputStyle: "expanded"
        }).on('error', scss.logError))
        .pipe(autoprefixer({
            overrideBrowserlist: ["last 5 versions"],
            cascade: true,
        }))
        .pipe(group_media())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        /*  .pipe(scss({
             outputStyle: "expanded"
         })) */
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        /*      .pipe(babel({
                 presets: ['@babel/env']
             })) */
        .pipe(concat("script.js"))
        .pipe(dest(path.build.js))
        .pipe(terser())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function fontsWoff() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

/* gulp.task('otf2ttf', () => {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'))
})

 */

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.assets], images);

}

function clean(params) {
    return del(path.clean)
}


function fontsStyle(params) {

    let file_content = fs.readFileSync(source_folder + '/css/style.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/css/style.scss', '', cb);
        return fs.readdir(path.build.css, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/css/style.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
    params()
}
function cb() { }

let build = gulp.series(clean, gulp.parallel(html, css, js, images, favicons, fontsWoff, fontsStyle));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fontsWoff = fontsWoff;

exports.images = images;
exports.favicons = favicons;
exports.html = html;
exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch