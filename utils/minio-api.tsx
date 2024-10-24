// cd utils
// npx tsx minio-api.tsx

import { createBucketIfNotExists, MinioClient } from "@/utils/minio-client";

// Generate presigned URL for a file for upload

export async function generatePresignedUrl(
  bucketName: string,
  fileName: string,
  expiry?: number
) {
  await createBucketIfNotExists(bucketName);

  try {
    const url = await MinioClient.presignedPutObject(
      bucketName,
      fileName,
      expiry
    );

    return url;
  } catch (error) {
    console.error(error);
  }
}

export async function generatePresignedDownloadLink(
  bucketName: string,
  fileName: string,
  expiry?: number
) {
  try {
    const url = await MinioClient.presignedGetObject(
      bucketName,
      fileName,
      expiry
    );

    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
  }
}

generatePresignedDownloadLink("test", "four-byte-burger.png", 300);
