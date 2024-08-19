import { build } from "esbuild";

build({
    entryPoints: ['src/App.jsx', 'src/server.jsx'],
    target: 'node21',
    format: 'esm',
    platform: 'node',
    outdir: 'dist',
    // watch: true,
})

build({
    entryPoints: ['src/main.jsx'],
    target: 'chrome96',
    platform: 'browser',
    outdir: 'dist',
    logLevel: 'debug',
    bundle: true,
    // watch: true,
})