"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  published: number;
  createdAt: string;
  updatedAt: string;
}

export default function BlogList() {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) {
      router.push('/admin');
    }
  }, [session, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch posts");
        }

        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchPosts();
    }
  }, [session]);

  if (!session || isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    );
  }

  if (!session.user) {
    return null;
  }

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          New Post
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          <div className="font-medium">Error</div>
          <div className="text-sm mt-1">{error}</div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {posts.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              No posts found. Create your first post!
            </li>
          ) : (
            posts.map((post) => (
              <li key={post.id}>
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-medium text-gray-900 truncate">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.published
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                      <Link
                        href={`/admin/blog/${post.slug}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Created: {new Date(post.createdAt).toLocaleDateString()}
                    {post.updatedAt !== post.createdAt && (
                      <span className="ml-4">
                        Updated: {new Date(post.updatedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
} 