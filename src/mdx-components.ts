import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { mdxComponents as customComponents } from '@/components/mdx-components'

export function useMDXComponents(components: any): any {
    return {
        ...getThemeComponents(components),
        ...customComponents
    }
}
