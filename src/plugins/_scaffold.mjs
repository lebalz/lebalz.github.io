import { visit } from 'unist-util-visit'

/**
 * 
 * @param {{tag: string, className: string, children: {className: string}}[]} optionsInput
 * @returns {import('unified').Transformer}
 */
const plugin = function plugin(optionsInput = {}) {
    return function transformer(root) {
        visit(root, function (node) {
            if (node.type !== 'containerDirective') {
                return;
            }
            
        })
    }
}

export default plugin;