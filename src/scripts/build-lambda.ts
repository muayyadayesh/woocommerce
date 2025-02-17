const esbuild = require('esbuild');
const { aliasPath } = require('esbuild-plugin-alias-path');
const path = require('path');

const buildLambda = async () => {
    await esbuild.build({
        entryPoints: [
            path.resolve(__dirname, '../functions/triggerImport/index.ts'),
            path.resolve(__dirname, '../functions/checkImportStatus/index.ts'),
            path.resolve(__dirname, '../functions/deleteCategory/index.ts'),
            path.resolve(__dirname, '../functions/processImport/index.ts'),
            path.resolve(__dirname, '../functions/getCategories/index.ts'),
            
        ],
        bundle: true,
        outdir: 'dist/functions',
        platform: 'node',
        plugins: [
            aliasPath({
                '@': './src'
            })
        ]
    });
};

buildLambda();