import React from 'react'

const themeConfig = {
    logo: <span>AI Academy by RiWoT</span>,
    project: {
        link: 'https://github.com/0luqman/ai-academy',
    },
    docsRepositoryBase: 'https://github.com/0luqman/ai-academy',
    footer: {
        text: (
            <span>
                Built by RiWoT | AI Academy by RiWoT {new Date().getFullYear()}
            </span>
        ),
    },
    useNextSeoProps() {
        return {
            titleTemplate: '%s – AI Academy by RiWoT'
        }
    }
}

export default themeConfig
