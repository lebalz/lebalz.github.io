import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import DefinitionList from '../components/DefinitionList';
import Fucktails from '../components/Fucktails';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  dl: DefinitionList,
  Fucktails: Fucktails
};