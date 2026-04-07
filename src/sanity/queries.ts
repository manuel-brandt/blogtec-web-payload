import { groq } from "next-sanity";

export const allBlogPostsQuery = groq`*[_type == "blogPost" && language == $lang] | order(publishedAt desc){
  title,
  slug,
  publishedAt,
  category,
  excerpt,
  coverImage,
  "author": author.name
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug && language == $lang][0]{
  title,
  slug,
  publishedAt,
  category,
  excerpt,
  coverImage,
  author,
  body
}`;
