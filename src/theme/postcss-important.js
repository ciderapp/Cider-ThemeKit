// @ts-check
/**
 * Sinful PostCSS plugin that adds !important to every rule.
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
        postcssPlugin: 'postcss-important',

        /**
         *
         * @param {Declaration} decl
         */
        Declaration(decl) {
            // for future use
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
        Rule(rule) {
            rule.nodes.forEach((node) => {
                if (node.type === 'decl') {
                    node.important = true;
                }
            });
        }
    };
};

// @ts-ignore
module.exports.postcss = true;
