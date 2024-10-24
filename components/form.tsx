// Step 4

import { PresignedUrlProp, ShortFileProp } from "@/data/types";
import { FormEvent, useRef } from "react";

import getPresignedUrl from "@/data/api/get-url";
import handleUpload from "@/data/api/handle-upload";
import Image from "next/image";

export default function FileUploadForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function uploadToServer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const files = Object.values(fileInputRef.current?.files);
    console.log(files);

    const filesInfo: ShortFileProp[] = files.map((file) => ({
      originalFileName: file.name,
      fileSize: file.size,
    }));

    console.log(await getPresignedUrl(filesInfo));
    const presignedUrls = await getPresignedUrl(filesInfo);

    await handleUpload(files, presignedUrls);
  }

  return (
    <form
      className="flex flex-col items-center justify-center gap-3"
      onSubmit={uploadToServer}
    >
      <h1 className="text-2xl">
        File upload example using Next.js, MinIO S3, Prisma and PostgreSQL
      </h1>
      <div className="flex h-16 gap-5">
        <input
          id="file"
          type="file"
          multiple
          className="rounded-md border bg-gray-100 p-2 py-5"
          required
          ref={fileInputRef}
        />
        <button
          className="m-2 rounded-md bg-blue-500 px-5 py-2 text-white
            hover:bg-blue-600  disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Upload
        </button>
      </div>
      <Image
        src={"http://127.0.0.1:9000/chum/four-byte-burger.png"}
        alt={""}
        width={"100"}
        height={"100"}
      />
    </form>
  );
}
