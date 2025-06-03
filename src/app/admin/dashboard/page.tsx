"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

type FileInfo = {
  key: string;
  url: string;
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin");
    }
    if (status === "authenticated") {
      fetchFiles();
    }
    // eslint-disable-next-line
  }, [status]);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files");
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files);
      } else {
        setError("Failed to fetch files. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Failed to fetch files. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        fetchFiles(); // 刷新文件列表
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (key: string) => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/files?key=${encodeURIComponent(key)}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("File deleted successfully!");
        fetchFiles(); // 刷新文件列表
      } else {
        setError("Delete failed. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      setError("Delete failed. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center py-12">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/admin");
    return null;
  }

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog Management Card */}
        <Link
          href="/admin/blog"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Blog Management</h2>
          <p className="text-gray-600">
            Create, edit, and manage your blog posts
          </p>
        </Link>

        {/* File Management Card */}
        <Link
          href="/admin/files"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">File Management</h2>
          <p className="text-gray-600">
            Upload and manage your files
          </p>
        </Link>

        {/* Add more cards here as needed */}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
        {files.length === 0 ? (
          <p className="text-gray-500">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {files.map((file) => (
              <li key={file.key} className="flex items-center justify-between p-3 bg-white rounded-md hover:bg-gray-100 transition-colors">
                <span className="font-mono">{file.key}</span>
                <div className="flex space-x-2">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(file.key)}
                    className="text-red-600 hover:underline"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
} 