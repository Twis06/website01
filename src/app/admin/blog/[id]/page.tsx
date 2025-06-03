"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

type Tab = "edit" | "preview";

export default function EditPost({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [published, setPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("edit");

  useEffect(() => {
    if (!session?.user) {
      router.push('/admin');
      return;
    }
    fetchPost();
  }, [session, router, fetchPost]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();
      setPost(data.post);
      setTitle(data.post.title);
      setContent(data.post.content);
      setExcerpt(data.post.excerpt || "");
      setPublished(data.post.published);
    } catch (error) {
      console.error("Error fetching post:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          content,
          excerpt,
          published,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update post");
      }

      router.push("/admin/blog");
    } catch (error) {
      console.error("Error updating post:", error);
      setError(error instanceof Error ? error.message : "Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (session === null || isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <div className="text-lg font-medium text-red-600">Post not found</div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Post</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          <div className="font-medium">Error</div>
          <div className="text-sm mt-1">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === "edit"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === "preview"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Preview
              </button>
            </div>
          </div>
          <div data-color-mode="light">
            {activeTab === "edit" ? (
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || "")}
                height={400}
              />
            ) : (
              <div className="border rounded-md p-4 min-h-[400px] bg-white">
                <MarkdownPreview source={content} />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
            Published
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </main>
  );
} 