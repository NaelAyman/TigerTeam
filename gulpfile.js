var gulp = require("gulp"),
    pug = require("gulp-pug"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    autoprefixer = require("gulp-autoprefixer"),
    minify = require("gulp-minify"),
    // livereload = require("gulp-livereload"),
    wait = require("gulp-wait"),
    sourcemaps = require("gulp-sourcemaps"),
    image = require("gulp-image"),
    imagemin = require("gulp-imagemin"),
    plumber = require("gulp-plumber"),
    browserSync = require("browser-sync");

var htmlPath = "stage/html/*.pug",
  cssPathes = [
    "stage/css/libs/bootstrap.min.css",
    "stage/css/libs/font-awesome-5all.css",
    "stage/css/libs/owl.carousel.css",
    "stage/css/**/*.scss",
    "stage/css/**/*.css",
    "!"
  ],
  jsPath = "stage/js/*.js";

// Html Task
gulp.task("html", function() {
  return (
    gulp
      .src(htmlPath) // [1] Get The Source
      .pipe(pug({ pretty: true })) // [2] Compile Pug To Html
      .pipe(gulp.dest("dist")) // [3] Copy File To Dist Folder
      // .pipe(livereload()); // [4] Reload The Page
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

// Css Task
gulp.task("css", function() {
  // to make order my files when compile
  return (
    gulp
      .src(cssPathes)
      .pipe(wait(500))
      .pipe(plumber())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(autoprefixer("last 5 version"))
      .pipe(concat("master.min.css"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/css"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

// Js Task

gulp.task("js", function() {
  return (
    gulp
      .src(jsPath)
      .pipe(concat("scripts.js"))
      .pipe(minify())
      .pipe(gulp.dest("dist/js"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

// Images Task

gulp.task("images", function() {
  return (
    gulp
      .src("stage/img/*.*")
      .pipe(image())
      .pipe(imagemin())
      .pipe(gulp.dest("dist/img"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

function browser_sync() {
  browserSync({
    server: {
      baseDir: "dist/"
    },
    options: {
      reloadDelay: 250
    },
    notify: false
  });
}

// Watch Task

gulp.task("default", function() {
  browser_sync();
  gulp.watch("stage/html/**/*.pug", gulp.series("html"));
  gulp.watch(cssPathes, gulp.series("css"));
  gulp.watch(jsPath, gulp.series("js"));
  gulp.watch("stage/img/*.*", gulp.series("images"));
});
