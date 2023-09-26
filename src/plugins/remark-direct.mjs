import { visit } from 'unist-util-visit'
/**
 * 
 * @param {import('unist').Parent['children']} nodes 
 * @param {{value: string, key: string}} tag 
 */
const indicesOf = (nodes, tag) => {
    return nodes.reduce((acc, node, idx) => {
        if (node[tag.key] === tag.value) {
            acc.push(idx);
        }
        return acc;
    }, []);
}

/**
 * 
 * @param {import('unist').Parent['children']} nodes
 */
const unwrapImages = (nodes) => {
    return nodes.map((node) => {
        if (node.type === 'paragraph' && node.children.length === 1 && node.children[0].type === 'image') {
            return node.children[0];
        }
        return node;
    })
}

// This plugin is an example to turn `::youtube` into iframes.
function myRemarkPlugin() {
    /**
     * @param {import('mdast').Root} tree
     *   Tree.
     * @param {import('vfile').VFile} file
     *   File.
     * @returns {undefined}
     *   Nothing.
     */
    return (tree, file) => {
        const lines = file.value.split('\n');
        visit(tree, function (node) {
            if (
                node.type === 'containerDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'textDirective'
            ) {
                if (node.name !== 'cards') {
                    return;
                }
                const data = node.data || (node.data = {})
                const attributes = node.attributes || {}

                data.hName = 'div'
                data.hProperties = {
                    className: 'flex-cards flex',
                }
                if (node.children.length === 0) {
                    return;
                }
                const breaks = indicesOf(node.children, {value: 'thematicBreak', key: 'type'});
                breaks.push(node.children.length);
                if (breaks[0] !== 0) {
                    breaks.unshift(-1);
                }
                const wrapperChildren = [];
                for (var idx = 0; idx < breaks.length - 1; idx++) {
                    const divider = node.children[breaks[idx]];
                    if (divider && divider.type === 'thematicBreak') {
                        const props = divider.attributes || {};
                        const txt = lines.slice(divider.position.start.line - 1, divider.position.end.line).join('\n');
                        console.log('divider', lines);
                        console.log('divider', divider.attributes, divider.data);
                    }
                    const rawChildren = unwrapImages(node.children.slice(breaks[idx] + 1, breaks[idx + 1]));
                    const imgs = indicesOf(rawChildren, {value: 'image', key: 'type'});
                    const children = imgs.length > 0 ? [] : rawChildren;
                    if (imgs.length > 0) {
                        if (imgs[imgs.length-1] !== rawChildren.length - 1) {
                            imgs.push(rawChildren.length);
                        }
                        for (var iidx = 0; iidx < imgs.length; iidx++) {
                            const imgIdx = imgs[iidx];
                            if (imgIdx > 0) {
                                children.push({
                                    type: 'content',
                                    data: {
                                        hName: 'div',
                                        hProperties: {
                                            className: 'card__body',
                                        }
                                    },
                                    children: rawChildren.slice(imgs[iidx - 1] + 1, imgIdx)
                                });
                            }
                            if (imgIdx < rawChildren.length) {
                                children.push({
                                    type: 'content',
                                    data: {
                                        hName: 'div',
                                        hProperties: {
                                            className: 'card__image',
                                        }
                                    },
                                    children: rawChildren.slice(imgs[iidx], imgs[iidx] + 1)
                                });
                            }
                        }
                    }
                    wrapperChildren.push({
                        type: 'flexHTML',
                        data: {
                            hName: 'div',
                            hProperties: {
                                className: 'item card',
                            }
                        },
                        children: children
                    });
                }
                node.children = wrapperChildren;
            }
        })
    }
}

export default myRemarkPlugin;