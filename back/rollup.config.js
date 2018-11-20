import external from 'rollup-plugin-auto-external';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

const plugins = [
  external({
    builtins: true,
  }),
  json(),
  commonjs(),
  babel(babelrc()),
];

export default {
  input: 'app.js',
  plugins: plugins,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      name: pkg.name,
      sourcemap: false,
    },
  ],
};