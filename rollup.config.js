import path from 'path';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import strip from '@rollup/plugin-strip';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const devMode = (process.env.NODE_ENV === 'development');

export default [
    {
        // UMD
        input: 'lib/index.js',
        output: {
            name: 'wcag',
            file: `dist/${pkg.name}.min.js`,
            format: 'umd',
            esModule: false,
            exports: 'named',
            sourceMap: true
        },
        external: [
            "tinycolor2"
        ],
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-env'],
                babelHelpers: 'bundled'
            }),
            terser()
        ]
    },
    {
        // CJS/ESM
        input: 'lib/index.js',
        output: [
            {
                dir: 'dist/cjs',
                format: 'cjs',
                exports: 'named',
                sourceMap: true
            },
            {
                dir: 'dist/es',
                format: 'esm',
                exports: 'named',
                sourceMap: true,
                // plugins: [getBabelOutputPlugin({ preset: ['@babel/preset-env'] })]
            }
        ],
        external: [
            "tinycolor2"
        ],
        plugins: [
            resolve()
        ]
    }
];