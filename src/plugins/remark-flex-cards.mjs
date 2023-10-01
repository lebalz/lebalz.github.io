import { visit } from 'unist-util-visit'
import { indicesOf, indicesToRanges, transformAttributes } from './helpers.mjs';

/** for creating cards or flex: :::cards, :::flex */
const CONTAINER_DIRECTIVES = ['cards', 'flex'];
const DEFAULT_CLASSES = {
    cards: {
        container: 'flex-cards flex',
        item: 'item card',
        content: 'card__body',
        image: 'card__image'
    },
    flex: {
        container: 'flex',
        item: 'item',
        content: 'content'
    }
}

/** for dividing into multiple cards: ::br */
const LEAVE_DIRECTIVE = 'br';

/**
 * Images are wrapped in paragraphs by default - this removes the wrapping
 * @param {import('unist').Parent['children']} nodes
 */
const flattenImages = (nodes) => {
    return nodes.map((node) => {
        if (node.type === 'paragraph' && node.children.length === 1 && node.children[0].type === 'image') {
            return node.children[0];
        }
        return node;
    })
}

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
            if (!CONTAINER_DIRECTIVES.includes(node.name)) {
                return;
            }

            const attributes = transformAttributes(node.attributes || {})
            node.data = {
                hName: 'div',
                hProperties: {
                    ...attributes.attributes,
                    className: `${DEFAULT_CLASSES[node.name].container} ${attributes.className}`,
                    style: attributes.styles,
                }
            }

            const brIndices = indicesOf(
                node.children, 
                [
                    {key: 'type', value: 'leafDirective'},
                    {key: 'name', value: LEAVE_DIRECTIVE}
                ]
            );
            
            const contentRanges = indicesToRanges(brIndices, node.children.length);

            const wrapperChildren = [];
            contentRanges.forEach((pos) => {
                const divider = node.children[pos.start - 1];
                const dividerProps = transformAttributes(divider ? divider.attributes || {} : {});
                let children = [];
                if (node.name === 'flex') {
                    children = node.children.slice(pos.start, pos.end);
                } else if (node.name === 'cards') {
                    const rawChildren = flattenImages(node.children.slice(pos.start, pos.end));
                    const imgAndCodeIndices = [...new Set([
                        ...indicesOf(rawChildren, [{value: 'image', key: 'type'}]),
                        ...indicesOf(rawChildren, [{value: 'code', key: 'type'}])
                    ])].sort();
                    
                    const bodyRanges = indicesToRanges(imgAndCodeIndices, rawChildren.length);
                    bodyRanges.forEach((range) => {
                        const img = rawChildren[range.start - 1];
                        if (img) {
                            children.push({
                                type: 'content',
                                data: {
                                    hName: 'div',
                                    hProperties: {
                                        className: DEFAULT_CLASSES[node.name].image,
                                    }
                                },
                                children: [img]
                            });
                        }
                        const body = rawChildren.slice(range.start, range.end);
                        if (body.length > 0) {
                            children.push({
                                type: 'content',
                                data: {
                                    hName: 'div',
                                    hProperties: {
                                        className: DEFAULT_CLASSES[node.name].content,
                                    }
                                },
                                children: body
                            });
                        }
                    });
                }
                wrapperChildren.push({
                    type: 'flexHTML',
                    data: {
                        hName: 'div',
                        hProperties: {
                            ...dividerProps.attributes,
                            className: `${DEFAULT_CLASSES[node.name].item} ${dividerProps.className}`,
                            style: dividerProps.styles
                        }
                    },
                    children: children
                });
            });
            node.children = wrapperChildren;
        })
    }
}

export default plugin;