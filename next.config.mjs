import nextra from 'nextra'

const withNextra = nextra({
    latex: true,
    defaultShowCopyCode: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

export default withNextra(nextConfig)
