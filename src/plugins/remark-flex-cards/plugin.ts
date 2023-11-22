import { visit, CONTINUE, SKIP } from 'unist-util-visit';
import type { Plugin, Processor, Transformer } from 'unified';
import type { MdxJsxFlowElement } from 'mdast-util-mdx';
import { BlockContent, Content, DefinitionContent, Image, Paragraph, Parent, PhrasingContent, Text } from 'mdast';
import { ContainerDirective, LeafDirective } from 'mdast-util-directive';
import { toJsxAttribute, toMdxJsxExpressionAttribute, transformAttributes } from '../helpers';
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

const flattenImages = (nodes: Content[]) => {
    return nodes.map((node) => {
        if (node.type === 'paragraph' && node.children.length === 1 && node.children[0].type === 'image') {
            return node.children[0];
        }
        return node;
    })
}

const generateContent = (type: ContainerDirectiveName): MdxJsxFlowElement => {
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

const generateImage = (image: Paragraph): MdxJsxFlowElement => {
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
        children: [generateContent(type)],
        data: {
            "_mdxExplicitJsx": true
        }
    } as MdxJsxFlowElement;
}

const visitImages = (paragraph: Paragraph, item: Parent) => {
    const currentContent = () => item.children[item.children.length - 1] as Parent;
    visit(paragraph, (node, idx, parent: Parent) => {
        if (!parent) {
            return;
        }
        if (node.type === 'image') {
            const image = generateImage({
                type: 'paragraph',
                children: [node]
            } as Paragraph);
            parent.children.splice(idx, 1);
            item.children.push(image as Content);
            return [SKIP, idx];
        } else {
            if (item.children.length === 1) {
                return SKIP;
            }
            if ((currentContent().data as {type?: string})?.type !== 'content') {
                item.children.push(generateContent(ContainerDirectiveName.Cards));
                parent.children.splice(idx, 1);
            }
            currentContent().children.push(node as PhrasingContent);
            return [SKIP, idx];
        }
    });
    const firstContent = item.children[0] as Parent;
    if (firstContent.children.length === 1 && firstContent.children[0].type === 'paragraph') {
        const paragraph = firstContent.children[0] as Paragraph;
        if (paragraph.children.length === 0) {
            item.children.splice(0, 1);
        }
    }
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
            return CONTINUE;
        }
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
        const wrapper = items[items.length - 1].children[0] as Parent;
        wrapper.children.push(node as Content);
        if (type === ContainerDirectiveName.Cards && node.type === 'paragraph') {
            visitImages(node as Paragraph, items[items.length - 1]);
        }
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