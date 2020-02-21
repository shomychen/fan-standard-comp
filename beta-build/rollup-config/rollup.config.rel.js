import babel from 'rollup-plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import ignore from 'rollup-plugin-ignore';
import less from 'rollup-plugin-less';

const devConfig = {
  input: 'src/index.js',
  output: {
    file: 'dist/fan-standard-comp.development.js',
    format: 'umd',
    name: 'ReactTabs',
    globals: {
      'prop-types': 'PropTypes',
      react: 'React',
    },
    sourcemap: true,
  },
  plugins: [
    commonjs({ exclude: 'src/**' }),
    nodeResolve(),
    babel(),
    less(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  external: ['prop-types', 'react'],
};

const productionConfig = {
  input: 'src/index.js',
  output: {
    file: 'dist/fan-standard-comp.production.min.js',
    format: 'umd',
    name: 'ReactTabs',
    globals: {
      react: 'React',
    },
    sourcemap: true,
  },
  plugins: [
    ignore(['prop-types']),
    commonjs({ exclude: 'src/**' }),
    nodeResolve(),
    less(),
    babel({ plugins: ['transform-react-remove-prop-types'] }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    terser(),
  ],
  external: ['react'],
};

export default [devConfig, productionConfig];
