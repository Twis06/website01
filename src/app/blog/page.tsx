export const metadata = {
    title: "博客 | 你的站点名",
    description: "分享前端、设计与极简生活的博客。",
  };

  
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

type PostMeta = {
  title: string;
  date: string;
  tags?: string[];
  slug: string;
  excerpt: string;
};

function getPosts(): PostMeta[] {
  const postsDir = path.join(process.cwd(), "content/posts");
  const files = fs.readdirSync(postsDir);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const { data, content: body } = matter(content);
      let excerpt = data.excerpt;
      if (!excerpt) {
        excerpt = body.replace(/[#>*\-\n]/g, "").slice(0, 100) + "...";
      }
      return {
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        slug: file.replace(/\.md$/, ""),
        excerpt,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">博客</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-8">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold text-gray-900 hover:underline">{post.title}</h2>
            </Link>
            <div className="text-gray-500 text-sm mb-2">{post.date}</div>
            {post.tags && (
              <div className="mb-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mr-2">{tag}</span>
                ))}
              </div>
            )}
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}