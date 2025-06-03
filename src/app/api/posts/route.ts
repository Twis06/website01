import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    console.log("Fetching posts...");
    const allPosts = await db.select().from(posts).orderBy(posts.createdAt);
    console.log("Posts fetched successfully:", allPosts);
    return NextResponse.json({ posts: allPosts });
  } catch (error) {
    console.error("Error in GET /api/posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session in POST /api/posts:", session);

    if (!session?.user?.email) {
      console.log("Unauthorized: No session or user email");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("Request body:", body);

    if (!body.title || !body.content) {
      console.log("Missing required fields:", { title: !body.title, content: !body.content });
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const { title, content, excerpt, published } = body;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const postData = {
      title,
      slug,
      content,
      excerpt,
      published: published ? 1 : 0,
      authorId: session.user.id || "1",
    };

    console.log("Creating post with data:", postData);

    try {
      // First check if a post with this slug already exists
      const existingPost = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug))
        .limit(1);

      if (existingPost.length > 0) {
        console.log("Post with this slug already exists:", existingPost[0]);
        return NextResponse.json(
          { error: "A post with this title already exists" },
          { status: 400 }
        );
      }

      console.log("Inserting post into database...");
      const newPost = await db
        .insert(posts)
        .values(postData)
        .returning();

      console.log("Post created successfully:", newPost);
      return NextResponse.json({ post: newPost[0] });
    } catch (dbError) {
      console.error("Database error:", dbError);
      if (dbError instanceof Error) {
        console.error("Database error details:", {
          message: dbError.message,
          stack: dbError.stack,
          name: dbError.name
        });
        if (dbError.message.includes("UNIQUE constraint failed")) {
          return NextResponse.json(
            { error: "A post with this title already exists" },
            { status: 400 }
          );
        }
        if (dbError.message.includes("no such table")) {
          return NextResponse.json(
            { error: "Database table not found. Please run migrations." },
            { status: 500 }
          );
        }
      }
      throw dbError;
    }
  } catch (error) {
    console.error("Error in POST /api/posts:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return NextResponse.json(
      { 
        error: "Failed to create post", 
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 