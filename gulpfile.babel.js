import { src, dest, series, parallel, watch } from "gulp";

import sass from "gulp-sass";
import babel from "gulp-babel";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import data from "gulp-data";
import twig from "gulp-twig";
import gulpcopy from "gulp-copy";
import plumber from "gulp-plumber";
import sourcemaps from "gulp-sourcemaps";
import prefix from "gulp-autoprefixer";
import purge from "gulp-purgecss";

import Browsersync from "browser-sync";

import fs from "fs";
import del from "del";
import path from "path";

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
    dir: "src/styles/",
    src: "src/styles/**/*.scss",
    dest: "build/styles/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "build/scripts/",
  },
  templates: {
    dir: "src/templates/",
    src: "src/templates/**/*.twig",
    dest: "build/",
  },
};

// Create browser-sync
Browsersync.create();

// Clean assets
export const cleanAssets = () => del([paths.assets.dest]);

// styles
export function styles(done) {
  // return src([
  src([
    paths.styles.src,
    "!" + paths.styles.dir + "themes/**/*.scss",
    "!" + paths.styles.dir + "vendors/**/*.scss",
  ])
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
    .pipe(dest(paths.styles.dest))
    .pipe(Browsersync.stream());
  done();
}

// Scripts
export function scripts(done) {
  src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(dest(paths.scripts.dest))
    .pipe(Browsersync.stream());
  done();
}

// Templates
export function templates(done) {
  src([
    paths.templates.src,
    "!" + paths.templates.dir + "_blocks/**/*.twig",
    "!" + paths.templates.dir + "_includes/**/*.twig",
    "!" + paths.templates.dir + "_layouts/**/*.twig",
  ])
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
          fs.readFileSync(
            paths.data.src +
              path.basename(file.path.replace(".twig", "")) +
              ".json"
          )
        );
      }).on("error", function (err) {
        process.stderr.write(err.message + "\n");
        this.emit("end");
      })
    )
    .pipe(
      data(function () {
        return JSON.parse(
          fs.readFileSync(paths.data.src + path.basename("default.json"))
        );
      }).on("error", function (err) {
        process.stderr.write(err.message + "\n");
        this.emit("end");
      })
    )
    .pipe(
      twig().on("error", function (err) {
        process.stderr.write(err.message + "\n");
        this.emit("end");
      })
    )
    .pipe(dest(paths.templates.dest))
    .pipe(Browsersync.stream());
  done();
}

// Copy assets
export function copyAssets() {
  // Copy assets
  return src(
    [
      paths.assets.src,
      "!" + paths.assets.src + ".psd",
      "!" + paths.assets.src + ".*.map",
    ],
    cleanAssets
  )
    .pipe(gulpcopy(paths.assets.dest, { prefix: 2 }))
    .pipe(Browsersync.stream());
  // done();
}

// Purge UnusedCSS
export function purgeCSS() {
  return src(paths.styles.dest + "*.min.css")
    .pipe(
      rename({
        suffix: ".rejected",
      })
    )
    .pipe(
      purge({
        content: [paths.templates.dest + "*.html"],
        // keyframes: true,
        // variables: true,
        rejected: true,
        safelist: [
          /col-[a-z\-0-9]+/gi,
          /alert-[a-z-0-9]+/g,
          /navbar-[a-z\-0-9]+/gi, // navbar-expand-(sizes)
          /nav-[a-z\-0-9]+/gi, // nav-item, nav-link
          /close+/g,
          /collaps?(e|ing)+/g,
        ],
        whitelistPatterns: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
        ],
      })
    )
    .pipe(dest(paths.styles.dest));
}

// BrowserSync
export function browserSyncWatch() {
  return Browsersync.init({
    server: {
      baseDir: paths.templates.dest,
    },
    notify: false,
    browser: "google chrome",
  });
}

// BrowserSync reload
export function browserReload(done) {
  Browsersync.reload;
  done();
}

// Watch files
export function watchFiles() {
  // Watch scripts changes
  watch(paths.scripts.src, series(scripts, browserReload)).on(
    "change",
    function (file) {
      console.log("file change:", file);
    }
  );
  // Watch styles changes
  watch(paths.styles.src, series(styles, browserReload)).on(
    "change",
    function (file) {
      console.log("file change:", file);
    }
  );
  // Watch template changes
  watch(
    [paths.templates.src, paths.data.src],
    series(templates, browserReload)
  ).on("change", function (file) {
    console.log("file change:", file);
  });
  // Watch assets changes and copy to build in some file changes
  watch(
    [
      paths.assets.src,
      "!" + paths.assets.src + ".psd",
      "!" + paths.assets.src + ".*.map",
    ],
    series(cleanAssets, copyAssets, browserReload)
  );
  watch("gulpfile.babel.js").on("change", () => process.exit(0));
}

// Build first
const building = parallel(copyAssets, templates, styles, scripts);
// Watch later
const watching = series(building, parallel(watchFiles, browserSyncWatch));
// Production
const build = series(building, purgeCSS);

/*
 * Export a watch task
 */
export { watching as watch };

/*
 * Export a default task
 */
export default build;
