import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const key = `uploads/${Date.now()}-${file.name}`;

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME || "",
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: file.type,
      })
    );

    return NextResponse.json({ message: "File uploaded successfully", key });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
} 