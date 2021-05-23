import pkg from './package.json';
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete'

export default {
    input: { 
        index: 'src/index.ts', 
    }, // our source file
    output: [
        {
            dir: './dist/cjs',
            format: 'cjs',
            sourcemap: 'inline'
        },
        {
            dir: './dist/es',
            format: 'esm', // the preferred format
            sourcemap: 'inline',
            exports: "named"
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        del({ targets: 'dist/*' }),
        resolve({
            extensions: ['.js', '.ts'],
            preferBuiltins: false,
            jsnext: true,
        }),
        commonjs(),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        terser() // minifies generated bundles
    ]
};