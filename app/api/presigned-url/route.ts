import { uploadToMinio } from "@/data/api/handle-upload";
import { generatePresignedUrl } from "@/utils/minio-api";

import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: "Hello, world" }, { status: 200 });
  // return NextResponse.json({ message: "Not found" }, { status: 404 });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { message: "There's nothing in the request" },
      { status: 400 }
    );
  }

  try {
    const url = await generatePresignedUrl(
      body.bucketName,
      body.fileName,
      body.expiry
    );

    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
