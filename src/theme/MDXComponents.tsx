import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import DefinitionList from '../components/DefinitionList';
import Figure from '../components/Figure';
import SourceRef from '../components/Figure/SourceRef';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  dl: DefinitionList,
  Figure: Figure,
  SourceRef: SourceRef
};