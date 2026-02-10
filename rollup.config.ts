import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json' with { type: 'json' };
import typescript from '@rollup/plugin-typescript';

const external = [
  ...Object.keys(packageJson.peerDependencies || {}),
  'react/jsx-runtime',
];

export default [
  {
    input: 'src/index.tsx',
    output: [
      { file: packageJson.main, format: 'cjs', sourcemap: true },
      { file: packageJson.module, format: 'esm', sourcemap: true },
    ],
    plugins: [
      resolve(),
      json(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
      postcss({
        modules: true,
        extract: false,
        minimize: true,
        sourceMap: true,
      }),
      commonjs(),
    ],
    external,
  },
  {
    input: 'src/index.tsx',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
