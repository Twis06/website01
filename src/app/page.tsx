import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";

async function getLatestPosts() {
  const latestPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, 1))
    .orderBy(desc(posts.createdAt))
    .limit(3);
  return latestPosts;
}

export default async function Home() {
  const latestPosts = await getLatestPosts();

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          I&apos;m a full-stack developer passionate about creating beautiful and functional web applications.
        </p>
      </section>

      {/* Latest Blog Posts */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800"
          >
            View all posts →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600"
                  >
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt && (
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                )}
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-blue-600 hover:text-blue-800"
          >
            View all projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project cards will be added here */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Project 1</h3>
              <p className="text-gray-600 mb-4">
                A brief description of the project and its key features.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Demo
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Project 2</h3>
              <p className="text-gray-600 mb-4">
                A brief description of the project and its key features.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Demo
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">About Me</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 mb-4">
            I&apos;m a full-stack developer with expertise in modern web technologies.
            I love building applications that are both beautiful and functional.
          </p>
          <p className="text-gray-600 mb-4">
            My tech stack includes:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Frontend: React, Next.js, TypeScript</li>
            <li>Backend: Node.js, Express, PostgreSQL</li>
            <li>DevOps: Docker, AWS, CI/CD</li>
          </ul>
          <Link
            href="/about"
            className="text-blue-600 hover:text-blue-800"
          >
            Learn more about me @→
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 mb-4">
            I&apos;m always open to new opportunities and collaborations.
            Feel free to reach out to me through any of the following channels:
          </p>
          <div className="flex space-x-6">
            <a
              href="mailto:lipy.5101@gmail.com"
              className="text-blue-600 hover:text-blue-800"
            >
              Email
            </a>
            <a
              href="https://github.com/twis06"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}