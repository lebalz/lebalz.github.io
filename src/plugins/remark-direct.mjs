import { visit } from 'unist-util-visit'
import {all} from 'known-css-properties';
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
 * @param {boolean} transform2CamelCase
 * @param {{[key: string]: string}} keyAliases
 */
const transformAttributes = (attributes, transform2CamelCase = false, keyAliases = {class: 'className'}) => {
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
            options.styles[camelCased(k)] = value;
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
        visit(tree, function (node) {
            if (node.type === 'containerDirective') {
                if (node.name !== 'cards') {
                    return;
                }
                const data = node.data || (node.data = {})
                const attributes = transformAttributes(node.attributes || {})
                data.hName = 'div'
                data.hProperties = {
                    ...attributes.attributes,
                    className: `flex-cards flex ${attributes.className}`,
                    style: attributes.styles,
                }
                const breaks = indicesOf(node.children, [{key: 'type', value: 'leafDirective'}, {key: 'name', value: 'br'}]);
                breaks.push(node.children.length);
                if (breaks[0] !== 0) {
                    breaks.unshift(-1);
                }
                const wrapperChildren = [];
                for (var idx = 0; idx < breaks.length - 1; idx++) {
                    const divider = node.children[breaks[idx]];
                    const dividerProps = transformAttributes(divider ? divider.attributes || {} : {});

                    const rawChildren = unwrapImages(node.children.slice(breaks[idx] + 1, breaks[idx + 1]));
                    const imgs = indicesOf(rawChildren, [{value: 'image', key: 'type'}]);
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
                                ...dividerProps.attributes,
                                className: `item card ${dividerProps.className}`,
                                style: {
                                    ...dividerProps.styles
                                }
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