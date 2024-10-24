import * as Minio from "minio";

// Create a new Minio client with the S3 endpoint, access key, and secret key
export const MinioClient = new Minio.Client({
  endPoint: "127.0.0.1",
  port: 9000,
  accessKey: "NqldujwxeL28LRWCMVsG",
  secretKey: "0BvKXykluTbRf9J3OLOOYfYWPwRnQn4v3daEbYG4",
  // Không có certificate để thử SSL
  // Sẽ ném lỗi `SSL routines:ssl3_get_record:wrong version number` nếu đặt true
  // Tham khảo: https://min.io/docs/minio/container/operations/network-encryption.html
  useSSL: false,
});

export async function createBucketIfNotExists(bucketName: string) {
  const bucketExists = await MinioClient.bucketExists(bucketName);
  if (!bucketExists) {
    console.log(`Bucket ` + bucketName + ` doesn't exist`);
    await MinioClient.makeBucket(bucketName);
    console.log(`Bucket ` + bucketName + ` created`);
  }
}
