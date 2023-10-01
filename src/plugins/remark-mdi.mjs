import { visit } from 'unist-util-visit'
import { camelCased, captialize, toJsxAttribute, toMdxJsxExpressionAttribute } from './helpers.mjs';

const MDI_PROPS = [
    {
        name: 'title',
        types: ['string'],
        optional: true,
        description: 'A11y <title>{title}</title>'
    },
    {
        name: 'description',
        types: ['string'],
        optional: true,
        description: 'A11y <desc>{desc}</desc>'
    },
    {
        name: 'size',
        types: ['number', 'string'],
        optional: true,
        description: '{size * 1.5}rem, 1em, 48px'
    },
    {
        name: 'horizontal',
        types: ['bool'],
        optional: true,
        description: 'Flip Horizontal'
    },
    {
        name: 'vertical',
        types: ['bool'],
        optional: true,
        description: 'Flip Vertical'
    },
    {
        name: 'rotate',
        types: ['number'],
        optional: true,
        description: 'degrees 0 to 360'
    },
    {
        name: 'color',
        types: ['string'],
        optional: true,
        description: 'rgb() / rgba() / #000'
    },
    {
        name: 'spin',
        types: ['number', 'bool'],
        optional: true,
        description: 'true = 2s, -2 counterclockwise, {spin}s'
    },
    {
        name: 'className',
        types: ['string'],
        optional: true,
        description: 'additional class names'
    }
]

/**
 * 
 * @param {{[key: string]: string}} attributes 
 * @param {{[key: string]: string}} keyAliases
 */
const transformAttributes = (attributes, keyAliases={class: 'className', classes: 'className'}) => {
    const props = []
    for (const [key, raw] of Object.entries(attributes)) {
        let k = key;
        if (k in keyAliases) {
            k = keyAliases[k];
        }
        const schema = MDI_PROPS.find((prop) => prop.name === k);
        if (schema) {
            const value = schema.types.reduce((acc, type) => {
                if (acc !== null) {
                    return acc;
                }
                switch (type) {
                    case 'string':
                        return raw;
                    case 'number':
                        const num = Number(raw === '' ? Number.NaN : raw);
                        return Number.isNaN(num) ? null : num;
                    case 'bool':
                        return raw === '' ? true : raw === 'true' ? true : raw === 'false' ? false : null;
                    default:
                        return null;
                }
            }, null);
            if (!schema.optional && value === null) {
                throw new Error(`Attribute ${k} is required for mdi icon: :mdi[path]. ${schema.description}.`);
            }
            props.push({key: k, value: value});
        }
    }
    return props;
}

const IMPORT_MDI_REACT_NODE = {
    type: 'mdxjsEsm',
    value: "import Icon from '@mdi/react';",
    data: {
        estree: {
            type: 'Program',
            body: [
                {
                    type: 'ImportDeclaration',
                    specifiers: [
                        {
                            type: 'ImportDefaultSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'Icon'
                            }
                        }
                    ],
                    source: {
                        type: 'Literal',
                        value: '@mdi/react',
                        raw: "'@mdi/react'"
                    }
                }
            ],
            sourceType: 'module',
            comments: []
        }
    }
};


const IMPORT_MDI_ICONS = (icons) => {
    return {
        type: 'mdxjsEsm',
        value: `import { ${icons.join(', ')} } from '@mdi/js';`,
        data: {
            estree: {
                type: 'Program',
                body: [
                    {
                        type: 'ImportDeclaration',
                        specifiers: icons.map((icon) => ({
                            type: 'ImportSpecifier',
                            imported: {
                              type: 'Identifier',
                              name: icon
                            },
                            local: {
                              type: 'Identifier',
                              name: icon
                            }
                          })),
                        source: {
                            type: 'Literal',
                            value: '@mdi/js',
                            raw: "'@mdi/js'"
                        }
                    }
                ],
                sourceType: 'module',
                comments: []
            }
        }
    };
} 


/**
 * requirements: @mdi/font
 * ```bash
 * yarn add @mdi/js @mdi/react
 * ```
 * @param {{colorMapping?: {[color: string]: string}, defaultSize?: number}} optionsInput
 * @returns {import('unified').Transformer}
 */
const plugin = function plugin(optionsInput = {}) {
    return function transformer(root) {
        let hasMdiIcons = false;
        let includedMdiIcons = new Set();
        let newMdiIcons = new Set();
        let includesIcon = false;

        visit(root, function (node, idx, parent) {
            if (node.type === 'mdxjsEsm') {
                if ((/import.*(Icon|{.*default\s+as\s+\w+.*}).*from '@mdi\/react'/).test(node.value || '')) {
                    includesIcon = true;
                }
                if ((/import.*{(.*)}.*from\s+'@mdi\/js'/).test(node.value || '')) {
                    const match = node.value.match(/import.*{(.*)}.*from\s+'@mdi\/js'/);
                    if (match) {
                        includedMdiIcons = match[1].split(',').forEach((s) => {
                            const ico = s.trim();
                            if (ico.startsWith('mdi')) {
                                includedMdiIcons.add(ico);
                            }
                        });
                    }
                }
                return;
            }
            if (node.type !== 'textDirective') {
                return;
            }
            if (node.name !== 'mdi') {
                return;
            }
            hasMdiIcons = true;
            const icon = node.children[0].value;
            const mdiIcon = `mdi${captialize(camelCased(icon))}`;
            newMdiIcons.add(mdiIcon);
            const path = toMdxJsxExpressionAttribute(
                'path',
                mdiIcon,
                {
                    type: 'Identifier',
                    name: mdiIcon
                }
            );
            const rawAttributes = transformAttributes(node.attributes || {});
            if (!rawAttributes.some((attr) => attr.key === 'size')) {
                rawAttributes.push({key: 'size', value: optionsInput.defaultSize || 1.5});
            }
            if (rawAttributes.some((attr) => attr.key === 'color')) {
                if (optionsInput.colorMapping) {
                    const color = rawAttributes.find((attr) => attr.key === 'color');
                    color.value = optionsInput.colorMapping[color.value] || color.value;
                }
            }
            const attributes = rawAttributes.map((attr) => toJsxAttribute(attr.key, attr.value));
            parent.children[idx] = {
                type: 'mdiIcon',
                data: {
                    hName: 'i',
                    hProperties: {
                        style: {
                            transform: 'translateY(15%)',
                            display: 'inline-block',
                        },
                    }
                },
                children: [
                    {
                       type: 'mdxJsxFlowElement',
                       name: 'Icon',
                       attributes: [
                           path,
                           ...attributes
                       ],
                       children: [],
                       data: {
                           ['_mdxExplicitJsx']: true
                       }
                   }
                ]
            }
        });

        if (hasMdiIcons && !includesIcon) {
            root.children.unshift(IMPORT_MDI_REACT_NODE);
        }
        if (newMdiIcons.size > 0) {
            root.children.unshift(IMPORT_MDI_ICONS([...newMdiIcons]));
        }
    }
}

export default plugin;