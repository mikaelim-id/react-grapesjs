import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import pkg from "./package.json";

export default {
    input: "src/app.tsx",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
            sourcemap: true,
        },
    ],
    plugins: [
        external(),
        typescript(),
        resolve(),
        commonjs(),
    ],
};
