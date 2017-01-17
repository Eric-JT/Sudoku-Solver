const GULP         = require("gulp");
const BABEL        = require("gulp-babel");
const ESLINT       = require("gulp-eslint");
const SASS         = require("gulp-sass");
const PREFIX       = require("gulp-autoprefixer");
const BROWSER_SYNC = require("browser-sync");

/*
* ESLINT
*/
GULP.task("eslint", function() {
  // ESLINT on my es6 js file
  GULP.src("assets/*/*.js")
  .pipe(ESLINT())
  .pipe(ESLINT.format());
});

/*
* Run Babel
*/
GULP.task("babel", function() {
  // Browser source
  return GULP.src("assets/js/main.js")
  .pipe(BABEL())
  .pipe(GULP.dest("_site/assets/js"))
  .pipe(BROWSER_SYNC.reload({stream:true}));
});

/**
 * Compile files from _scss into both _site/css (for live injecting)
 * and site
 */
GULP.task("sass", function () {
  return GULP.src("assets/css/main.scss")
  .pipe(SASS({
    includePaths: ["css"],
    onError: BROWSER_SYNC.notify
  }))
  .pipe(PREFIX(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true }))
  .pipe(GULP.dest("_site/assets/css"))
  .pipe(BROWSER_SYNC.reload({stream:true}));
});

/*
* Run browser-sync
*/
GULP.task("browser-sync",["sass", "eslint", "babel"], function() {
  BROWSER_SYNC({
    server: {
      baseDir: "_site"
    },
    notify: false
  });
});

/*
*  Copy index.html into _site
*/
GULP.task("cp-index", function() {
  GULP.src("index.html")
  .pipe(GULP.dest("_site"));
});

GULP.task("watch", function() {
  GULP.watch("assets/js/**", ["eslint", "babel"]);
  GULP.watch("assets/css/**", ["sass"]);
  GULP.watch("index.html", ["cp-index"]);
});

GULP.task("default", ["browser-sync", "watch"]);
