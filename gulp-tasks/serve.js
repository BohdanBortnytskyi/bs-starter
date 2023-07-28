"use strict";

import { paths, URL } from "../gulpfile.babel";
import gulp from "gulp";
import browsersync from "browser-sync";

gulp.task("serve", () => {
  browsersync.init({
    server: `.${paths.frontPath}/dist/`,
    port: 3344,
    notify: true,
    //proxy: URL // if use different server (e.g. OpenServer)
  });

  gulp.watch(paths.views.watch, gulp.parallel("views"));
  gulp.watch(paths.styles.watch, gulp.parallel("styles"));
  gulp.watch(paths.scripts.watch, gulp.parallel("scripts"));
  gulp.watch(paths.sprites.watch, gulp.parallel("sprites"));
  gulp.watch(paths.images.watch, gulp.parallel("images"));
  gulp.watch(paths.webp.watch, gulp.parallel("webp"));
  gulp.watch(paths.fonts.watch, gulp.parallel("fonts"));
});
