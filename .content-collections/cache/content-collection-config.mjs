// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import readingTime from "reading-time";
var posts = defineCollection({
  name: "posts",
  directory: "data/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    images: z.any().optional(),
    authors: z.array(z.string()).optional(),
    layout: z.string().optional(),
    bibliography: z.string().optional(),
    canonicalUrl: z.string().optional()
  }),
  transform: (document, context) => {
    const slug = document._meta.path.replace(/^.+?(\/)/, "");
    const readingTimeResult = readingTime(document.content);
    return {
      title: document.title,
      date: document.date.toISOString(),
      tags: document.tags,
      lastmod: document.lastmod ? document.lastmod.toISOString() : void 0,
      draft: document.draft,
      summary: document.summary,
      images: document.images,
      authors: document.authors,
      layout: document.layout,
      bibliography: document.bibliography,
      canonicalUrl: document.canonicalUrl,
      content: document.content,
      _id: document._meta.filePath,
      _raw: { flattenedPath: document._meta.path },
      body: { raw: document.content, code: document.content },
      slug,
      path: `posts/${slug}`,
      filePath: document._meta.filePath,
      toc: [],
      readingTime: {
        text: readingTimeResult.text,
        minutes: readingTimeResult.minutes,
        time: readingTimeResult.time,
        words: readingTimeResult.words
      },
      structuredData: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: document.title,
        datePublished: document.date.toISOString(),
        dateModified: document.lastmod ? document.lastmod.toISOString() : document.date.toISOString(),
        description: document.summary || "",
        image: document.images ? document.images[0] : "/static/images/twitter-card.png",
        url: `https://arjunrao.co/posts/${slug}`
      }
    };
  }
});
var authors = defineCollection({
  name: "authors",
  directory: "data/authors",
  include: "**/*.mdx",
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    occupation: z.string().optional(),
    company: z.string().optional(),
    email: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    layout: z.string().optional()
  }),
  transform: (document, context) => {
    const slug = document._meta.path.replace(/^.+?(\/)/, "");
    return {
      name: document.name,
      avatar: document.avatar,
      occupation: document.occupation,
      company: document.company,
      email: document.email,
      twitter: document.twitter,
      linkedin: document.linkedin,
      github: document.github,
      layout: document.layout,
      content: document.content,
      _id: document._meta.filePath,
      _raw: { flattenedPath: document._meta.path },
      body: { raw: document.content, code: document.content },
      slug,
      path: document._meta.path,
      filePath: document._meta.filePath
    };
  }
});
var content_collections_default = defineConfig({
  collections: [posts, authors]
});
export {
  content_collections_default as default
};
