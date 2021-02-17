import gulp from "gulp";
import { series, parallel } from "gulp";
import sass from "gulp-sass";
import babel from "gulp-babel";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import rename from "gulp-rename";

import fs from "fs";
import del from "del";
import path from "path";
import data from "gulp-data";
import twig from "gulp-twig";
import browsersync from "browser-sync";
import gulpcopy from "gulp-copy";
import plumber from "gulp-plumber";
import sourcemaps from "gulp-sourcemaps";
import prefix from "gulp-autoprefixer";
import purge from "gulp-purgecss";

// Paths
const paths = {
  assets: {
    src: "src/assets/**/*",
    dest: "build/assets",
  },
  data: {
    src: "src/data/",
  },
  styles: {
    src: "src/styles/**/*.scss",
    dest: "build/styles/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "build/scripts/",
  },
  templates: {
    src: "src/templates/**/*.twig",
    dest: "build/",
  },
};

// Clean assets
export const cleanAssets = () => del([paths.assets.dest]);

// styles
export function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        // includePaths: [paths.sass + "vendors/"],
        outputStyle: "expanded", // compact
      }).on("error", function (err) {
        console.log(err.message);
        // sass.logError
        this.emit("end");
      })
    )
    .pipe(
      prefix(
        [
          "last 15 versions",
          "> 1%",
          "ie 8",
          "ie 7",
          "iOS >= 9",
          "Safari >= 9",
          "Android >= 4.4",
          "Opera >= 30",
        ],
        {
          cascade: true,
        }
      )
    )
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest));
}

// Scripts
export function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Templates
export function templates() {
  return (
    gulp
      .src([paths.templates.src])
      // Stay live and reload on error
      .pipe(
        plumber({
          handleError: function (err) {
            console.log(err);
            this.emit("end");
          },
        })
      )
      // Load template pages json data
      .pipe(
        data(function (file) {
          return JSON.parse(
            fs.readFileSync(paths.data.src + path.basename(file.path) + ".json")
          );
        })
      )
      .pipe(twig())
      .on("error", function (err) {
        process.stderr.write(err.message + "\n");
        this.emit("end");
      })
      .pipe(gulp.dest(paths.templates.dest))
  );
}

// Copy assets
export function copyAssets() {
  // Copy assets
  return gulp
    .src(
      [
        paths.assets.src,
        "!" + paths.assets.src + ".psd",
        "!" + paths.assets.src + ".*.map",
      ],
      cleanAssets
    )
    .pipe(gulpcopy(paths.assets.dest, { prefix: 2 }));
}

// BrowserSync reload
export function browserReload() {
  return browsersync.reload;
}

// Purge UnusedCSS
export function purgeCSS() {
  return gulp
    .src(paths.styles.dest + "*.css")
    .pipe(
      purge({
        content: [paths.templates.dest + "*.html"],
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}

// BrowserSync
function browserSync() {
  browsersync({
    server: {
      baseDir: paths.templates.dest,
    },
    notify: false,
    browser: "google chrome",
    // proxy: "0.0.0.0:5000"
  });
}

// Watch files
function watchFiles() {
  gulp.watch(paths.scripts.src, scripts).on("change", browserReload());
  gulp
    .watch(paths.styles.src, styles)
    .on("change", parallel(styles), browserReload());
  // Watch template changes
  gulp
    .watch([paths.templates.src, paths.data.src], parallel(templates))
    .on("change", browserReload());
  // Watch assets changes
  // Assets Watch and copy to build in some file changes
  gulp
    .watch([
      paths.assets.src,
      "!" + paths.assets.src + ".psd",
      "!" + paths.assets.src + ".*.map",
    ])
    .on("change", series(cleanAssets, copyAssets, browserReload()));
}

const watching = parallel(watchFiles, browserSync);
const build = series(
  parallel(copyAssets, styles, scripts, templates),
  purgeCSS
);

/*
 * Export a watch task
 */
export { watching as watch };

/*
 * Export a default task
 */
export default build;
