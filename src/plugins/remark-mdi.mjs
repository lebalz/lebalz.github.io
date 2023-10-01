import { visit } from 'unist-util-visit'
import { transformAttributes } from './helpers.mjs';

/**
 * requirements: @mdi/font
 * ```bash
 * yarn add remark-mdi @mdi/font
 * ```
 * 
 * and include the font in your css:
 * ```css
 * import "@mdi/font/css/materialdesignicons.min.css"
 * ```
 * 
 * @returns {import('unified').Transformer}
 */
const plugin = function plugin() {
    return function transformer(root) {
        visit(root, function (node, idx, parent) {
            if (node.type !== 'textDirective') {
                return;
            }
            if (node.name !== 'mdi') {
                return;
            }
            const icon = node.children[0].value;
            const attributes = transformAttributes(node.attributes || {})
            parent.children[idx] = {
                type: 'mdi',
                data: {
                    hName: 'span',
                    hProperties: {
                        ...attributes.attributes,
                        className: `mdi mdi-${icon} ${attributes.className}`,
                        style: attributes.styles,
                    }
                }
            };
        })
    }
}

export default plugin;