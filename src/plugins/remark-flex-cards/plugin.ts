import { visit, SKIP } from 'unist-util-visit';
import type { Plugin, Processor, Transformer } from 'unified';
import type { MdxJsxFlowElement } from 'mdast-util-mdx';
import { BlockContent, Content, DefinitionContent, Image, Paragraph, Parent } from 'mdast';
import { ContainerDirective, LeafDirective } from 'mdast-util-directive';
import { toJsxAttribute, transformAttributes } from '../helpers';
import { Node } from 'unist';

/** for creating cards or flex: :::cards, :::flex */
enum ContainerDirectiveName {
    Cards = 'cards',
    Flex = 'flex'
};

enum LeafDirectiveNames {
    Break = 'br'
}

const DEFAULT_CLASSES: {[key in ContainerDirectiveName]: {container: string, item: string, content: string}} = {
    cards: {
        container: 'flex-cards flex',
        item: 'item card',
        content: 'card__body'
    },
    flex: {
        container: 'flex',
        item: 'item',
        content: 'content'
    }
}

const generateContent = (type: ContainerDirectiveName): MdxJsxFlowElement & {data: {type: 'content'}} => {
    return {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [
            {
                type: 'mdxJsxAttribute',
                name: 'className',
                value: DEFAULT_CLASSES[type].content
            }
        ],
        children: [],
        data: {
            type: 'content',
            "_mdxExplicitJsx": true
        }
    }
}

const generateImage = (image: Paragraph): MdxJsxFlowElement & {data: {type: 'image'}} => {
    return {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [
            {
                type: 'mdxJsxAttribute',
                name: 'className',
                value: 'card__image'
            }
        ],
        children: [image],
        data: {
            type: 'image',
            "_mdxExplicitJsx": true
        }
    }
}

const generateItem = (type: ContainerDirectiveName, className?: string): MdxJsxFlowElement => {
    return {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [
            {
                type: 'mdxJsxAttribute',
                name: 'className',
                value: `${DEFAULT_CLASSES[type].item} ${className || ''}`.trim()
            }
        ],
        children: [],
        data: {
            "_mdxExplicitJsx": true
        }
    } as MdxJsxFlowElement;
}

const visitChildren = (block: Node, type: ContainerDirectiveName) => {
    const items: Parent[] = [];
    visit(block, (node, idx, parent: Parent) => {
        if (!parent) {
            return;
        }
        if (node.type === 'leafDirective' && (node as LeafDirective).name === LeafDirectiveNames.Break) {
            const directive = node as LeafDirective;
            const block = generateItem(type, directive.attributes?.class);
            const attributes = transformAttributes(directive.attributes);
            if (Object.keys(attributes.style).length > 0) {
                block.attributes.push(toJsxAttribute('style', attributes.style));
            }
            parent.children.splice(idx, 1, block);
            items.push(block);
            return SKIP;
        }
        /** ensure at least one item is present */
        if (items.length === 0) {
            const item = generateItem(type);
            items.push(item);
            /**
             * insert the new block before the current node
             */
            parent.children.splice(idx, 0, item);
            // and visit the current node again
            return [SKIP, idx + 1];
        }
        /** flatten images in paragraphs */
        if (type === ContainerDirectiveName.Cards && node.type === 'paragraph') {
            parent.children.splice(idx, 1, ...(node as Paragraph).children);
            return [SKIP, idx];
        }
        const item = items[items.length - 1];
        /** process image */
        if (type === ContainerDirectiveName.Cards && node.type === 'image') {
            const image = generateImage({
                type: 'paragraph',
                children: [node as Image]
            });
            item.children.push(image);
            parent.children.splice(idx, 1);
            return [SKIP, idx];
        }
        let content = item.children[item.children.length - 1] as Parent;
        if (!content || (content.data as {type?: string})?.type !== 'content') {
            content = generateContent(type);
            item.children.push(content as MdxJsxFlowElement);
        }
        content.children.push(node as Content);
        parent.children.splice(idx, 1);
        /** since the current position was removed, visit the current index again */
        return [SKIP, idx]
    });
}

const visitor = (ast: Node) => {
    visit(ast, (node, idx, parent: Parent) => {
        if (node.type !== 'containerDirective') {
            return;
        }
        const container = node as ContainerDirective;
        if (!Object.values(ContainerDirectiveName).includes(container.name as ContainerDirectiveName)) {
            return;
        }
        const type = container.name as ContainerDirectiveName;
        const attributes = transformAttributes(container.attributes);
        const block = {
          type: 'mdxJsxFlowElement',
          name: 'div',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'className',
              value: `${DEFAULT_CLASSES[type].container} ${attributes.className}`.trim()
            },
          ],
          children: container.children as (BlockContent | DefinitionContent)[],
          data: {
            "_mdxExplicitJsx": true
          }
        } as MdxJsxFlowElement;
        if (Object.keys(attributes.style).length > 0) {
            block.attributes.push(toJsxAttribute('style', attributes.style));
        }
        visitor(block);
        parent.children.splice(idx, 1, block);
        visitChildren(block, type);
    })
}

const plugin: Plugin = function plugin(
    this: Processor,
    optionsInput?: {}
): Transformer {
    return async (ast, vfile) => {
        visitor(ast);
    }
}


export default plugin;