import type { MDXComponents } from 'mdx/types';
import { mdxComponents as customComponents } from '@/components/mdx-components';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...customComponents,
  };
}
