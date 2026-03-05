import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { mdxComponents } from '@/components/mdx-components';

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = (page.data as any).body;

  return (
    <DocsPage toc={(page.data as any).toc} full={(page.data as any).full}>
      <DocsTitle>{(page.data as any).title}</DocsTitle>
      <DocsDescription>{(page.data as any).description}</DocsDescription>
      <DocsBody>
        <MDX components={mdxComponents} />
      </DocsBody>
      <div className="mt-16 pt-8 border-t border-white/5">
        <a
          href={`https://github.com/0luqman/ai-academy/edit/main/content/docs/${page.file.path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          📝 Edit this page on GitHub
        </a>
      </div>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = source.getPage(params.slug);
  if (!page) return {};

  return {
    title: (page.data as any).title,
    description: (page.data as any).description,
  };
}
