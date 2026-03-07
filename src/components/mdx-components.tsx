import Playground from "./Playground";
import Quiz from "./Quiz";
import CodeBlock from "./CodeBlock";

export const mdxComponents = {
    Playground,
    Quiz,
    h1: (props: any) => <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 mt-10" {...props} />,
    h2: (props: any) => <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-10 mb-4" {...props} />,
    h3: (props: any) => <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4" {...props} />,
    p: (props: any) => <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4 font-medium text-muted-foreground/80" {...props} />,
    ul: (props: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground/80" {...props} />,
    ol: (props: any) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground/80" {...props} />,
    code: (props: any) => <code className="relative rounded bg-primary/10 text-primary px-[0.4rem] py-[0.2rem] font-mono text-[0.85em] font-black" {...props} />,
    pre: (props: any) => <CodeBlock {...props} />,
    a: (props: any) => <a className="font-bold text-primary underline underline-offset-4 hover:text-primary/80 transition-colors" {...props} />,
};
