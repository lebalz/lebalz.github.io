import {all} from 'known-css-properties';


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
export const camelCased = (dashed) => {
    return dashed.replace(/-([a-zA-Z])/g, (g) => g[1].toUpperCase());
}

/**
 * 
 * @param {string} camelCased dashed string, e.g. hello-bello
 * @returns string
 */
export const dashedString = (camelCased) => {
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
export const transformAttributes = (attributes, keyAliases = ALIASES) => {
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
export const indicesOf = (nodes, tags) => {
    return nodes.reduce((acc, node, idx) => {
        if (tags.every(t => node[t.key] === t.value)) {
            acc.push(idx);
        }
        return acc;
    }, []);
}


/**
 * 
 * @param {number[]} indices 
 * @param {number} lastPosition the 'end' of the last range
 * @param {boolean} filterCommonEnd if true, the last range will be filtered out if start === lastPosition - 1
 */
export const indicesToRanges = (indices, lastPosition, filterCommonEnd = false) => {
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
