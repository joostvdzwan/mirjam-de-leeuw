import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ArticleBehaviour, { FirstVisitScript } from "@/components/kantlijn/ArticleBehaviour";
import {
  ArticleHead,
  ArticleHero,
  AuthorBlock,
  Faq,
  KnowWell,
  RelatedNotes,
  Sources,
  TableOfContents,
} from "@/components/kantlijn/ArticleParts";
import { CtaBand } from "@/components/kantlijn/CtaBand";
import { ArticleBody } from "@/components/kantlijn/mdx";
import { getArticle, getArticles, getRelated } from "@/lib/kantlijn/content";
import { articleJsonLd, articleMetadata } from "@/lib/kantlijn/seo";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return article ? articleMetadata(article) : {};
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  return (
    <div data-track={article.track}>
      <FirstVisitScript slug={article.slug} />
      <JsonLd data={articleJsonLd(article)} />
      <ArticleHead />
      <main id="main-content">
        <article data-slug={article.slug}>
          <ArticleHero article={article} />
          <div className="article-body">
            <TableOfContents article={article} />
            <ArticleBody source={article.body} />
            <KnowWell limits={article.limits} />
            <Faq title={article.faqTitle} items={article.faq} />
            <AuthorBlock updated={article.updated} />
            <Sources sources={article.sources} />
          </div>
          <CtaBand
            line={article.cta.line}
            accent={article.cta.accent}
            text="In 30 minuten vertel je wat er speelt, en kijken we samen of mijn manier van werken bij je past. Gratis en vrijblijvend."
          />
          <RelatedNotes items={getRelated(article.related)} />
        </article>
      </main>
      <ArticleBehaviour slug={article.slug} />
    </div>
  );
}
