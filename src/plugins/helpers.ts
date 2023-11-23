import { Expression } from '@mdx-js/mdx/lib/plugin/recma-document';
import { all as KnownCssProperties } from 'known-css-properties';
import { MdxJsxAttribute, MdxJsxAttributeValueExpression } from 'mdast-util-mdx';
import { Parent } from 'unist';


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

export const captialize = (s: string) => {
    if (!s) {
        return s;
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const toMdxJsxExpressionAttribute = (
    key: string,
    value: number | boolean | string | Object,
    expression: { type: string, value: any, raw: string } | { type: 'Identifier', name: string } | Expression
): MdxJsxAttribute => {
    return {
        type: 'mdxJsxAttribute',
        name: key,
        value: {
            type: 'mdxJsxAttributeValueExpression',
            value: typeof value === 'object' ? JSON.stringify(value) : `${value}`,
            data: {
                estree: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: expression as any
                        }
                    ],
                    sourceType: 'module',
                    comments: []
                }
            }
        }
    }
}


export const toJsxAttribute = (key: string, value: string | number | boolean | Object): MdxJsxAttribute => {
    if (Number.isFinite(value)) {
        return toMdxJsxExpressionAttribute(
            key,
            `${value}`,
            {
                type: 'Literal',
                value: value,
                raw: `${value}`
            }
        );
    }
    if (typeof value === 'boolean') {
        if (value) {
            return {
                type: "mdxJsxAttribute",
                name: key,
                value: null
            };
        }
        return toMdxJsxExpressionAttribute(
            key,
            `${value}`,
            {
                type: 'Literal',
                value: value,
                raw: `${value}`
            }
        );
    }
    if (typeof value === 'object') {
        const expression: Expression = {
            type: 'ObjectExpression',
            properties: Object.entries(value).map(([k, v]) => ({
                type: 'Property',
                method: false,
                shorthand: false,
                computed: false,
                key: {
                    type: 'Identifier',
                    name: k
                },
                value: {
                    type: 'Literal',
                    value: v,
                    raw: JSON.stringify(v)
                },
                kind: 'init'
            }))
        } 
        return toMdxJsxExpressionAttribute(
            key,
            value,
            expression
        );
    }
    return {
        type: "mdxJsxAttribute",
        name: key,
        value: value === '' ? null : `${value}`
    };
}

/**
 * 
 * @param dashed dashed string, e.g. hello-bello
 * @returns camelCased string, e.g. helloBello
 */
export const camelCased = (dashed: string): string => {
    return dashed.replace(/-([a-zA-Z])/g, (g) => g[1].toUpperCase());
}

/**
 * @param camelCased dashed string, e.g. hellBello
 * @returns dashed string, e.g. hello-bello
 */
export const dashedString = (camelCased: string): string => {
    const match = camelCased.match(/[A-Z]/g);
    if (!match) {
        return camelCased;
    }
    return match.reduce((acc, c) => {
        return acc.replace(c, `-${c.toLowerCase()}`);
    }, camelCased);
}

export interface Options {
    style: { [key: string]: string | boolean };
    className: string;
    attributes: { [key: string]: string | number | boolean };
}

/**
 * 
 * @param attributes 
 * @param keyAliases
 */
export const transformAttributes = (
    attributes: { [key: string]: string },
    keyAliases: { [key: string]: string } = ALIASES
) => {
    const options: Options = {
        style: {},
        className: '',
        attributes: {},
    };
    for (const [key, value] of Object.entries(attributes)) {
        let k = key;
        if (k in keyAliases) {
            k = keyAliases[k];
        }
        if (KnownCssProperties.includes(dashedString(k))) {
            options.style[camelCased(k)] = value === '' ? true : value;
        } else if (k === 'className') {
            options.className = value;
        }
        options.attributes[k] = value;
    }
    return options;
}

export const indicesOf = (nodes: Parent['children'], tags: { value: string, key: string }[]) => {
    return nodes.reduce((acc, node, idx) => {
        if (tags.every(t => node[t.key] === t.value)) {
            acc.push(idx);
        }
        return acc;
    }, []);
}

export const indicesToRanges = (indices: number[], lastPosition: number, filterCommonEnd: boolean = false) => {
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
        return { start, end };
    }).filter((pos) => pos !== null);
}
