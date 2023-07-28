"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import image from "gulp-image";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv,
  production = !!argv.production;

gulp.task("images", () => {
  return gulp
    .src(paths.images.src)
    .pipe(
      gulpif(
        production,
        image({
          optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
          pngquant: ['--speed=1', '--force', 256],
          zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
          mozjpeg: ['-optimize', '-progressive'],
          jpegRecompress: ['--strip', '--quality', 'medium', '--min', 60, '--max', 80],
          gifsicle: ['--optimize'],
          svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
        })
      )
    )
    .pipe(gulp.dest(paths.images.dist))
    .pipe(
      debug({
        title: "Images"
      })
    )
    .on("end", browsersync.reload);
});
