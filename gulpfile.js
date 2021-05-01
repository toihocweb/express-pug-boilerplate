const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const autoPrefixer = require("gulp-autoprefixer");
const cssComb = require("gulp-csscomb");
const cmq = require("gulp-merge-media-queries");
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");

// --- src
const scssSrc = "src/scss/**/*.scss";
const jsSrc = "src/js/**/*.js";

// --- dest
const scssDest = "public/css";
const jsDest = "public/js";

gulp.task("scss", function () {
  return gulp
    .src([scssSrc])
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(cssComb())
    .pipe(cmq({ log: true }))
    .pipe(gulp.dest(scssDest))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(cleanCss())
    .pipe(gulp.dest(scssDest));
});

gulp.task("javascript", function () {
  return gulp
    .src([jsSrc])
    .pipe(gulp.dest(jsDest))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

gulp.task("serve", function () {
  gulp.watch(scssSrc, gulp.series("scss"));
  gulp.watch(jsSrc, gulp.series("javascript"));
});
