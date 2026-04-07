import { client } from "@/sanity/client";
import { blogPostBySlugQuery, allBlogPostsQuery } from "@/sanity/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 60;

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

function formatDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(locale === "en" ? "en-GB" : "de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  SEO: "bg-blue-100 text-blue-700",
  Content: "bg-purple-100 text-purple-700",
  "Link Building": "bg-green-100 text-green-700",
  "Google Ads": "bg-orange-100 text-orange-700",
  "Social Media": "bg-pink-100 text-pink-700",
  Allgemein: "bg-gray-100 text-gray-700",
};

const ui = {
  de: {
    back: "← Zurück zum Blog",
    backAll: "← Alle Beiträge ansehen",
  },
  en: {
    back: "← Back to Blog",
    backAll: "← View all posts",
  },
};

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 leading-relaxed text-gray-700">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-blue-500 pl-5 italic text-gray-600 my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-outside pl-6 mb-5 space-y-1 text-gray-700">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-outside pl-6 mb-5 space-y-1 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImageSource & { alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <Image
          src={urlFor(value).width(900).url()}
          alt={value.alt ?? ""}
          width={900}
          height={500}
          className="w-full rounded-xl object-cover"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-gray-400 mt-2">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
};

interface BlogPost {
  title: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  excerpt: string;
  coverImage?: SanityImageSource & { alt?: string };
  author?: { name: string; avatar?: SanityImageSource };
  body: PortableTextBlock[];
}

interface Params {
  locale: string;
  slug: string;
}

export async function generateStaticParams() {
  const locales = ["de", "en"];
  const results: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts: BlogPost[] = await client
      .fetch(allBlogPostsQuery, { lang: locale })
      .catch(() => []);
    posts.forEach((post) => {
      results.push({ locale, slug: post.slug.current });
    });
  }

  return results;
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const lang = locale === "en" ? "en" : "de";
  const t = ui[lang as keyof typeof ui];

  const post: BlogPost | null = await client
    .fetch(blogPostBySlugQuery, { slug, lang })
    .catch(() => null);

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gray-50 border-b border-gray-200 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Link href={`/${lang}/blog`} className="text-sm text-blue-600 hover:underline mb-6 inline-block">
              {t.back}
            </Link>

            <div className="flex items-center gap-3 mb-4">
              {post.category && (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? "bg-gray-100 text-gray-700"}`}>
                  {post.category}
                </span>
              )}
              {post.publishedAt && (
                <span className="text-sm text-gray-400">{formatDate(post.publishedAt, lang)}</span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-gray-500 leading-relaxed">{post.excerpt}</p>
            )}

            {post.author?.name && (
              <div className="flex items-center gap-3 mt-6">
                {post.author.avatar && (
                  <Image
                    src={urlFor(post.author.avatar).width(40).height(40).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
              </div>
            )}
          </div>
        </section>

        {/* Cover image */}
        {post.coverImage && (
          <div className="max-w-4xl mx-auto px-4 pt-10">
            <Image
              src={urlFor(post.coverImage).width(1200).height(630).url()}
              alt={post.coverImage.alt ?? post.title}
              width={1200}
              height={630}
              className="w-full rounded-2xl object-cover shadow-sm"
            />
          </div>
        )}

        {/* Body */}
        <article className="max-w-3xl mx-auto px-4 py-12">
          {post.body && (
            <PortableText value={post.body} components={portableTextComponents} />
          )}
        </article>

        {/* Back link */}
        <div className="max-w-3xl mx-auto px-4 pb-16">
          <Link href={`/${lang}/blog`} className="text-sm text-blue-600 hover:underline">
            {t.backAll}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
