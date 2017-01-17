const GULP = require("gulp");
const BABEL = require("gulp-babel");
const ESLINT = require("gulp-eslint");

GULP.task("default", function() {
  // ESLINT on my es6 js file
  GULP.src("assets/*/*.js")
  .pipe(ESLINT())
  .pipe(ESLINT.format());

  // Browser source
  GULP.src("assets/*/*.js")
  .pipe(BABEL())
  .pipe(GULP.dest("_site/assets/js/"));
});
