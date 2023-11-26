import { visit, CONTINUE, SKIP, EXIT } from 'unist-util-visit';
import type { Plugin, Processor, Transformer } from 'unified';
import type { MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx';
import { BlockContent, Content, DefinitionContent, Parent, PhrasingContent, Text } from 'mdast';
import { Node } from 'unist';
import { c, s } from 'vitest/dist/reporters-5f784f42.js';

/**
 * Idea:
 * - visit all Parent-Nodes and check there for text nodes containing
 *   the start of a deflist 
 */


// match to determine if the line is an opening tag
const DD_REGEX = /(^|\r?\n):[ \t]+(.*?)/;
const DD_CONSECUTIVE_REGEX = /^(\r?\n)?:[ \t]+(.*?)/;
// const DL_ELEMENT_REGEX = /(?<dt>[^:\s].*\r?\n)?:[ \t]+(?<dd>.+?)\r?\n/;

const LINE_BREAK = {
    "type": "mdxJsxTextElement",
    "name": "br",
    "attributes": [],
    "children": [],
    "data": {
        "_mdxExplicitJsx": true
    }
} as MdxJsxTextElement;

const getDLNode = (children: Content[] = []) => {
    return {
        type: 'mdxJsxFlowElement',
        name: 'dl',
        attributes: [],
        children: children,
        data: {
            "_mdxExplicitJsx": true
        }
    } as MdxJsxFlowElement;
}

const getDTNode = (children: Content[]) => {
    return {
        type: 'mdxJsxFlowElement',
        name: 'dt',
        attributes: [],
        children: [{
            type: 'paragraph',
            children: children
        }],
        data: {
            "_mdxExplicitJsx": true
        }
    } as MdxJsxFlowElement;
}

const getDDNode = (children: Content[]) => {
    return {
        type: 'mdxJsxFlowElement',
        name: 'dd',
        attributes: [],
        children: [{
            type: 'paragraph',
            children: children
        }],
        data: {
            "_mdxExplicitJsx": true
        }
    } as MdxJsxFlowElement;
}

const plugin: Plugin = function plugin(
    this: Processor,
    optionsInput?: {
        className?: string;
    }
): Transformer {
    return async (ast, vfile) => {
        visit(ast, (node, idx, parent: Parent) => {
            if (node.type === 'paragraph') {
                let action: 'SEEK_DD_START' | 'SEEK_CONSECUTIVE_DD_START' | 'COLLECT_DT_BODY' | 'COLLECT_DD_BODY' | 'ADD_TO_DL' = 'SEEK_DD_START';
                visit(node, (cNode, cIdx, cParent: Parent) => {
                    /** this is the node itself... */
                    if (!cParent) {
                        return CONTINUE;
                    }
                    switch (action) {
                        case 'SEEK_DD_START':
                            if (cNode.type === 'text') {
                                const text = cNode as Text;
                                const ddMatch = text.value.match(DD_REGEX);
                                if (ddMatch) {
                                    const pre = text.value.slice(0, ddMatch.index);
                                    const dd = text.value.slice(ddMatch.index);
                                    if (pre.trim()) {
                                        cParent.children.splice(cIdx, 0, {
                                            type: 'text',
                                            value: pre
                                        });
                                        cIdx++;
                                    }
                                    cParent.children.splice(cIdx, 1, {
                                        type: 'text',
                                        value: dd.trimStart().slice(1).trimStart() // remove leading colon
                                    });
                                    action = 'COLLECT_DT_BODY';
                                    return [SKIP, cIdx];
                                }
                            }
                            return SKIP;
                        case 'COLLECT_DT_BODY':
                            visit(node, (dtNode, dtIdx, dtParent: Parent) => {
                                const correctNested = dtParent && dtParent === cParent;
                                if (!correctNested || dtIdx >= cIdx) {
                                    if (correctNested) {
                                        return SKIP;
                                    }
                                    return CONTINUE;
                                }
                                if (dtNode.type === 'text') {
                                    const text = dtNode as Text;
                                    const newLineMatch = text.value.match(/\r?\n/);
                                    if (newLineMatch) {
                                        const pre = text.value.slice(0, newLineMatch.index);
                                        const post = text.value.slice(newLineMatch.index + newLineMatch[0].length);
                                        const dtNodes = dtParent.children.splice(dtIdx + 1, cIdx - (dtIdx + 1));
                                        if (pre.trim()) {
                                            dtParent.children.splice(dtIdx, 0, {
                                                type: 'text',
                                                value: pre
                                            });
                                            dtIdx++;
                                        }
                                        if (post.trim()) {
                                            dtNodes.splice(0, 0, {
                                                type: 'text',
                                                value: post
                                            });
                                        };
                                        dtParent.children.splice(dtIdx, 0, getDTNode(dtNodes));
                                        action = 'ADD_TO_DL';
                                        return EXIT;
                                    }
                                }
                                if (dtIdx === 0) {
                                    const dtNodes = dtParent.children.splice(0, cIdx);
                                    dtParent.children.splice(0, 0, getDTNode(dtNodes));
                                    action = 'ADD_TO_DL';
                                    cIdx = 0;
                                    return EXIT;
                                }
                                return SKIP;
                            }, true);
                            return [SKIP, cIdx];
                        case 'ADD_TO_DL':
                            /** expect cIdx to be 0 */
                            if (cIdx !== 0) {
                                throw new Error('cIdx should be 0');
                            }
                            const hasDL = idx > 0
                                && cIdx === 0
                                && parent.children[idx - 1].type === 'mdxJsxFlowElement'
                                && (parent.children[idx - 1] as MdxJsxFlowElement).name === 'dl';
                            const node2move = cParent.children.splice(cIdx, 1)[0] as MdxJsxFlowElement;
                            if (node2move.name === 'dt') {
                                action = 'COLLECT_DD_BODY';
                            } else {
                                action = 'SEEK_CONSECUTIVE_DD_START';
                            }

                            if (hasDL) {
                                const dl = parent.children[idx - 1] as MdxJsxFlowElement;
                                dl.children.push(node2move);
                            } else {
                                const dl = getDLNode([node2move]);
                                parent.children.splice(idx, 0, dl);
                                idx++;
                            }
                            if (cParent.children.length === 0) {
                                parent.children.splice(idx, 1);
                                return EXIT;
                            }
                            return [SKIP, cIdx];
                        case 'COLLECT_DD_BODY':
                            visit(node, (ddNode, ddIdx, ddParent: Parent) => {
                                const correctNested = ddParent && ddParent === cParent;
                                if (!correctNested || ddIdx < cIdx) {
                                    if (correctNested) {
                                        return SKIP;
                                    }
                                    return CONTINUE;
                                }
                                if (ddNode.type === 'text') {
                                    const text = ddNode as Text;
                                    const newLineMatch = text.value.match(/\r?\n/);
                                    if (newLineMatch) {
                                        const dd = text.value.slice(0, newLineMatch.index);
                                        const post = text.value.slice(newLineMatch.index + newLineMatch[0].length);
                                        text.value = dd;
                                        const ddNodes = ddParent.children.splice(cIdx, ddIdx - cIdx + 1);
                                        ddParent.children.splice(cIdx, 0, getDDNode(ddNodes));
                                        if (post.trim()) {
                                            ddParent.children.splice(cIdx + 1, 0, {
                                                type: 'text',
                                                value: post
                                            });
                                        };
                                        action = 'ADD_TO_DL';
                                        return EXIT;
                                    }
                                }
                                if (ddIdx === cParent.children.length - 1) {
                                    const ddNodes = ddParent.children.splice(cIdx, ddIdx - cIdx + 1);
                                    ddParent.children.splice(cIdx, 0, getDDNode(ddNodes));
                                    action = 'ADD_TO_DL';
                                    return EXIT;
                                }
                            });
                            return [SKIP, cIdx];
                        case 'SEEK_CONSECUTIVE_DD_START':
                            if (cNode.type === 'text') {
                                const text = cNode as Text;
                                const ddMatch = text.value.match(DD_CONSECUTIVE_REGEX);
                                if (ddMatch) {
                                    const dd = text.value.slice(ddMatch.index);
                                    cParent.children.splice(cIdx, 1, {
                                        type: 'text',
                                        value: dd.trimStart().slice(1).trimStart() // remove leading colon
                                    });
                                    action = 'COLLECT_DD_BODY';
                                    return [SKIP, cIdx];
                                }
                            }
                            action = 'SEEK_DD_START';
                            return [SKIP, cIdx];
                    }
                    return SKIP;
                });
            }
        });
    }
}

export default plugin;