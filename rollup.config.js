import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
    entry: 'lib/index.js',
    dest: 'dist/index.min.js',
    format: 'iife',
    sourceMap: 'inline',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs(),
        eslint({
            exclude: 'node_modules'
        }),
        babel({
            exclude: 'node_modules'
        }),
        replace({
            exclude: 'node_modules',
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
}