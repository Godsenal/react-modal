import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const name = 'react-modal';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const babelOptions = {
  include: ['src/Modal/**/*'],
  exclude: /node_modules/,
  extensions,
  // @babel/plugin-transform-runtime 사용
  runtimeHelpers: true,
};

const config = {
  input: 'src/Modal/index.ts',
  external: Object.keys(pkg.peerDependencies || {}),
  output: [
    {
      file: `umd/${name}.js`,
      format: 'umd',
      name,
      exports: 'named',
      globals,
    },
  ],
  plugins: [
    nodeResolve({ extensions }),
    babel(babelOptions),
    commonjs(),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  ],
};

export default config;
