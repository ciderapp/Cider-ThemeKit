// @ts-check
/**
 * Rewrites url() references to start with http://localhost:4590/_assets/ for dev mode.
 */
/**
 * @typedef {import('postcss').Rule} Rule
 * @typedef {import('postcss').Plugin} Plugin
 * @typedef {import('postcss').Declaration} Declaration
 * @typedef {import('postcss').Comment} Comment
 */

/**
 * @type {Plugin}
 * @param {*} opts
 * @returns
 */
module.exports = (opts = {}) => {
    return {
        postcssPlugin: 'postcss-devassets',

        /**
         *
         * @param {Declaration} decl
         */
        Declaration(decl) {
            // set url() to values in background images to http://localhost:4590/_assets/
            
            // skip if includes http://localhost:4590/_assets/
            if(decl.value.includes('http://localhost:4590/_assets/')) {
                return;
            }

            if(decl.value.includes('url(')) {
                // get the value in between the url() parentheses
                const originalValue = decl.value;
                const urlStart = originalValue.indexOf('url(') + 4;
                const urlEnd = originalValue.indexOf(')');
                const urlValue = originalValue.substring(urlStart, urlEnd);
                const urlRaw = urlValue.replace(/['"]/g, '');
                // if starts with ./ or / remove
                const url = urlRaw.startsWith('./') || urlRaw.startsWith('/') ? urlRaw.substring(1) : urlRaw;
                // escape any quotes
                const escapedUrl = url.replace(/['"]/g, '');
                const newValue = `url("http://localhost:4590/_assets/${escapedUrl}")`;
                decl.value = newValue;
            }
        },
        /**
         *
         * @param {Comment} comment
         */
        Comment(comment) {
            // for future use   
        },
        /**
         *
         * @param {Rule} rule
         */
        Rule(rule) {}
    };
};

// @ts-ignore
module.exports.postcss = true;
