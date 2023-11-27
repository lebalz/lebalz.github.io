import { visit, CONTINUE } from 'unist-util-visit';
import type { Plugin, Processor, Transformer } from 'unified';
import type { MdxJsxTextElement } from 'mdast-util-mdx';
import { Parent, PhrasingContent, Text } from 'mdast';
import { Node } from 'unist';

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

type ActionStates = 'SPLIT_BRACKETS' | 'SEEK_CLOSING_BRACKET' | 'CREATE_KBD';

const plugin: Plugin = function plugin(
    this: Processor,
    optionsInput?: {
        className?: string;
    }
): Transformer {
    const kbdClassName = optionsInput?.className;
    let actionState: ActionStates = 'SPLIT_BRACKETS';
    const nestingMap = new Map<Node, number>();

    /** a bracket stack for each nesting level */
    const bracketStack = new Map<number, number[]>();


    return async (ast, vfile) => {
        const kbds: MdxJsxTextElement[] = [];
        visit(ast, (node, idx, parent: Parent) => {
            if (!parent) {
                nestingMap.set(node, 0);
            }
            if (!nestingMap.get(node)) {
                nestingMap.set(node, nestingMap.get(parent) + 1);
            }
            if (!bracketStack.get(nestingMap.get(node))) {
                bracketStack.set(nestingMap.get(node), []);
            }
            /** 
             * visit text nodes and nest all nodes between a kbd sequence [[<content>]] in a kbd mdxJsxTextElement.
            */
            if (node.type === 'text') {
                const textNode = node as Text;
                switch (actionState) {
                    case 'SPLIT_BRACKETS':
                        const bracketIdx = [textNode.value.indexOf('[['), textNode.value.indexOf(']]')].filter(idx => idx > -1);
                        if (bracketIdx.length === 0) {
                            if (idx + 1 >= parent.children.length) {
                                actionState = 'CREATE_KBD';
                                return [CONTINUE, 0];
                            }
                            return CONTINUE;
                        }
                        parent.data = {...parent.data, hasKBD: true};
                        const splitIdx = Math.min(...bracketIdx);
                        const pre = textNode.value.slice(0, splitIdx);
                        const bracket = textNode.value.slice(splitIdx, splitIdx + 2);
                        const post = textNode.value.slice(splitIdx + 2);
                        
                        const stack = bracketStack.get(nestingMap.get(node))
                        let bracketId = stack.length;
                        if (bracket === '[[') {
                            stack.push(splitIdx);
                            bracketId++;
                        } else if (stack.length === 0) {
                            /** unmatched brackets - ignore */
                            bracketId--;
                        } else {
                            stack.pop();
                        }
                        const splitted = [{
                            type: 'text',
                            value: bracket,
                            data: bracketId > 0 ? {
                                id: bracketId
                            } : undefined
                        }] as Text[];
                        let nextIdx = idx + 1;
                        
                        if (pre) {
                            splitted.unshift({
                                type: 'text',
                                value: pre
                            });
                            nextIdx++;
                        }
                        if (post) {
                            splitted.push({
                                type: 'text',
                                value: post
                            });
                        }
                        parent.children.splice(idx, 1, ...splitted);
                        if (nextIdx >= parent.children.length) {
                            actionState = 'CREATE_KBD';
                            return [CONTINUE, 0];
                        }
                        return [CONTINUE, nextIdx];
                    case 'CREATE_KBD':
                        if (!parent.data?.hasKBD) {
                            actionState = 'SPLIT_BRACKETS';
                            return [CONTINUE, parent.children.length]
                        }
                        if (textNode.value === '[[') {
                            const bracketId = (textNode.data as {id: number}).id;
                            const closingIdx = parent.children.findIndex((node, ind) => ind > idx && (node as Text).value === ']]' && bracketId === (node.data as {id: number})?.id);
                            if (closingIdx > -1) {
                                parent.children.splice(idx, closingIdx - idx + 1,
                                    {
                                        type: 'mdxJsxTextElement',
                                        name: 'kbd',
                                        attributes: [],
                                        children: parent.children.slice(idx + 1, closingIdx),
                                        data: {
                                            ['_mdxExplicitJsx']: true
                                        }
                                    } as MdxJsxTextElement
                                );
                            }
                            return CONTINUE;
                        }

                        console.log('kbd', node);
                }
            }
        });
    }
}

export default plugin;