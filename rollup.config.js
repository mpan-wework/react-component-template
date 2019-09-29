import assets from 'postcss-assets';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import cssnano from 'cssnano';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
  ],
  plugins: [
    postcss({
      minimize: true,
      modules: true,
      extensions: ['.less'],
      plugins: [
        assets({
          loadPaths: ['src/assets/']
        }),
        cssnano({
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ]
        }),
      ],
    }),
    peerDepsExternal({
      includeDependencies: true,
    }),
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs(),
    terser(),
  ]
};
