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

const plugin: Plugin = function plugin(
    this: Processor,
    optionsInput?: {
        className?: string;
    }
): Transformer {
    const kbdClassName = optionsInput?.className;
    return async (ast, vfile) => {
        const kbds: MdxJsxTextElement[] = [];
        visit(ast, (node, idx, parent: Parent) => {
            /** 
             * visit text nodes and nest all nodes between a kbd sequence [[<content>]] in a kbd mdxJsxTextElement.
             */
            if (node.type === 'text') {
                const textNode = node as Text;
                const openingMatch = textNode.value.match(OPENING_REGEX);
                if (openingMatch) {
                    const pre = textNode.value.slice(0, openingMatch.index);
                    const post = textNode.value.slice(openingMatch.index + 2);
                    // remove the current text node from the parent's children array
                    parent.children.splice(idx, 1);
                    let spliceAt = idx;
                    /**
                     * some text was befor the opening brackets [[, so we need to insert it as a 
                     * text node before the kbd.
                     */
                    if (pre) {
                        // nested kbd - add to last kbd
                        if (kbds.length > 0) {
                            kbds[kbds.length - 1].children.push({
                                type: 'text',
                                value: pre
                            } as Text);
                        } else {
                            // new kbd - add to parent
                            parent.children.splice(spliceAt, 0, {
                                type: 'text',
                                value: pre
                            } as Text);
                            spliceAt++;
                        }
                    }
                    /**
                     * create a new kbd node
                     */
                    const kbd = {
                        type: 'mdxJsxTextElement',
                        name: 'kbd',
                        attributes: [],
                        children: [],
                        data: {
                            ['_mdxExplicitJsx']: true
                        }
                    } as MdxJsxTextElement;

                    /**
                     * add className attribute if configured
                     */
                    if (kbdClassName) {
                        kbd.attributes.push({
                            type: "mdxJsxAttribute",
                            name: "className",
                            value: kbdClassName
                        });
                    }

                    /**
                     * add the kbd node to the parent - either the parent node or the last kbd node
                     */
                    if (kbds.length > 0) {
                        kbds[kbds.length - 1].children.push(kbd);
                        // remember some meta-data: the parent node and the index of the kbd node in the parent's children array
                        kbd.data.parent = {
                            node: kbds[kbds.length - 1],
                            idx: kbds[kbds.length - 1].children.length - 1
                        };
                    } else {
                        parent.children.splice(spliceAt, 0, kbd);
                        // remember some meta-data: the parent node and the index of the kbd node in the parent's children array
                        kbd.data.parent = {
                            node: parent,
                            idx: spliceAt
                        };
                        spliceAt++;
                    }
                    // remember the kbd node
                    kbds.push(kbd);

                    /**
                     * some text was after the opening brackets [[, so we need to insert it as a
                     * text node after the kbd.
                     */
                    if (post) {
                        parent.children.splice(spliceAt, 0, {
                            type: 'text',
                            value: post
                        } as Text);
                        /** 
                         * return the index of the newly inserted text node, 
                         * so it will be visited next
                         */
                        return [CONTINUE, spliceAt];
                    }
                    // visit the next sibling
                    return [CONTINUE, spliceAt + 1];
                }
                const closingMatch = textNode.value.match(CLOSING_REGEX);

                // this only matters, when a kbd node is open
                if (closingMatch && kbds.length > 0) {
                    const pre = textNode.value.slice(0, closingMatch.index);
                    const post = textNode.value.slice(closingMatch.index + 2);
                    // remove the current text node from the parent's children array
                    parent.children.splice(idx, 1);
                    if (pre) {
                        kbds[kbds.length - 1].children.push({
                            type: 'text',
                            value: pre
                        } as Text);
                    }
                    // delete the meta-data from the kbd node
                    delete kbds[kbds.length - 1].data.parent;

                    // remove the kbd node from the kbds array
                    kbds.splice(kbds.length - 1, 1);

                    if (post) {
                        parent.children.splice(idx, 0, {
                            type: 'text',
                            value: post
                        } as Text);
                    }
                    /** 
                     * visit the next sibling - since we removed the closing kbd node, 
                     * we don't need to increment the index
                     */
                    return [CONTINUE, idx];
                } else if (kbds.length > 0) {
                    // remove the node and append it to the currently open kbd node
                    parent.children.splice(idx, 1);
                    kbds[kbds.length - 1].children.push({
                        type: 'text',
                        value: textNode.value
                    } as Text)
                    return [CONTINUE, idx];
                }
            } else {
                // if in a kbd sequence, append the node to the currently open kbd node
                if (kbds.length > 0) {
                    kbds[kbds.length - 1].children.push(node as PhrasingContent);
                    parent.children.splice(idx, 1);
                    return [CONTINUE, idx];
                }
            }
        });
        /**
         * cleanup: remove all unprocessed kbd nodes and replace them with their children
         * --> "[[ctrl]] + [[x" will result in "<kbd>ctrl</kbd> + [[x"
         */
        while (kbds.length > 0) {
            const kbd = kbds.pop();
            const parent = kbd?.data.parent as {node: Parent, idx: number};
            parent.node.children.splice(parent.idx, 1, {type: 'text', value: '[['}, ...kbd.children);
            delete kbd.data.parent;
        }
    }
}

export default plugin;