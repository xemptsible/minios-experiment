import { NextResponse } from "next/server";
import { IUploadRequest } from "../types";

export default async function handleUpload(request: IUploadRequest[]) {
  const response = await Promise.all(
    request.map((body) => {
      if (!body.file) {
        throw new Error("File not found");
      }
      return uploadToMinio(body.presignedUrl, body.file);
    })
  );

  if (response.some((res) => res!.status !== 200)) {
    alert("Upload failed");
    return NextResponse.json(
      { message: "Error while uploading!" },
      { status: 400 }
    );
  } else
    return NextResponse.json(
      { message: "All files successfully uploaded!" },
      { status: 200 }
    );
}

export async function uploadToMinio(presignedUrl: string, file: File) {
  try {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
