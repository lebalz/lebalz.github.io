import { visit, CONTINUE } from 'unist-util-visit';
import type { Plugin, Processor, Transformer } from 'unified';
import type { MdxJsxTextElement } from 'mdast-util-mdx';
import { Content, Parent, PhrasingContent, Text } from 'mdast';
import { toString } from 'mdast-util-to-string';

/**
 * negative lookbehind:
 * @example (?<!y)x   Matches "x" only if "x" is not preceded by "y".
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
 * 
 * here: match opening brackets [[ that are not preceded by closing brackets ]]
 */
const OPENING_REGEX = /(?<!(\]{2}?.*?))\[{2}?/;

/**
 * negative lookbehind:
 * @example (?<!y)x   Matches "x" only if "x" is not preceded by "y".
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
 * 
 * here: match closing brackets ]] that are not preceded by opening brackets [[
 */
const CLOSING_REGEX = /(?<!(\[{2}?.*?))\]{2}?/;

const visitChildren = (root: Parent, kbdClassName: string = '') => {
    const kbds: MdxJsxTextElement[] = [];
    // const buffer: (Content | Parent)[][] = [];
    visit(root, (node, idx, parent: Parent) => {
        if (node.type === 'text') {
            const textNode = node as Text;
            const openingMatch = textNode.value.match(OPENING_REGEX);
            if (openingMatch) {
                const pre = textNode.value.slice(0, openingMatch.index);
                const post = textNode.value.slice(openingMatch.index + 2);
                parent.children.splice(idx, 1);
                let spliceAt = idx;
                if (pre) {
                    if (kbds.length > 0) {
                        kbds[kbds.length - 1].children.push({
                            type: 'text',
                            value: pre
                        } as Text);
                    } else {
                        parent.children.splice(spliceAt, 0, {
                            type: 'text',
                            value: pre
                        } as Text);
                        spliceAt++;
                    }
                }
                const kbd = {
                    type: 'mdxJsxTextElement',
                    name: 'kbd',
                    attributes: [],
                    children: [],
                    data: {
                        ['_mdxExplicitJsx']: true,
                        locator: []
                    }
                } as MdxJsxTextElement;
                if (kbdClassName) {
                    kbd.attributes.push({
                          type: "mdxJsxAttribute",
                          name: "className",
                          value: kbdClassName
                    });
                }
                if (kbds.length > 0) {
                    kbds[kbds.length - 1].children.push(kbd);
                    kbd.data.locator = kbds[kbds.length - 1].data.locator as number[];
                    (kbd.data.locator as number[]).push(kbds[kbds.length - 1].children.length - 1);
                } else {
                    parent.children.splice(spliceAt, 0, kbd);
                    kbd.data.locator = [spliceAt];
                    spliceAt++;
                }
                kbds.push(kbd);
                if (post) {
                    parent.children.splice(spliceAt, 0, {
                        type: 'text',
                        value: post
                    } as Text);
                    return [CONTINUE, spliceAt];
                }
                return [CONTINUE, spliceAt + 1];
            }
            const closingMatch = textNode.value.match(CLOSING_REGEX);
            if (closingMatch && kbds.length > 0) {
                const pre = textNode.value.slice(0, closingMatch.index);
                const post = textNode.value.slice(closingMatch.index + 2);
                parent.children.splice(idx, 1);
                if (pre) {
                    kbds[kbds.length - 1].children.push({
                        type: 'text',
                        value: pre
                    } as Text);
                }
                kbds.splice(kbds.length - 1, 1);
                if (post) {
                    parent.children.splice(idx, 0, {
                        type: 'text',
                        value: post
                    } as Text);
                }
                return [CONTINUE, idx];
            } else if (kbds.length > 0) {
                parent.children.splice(idx, 1);
                kbds[kbds.length - 1].children.push({
                    type: 'text',
                    value: textNode.value
                } as Text)
                return [CONTINUE, idx];
            }
        } else {
            if (kbds.length > 0) {
                kbds[kbds.length - 1].children.push(node as PhrasingContent);
                parent.children.splice(idx, 1);
                return [CONTINUE, idx];
            }
        }
    });
    while (kbds.length > 0) {
        const kbd = kbds.pop();
        const locator = kbd?.data.locator as number[];
        const kbdParent = locator.slice(0, locator.length - 1).reduce((parent, idx) => {
            return parent.children[idx] as Parent;
        }, root);
        kbdParent.children.splice(locator[locator.length - 1], 1, {type: 'text', value: '[['}, ...kbd.children);
    }
}

const plugin: Plugin = function plugin(
    this: Processor,
    optionsInput?: {
        className?: string;
    }
): Transformer {
    return async (ast, vfile) => {
        visit(ast, (node, idx, parent: Parent) => {
            if ((node as Parent).children?.length > 0 && (node as Parent).children.some(child => child.type === 'text')) {
                const container = node as Parent;
                const content = toString(container);
                if (/\[\[.*?\]\]/.test(content)) {
                    visitChildren(container, (optionsInput || {}).className);
                }
            }
        })
    }
}

export default plugin;