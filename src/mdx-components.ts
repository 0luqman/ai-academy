import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import type { UseMDXComponents } from 'nextra/mdx-components'
import { mdxComponents as customComponents } from '@/components/mdx-components'

const themeComponents = getThemeComponents()

export const useMDXComponents: UseMDXComponents<typeof themeComponents> = <T>(components: T) => ({
    ...themeComponents,
    ...customComponents,
    ...components
})
