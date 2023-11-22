import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import DefinitionList from '../components/DefinitionList';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  dl: DefinitionList
};