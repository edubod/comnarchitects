/* eslint-disable no-console */
import autoprefixer from 'autoprefixer';
import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';

// Config output
const BUILD_DIRECTORY = 'dist';
const PRODUCTION = process.env.NODE_ENV === 'production';

// Config entrypoint files
const ENTRY_POINTS = ['src/scss/app.scss', 'src/js/app.ts'];

// Config dev serving
const LIVE_RELOAD = !PRODUCTION;
const SERVE_PORT = 3000;

// Create context
const context = await esbuild.context({
  bundle: true,
  entryPoints: ENTRY_POINTS,
  outdir: BUILD_DIRECTORY,
  minify: PRODUCTION,
  sourcemap: !PRODUCTION,
  target: PRODUCTION ? 'es2019' : 'esnext',
  inject: LIVE_RELOAD ? ['./bin/live-reload.js'] : undefined,
  define: {
    SERVE_PORT: `${SERVE_PORT}`,
  },
  plugins: [
    sassPlugin({
      async transform(source) {
        const { css } = await postcss([autoprefixer]).process(source, {
          from: 'src/scss/app.scss',
        });
        return css;
      },
      quietDeps: true,
    }),
  ],
});

// Build files in prod
if (PRODUCTION) {
  await context.rebuild();
  context.dispose();
}

// Watch and serve files in dev
else {
  await context.watch();
  await context
    .serve({
      servedir: BUILD_DIRECTORY,
      port: SERVE_PORT,
    })
    .then(async ({ port }) => {
      // Log all served files for easy reference
      const origin = `http://localhost:${port}`;
      const files = ENTRY_POINTS.map(
        (path) =>
          `${origin}/${path
            .replace('src/js/', 'js/')
            .replace('.ts', '.js')
            .replace('src/scss/', 'scss/')
            .replace('.scss', '.css')}`
      );

      console.log('Serving at:', origin);
      console.log('Built files:', files);
    });
}
