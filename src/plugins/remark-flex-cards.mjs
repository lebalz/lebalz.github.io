import { visit } from 'unist-util-visit'
import {all} from 'known-css-properties';

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

const ALIASES = {
    width: 'minWidth',
    min: 'minWidth',
    align: 'alignItems',
    grow: 'flexGrow',
    cols: 'columns',
    basis: 'flexBasis',
    justify: 'justifyContent',
    class: 'className',
    classes: 'className'
};

/**
 * 
 * @param {string} dashed dashed string, e.g. hello-bello
 * @returns string
 */
const camelCased = (dashed) => {
    return dashed.replace(/-([a-zA-Z])/g, (g) => g[1].toUpperCase());
}

/**
 * 
 * @param {string} camelCased dashed string, e.g. hello-bello
 * @returns string
 */
const dashedString = (camelCased) => {
    const match = camelCased.match(/[A-Z]/g);
    if (!match) {
        return camelCased;
    }
    return match.reduce((acc, c) => {
        return acc.replace(c, `-${c.toLowerCase()}`);
    }, camelCased);
}

/**
 * 
 * @param {{[key: string]: string}} attributes 
 * @param {{[key: string]: string}} keyAliases
 */
const transformAttributes = (attributes, keyAliases = ALIASES) => {
    const options = {
        styles: {},
        className: '',
        attributes: {},
    };
    for (const [key, value] of Object.entries(attributes)) {
        let k = key;
        if (k in keyAliases) {
            k = keyAliases[k];
        }
        if (all.includes(dashedString(k))) {
            options.styles[camelCased(k)] = value === '' ? true : value;
        }
        if (k === 'className') {
            options.className = value;
        }
        options.attributes[k] = value;
    }
    return options;
}

/**
 * 
 * @param {import('unist').Parent['children']} nodes 
 * @param {{value: string, key: string}[]} tags
 */
const indicesOf = (nodes, tags) => {
    return nodes.reduce((acc, node, idx) => {
        if (tags.every(t => node[t.key] === t.value)) {
            acc.push(idx);
        }
        return acc;
    }, []);
}

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
 * @param {number[]} indices 
 * @param {number} lastPosition the 'end' of the last range
 * @param {boolean} filterCommonEnd if true, the last range will be filtered out if start === lastPosition - 1
 */
const indicesToRanges = (indices, lastPosition, filterCommonEnd = false) => {
    const all = [...indices, lastPosition];
    return all.map((index, idx) => {
        const start = idx === 0 ? 0 : all[idx - 1] + 1;
        const end = index;
        if (start === 0 && end === 0) {
            return null;
        }
        if (filterCommonEnd && start === lastPosition - 1) {
            return null;
        }
        return {start, end};
    }).filter((pos) => pos !== null);
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