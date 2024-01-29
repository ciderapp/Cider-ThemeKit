/**
 * @param {import('./pcss').buildCSSOptions} options
 */
async function buildCSS(options) {
    // dependencies
    const fs = require('fs');
    const postcss = require('postcss');
    const url = require('postcss-url');
    const postcssScss = require('postcss-scss');
    const path = require('path');
    const css = fs.readFileSync(path.join(options.workingDir, options.styleDef.entry), 'utf8');

    const plugins = [require('autoprefixer'), require('postcss-nested'), require('postcss-import'), require('./postcss-important')];
    if (options?.inlineAssets) {
        plugins.unshift(
            url({
                url: 'inline'
            })
        );
    }

    const output = await postcss(plugins).process(css, {
        parser: postcssScss,
        from: path.join(options.workingDir, options.styleDef.entry),
        to: path.join(path.join(options.workingDir, 'dist'), options.styleDef.entry)
    });
    return {
        css: output.css
    };
}

exports.buildCSS = buildCSS;
