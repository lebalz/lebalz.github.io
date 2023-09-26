import visit from 'unist-util-visit';

/**
 * 
 * @param {import('mdast-util-directive').ContainerDirective} directive 
 * @returns {{directiveLabel?: import('mdast').Parent, contentNodes: import('mdast-util-directive').ContainerDirective['children']}
 */
function parseDirective(directive) {
  const hasDirectiveLabel =
    directive.children?.[0]?.data?.directiveLabel === true;
  if (hasDirectiveLabel) {
    const [directiveLabel, ...contentNodes] = directive.children;
    return {directiveLabel: directiveLabel, contentNodes};
  }
  return {directiveLabel: undefined, contentNodes: directive.children};
}

/**
 * 
 * @param {directiveLabel?: import('mdast').Parent} directiveLabel 
 * @returns {string | undefined}
 */
function getTextOnlyTitle(directiveLabel) {
  const isTextOnlyTitle =
    directiveLabel?.children?.length === 1 &&
    directiveLabel?.children?.[0]?.type === 'text';
  return isTextOnlyTitle
    ? directiveLabel?.children?.[0].value
    : undefined;
}

/**
 * 
 * @param {import('unified').Processor} this 
 * @returns {import('unified').Transformer}
 */
const plugin = function plugin(this) {
    const {keywords} = {keywords: ['flex', 'cards']};
  
    return async (root) => {
      visit(root, (node) => {
        if (node.type === 'containerDirective') {
          const directive = node;
          const shouldHandle = keywords.includes(directive.name);
  
          if (!shouldHandle) {
            return;
          }
  
          const {directiveLabel, contentNodes} = parseDirective(directive);
  
          const textOnlyTitle =
            directive.attributes?.title ??
            (directiveLabel ? getTextOnlyTitle(directiveLabel) : undefined);
  
          // Transform the mdast directive node to a hast admonition node
          // See https://github.com/syntax-tree/mdast-util-to-hast#fields-on-nodes
          // TODO in MDX v2 we should transform the whole directive to
          // mdxJsxFlowElement instead of using hast
          directive.data = {
            hName: 'admonition',
            hProperties: {
              ...(textOnlyTitle && {title: textOnlyTitle}),
              type: directive.name,
            },
          };
          directive.children = contentNodes;
  
          // TODO legacy MDX v1 <mdxAdmonitionTitle> workaround
          // v1: not possible to inject complex JSX elements as props
          // v2: now possible: use a mdxJsxFlowElement element
          // if (directiveLabel && !textOnlyTitle) {
          //   const complexTitleNode = {
          //     type: 'flexHTML',
          //     data: {
          //       hName: 'div',
          //       hProperties: {},
          //     },
          //     children: directiveLabel.children,
          //   };
          //   // @ts-expect-error: invented node type
          //   directive.children.unshift(complexTitleNode);
          // }
        }
      });
    };
  };
  
  export default plugin;