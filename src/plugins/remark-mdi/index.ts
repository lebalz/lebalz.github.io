import {visit} from 'unist-util-visit';
import type {Transformer} from 'unified';

import type {MdxJsxFlowElement} from 'mdast-util-mdx';

// Transform <details> to <Details>
// MDX 2 doesn't allow to substitute html elements with the provider anymore
export default function plugin(): Transformer {
  return (root) => {
    visit(root, 'mdxJsxFlowElement', (node: MdxJsxFlowElement) => {
      if (node.name === 'details') {
        node.name = 'Details';
      }
    });
  };
}