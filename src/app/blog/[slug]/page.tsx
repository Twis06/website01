export const metadata = {
    title: "博客 | 你的站点名",
    description: "分享前端、设计与极简生活的博客。",
  };


import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const files = fs.readdirSync(postsDir);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.md$/, ""),
    }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "content/posts", `${slug}.md`);
  if (!fs.existsSync(filePath)) return notFound();

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <div className="text-gray-500 text-sm mb-6">{data.date}</div>
      <article className="prose prose-neutral">
        <MDXRemote source={content} />
      </article>
    </main>
  );
}
