"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import dartSass from 'sass';
import gulpSass from "gulp-sass";
import mincss from "gulp-clean-css";
import groupmedia from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";

const argv = yargs.argv,
  production = !!argv.production;

const sass = gulpSass(dartSass);

gulp.task("styles", () => {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpif(!production, sourcemaps.init(), sourcemaps.identityMap()))
    .pipe(sass().on("error", sass.logError))
    .pipe(groupmedia())
    .pipe(
      gulpif(
        production,
        autoprefixer({
          cascade: false,
          grid: true
        })
      )
    )
    .pipe(
      gulpif(
        production,
        mincss({
          compatibility: "ie11",
          level: {
            1: {
              specialComments: 0,
              removeEmpty: true,
              removeWhitespace: true
            },
            2: {
              mergeMedia: true,
              removeEmpty: true,
              removeDuplicateFontRules: true,
              removeDuplicateMediaBlocks: true,
              removeDuplicateRules: true,
              removeUnusedAtRules: false
            }
          }
        })
      )
    )
    .pipe(
      gulpif(
        production,
        rename({
          suffix: ".min"
        })
      )
    )
    .pipe(gulpif(!production, sourcemaps.write("../maps", {addComment: false})))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(
      debug({
        title: "CSS files"
      })
    )
    .pipe(browsersync.stream());
});
