"use client";

import FileUploadForm from "@/components/form";
import handleUpload from "@/data/api/handle-upload";
import { IUploadRequest, IPresignedRequest } from "@/data/types";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export default function Home() {
  const [word, setWord] = useState<any>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files;
    if (!fileObj) {
      return;
    }

    console.log(fileObj);
  };

  const resetFileInput = () => {
    // 👇️ reset input value
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  async function upload() {
    if (inputRef.current) {
      const files = (document.getElementById("file-input") as HTMLInputElement)
        .files;

      const req = [] as IUploadRequest[];

      // Loop through multiple files
      for (let i = 0; i < files!.length; i++) {
        const body: IPresignedRequest = {
          bucketName: "test",
          fileName: `${files![i].name}`,
          expiry: 300,
        };

        // Get the presigned url for the image
        const presignedUrl = await postRequestFromApi(body);

        req.push({
          presignedUrl: presignedUrl,
          file: files![i],
        });
        console.log(req);
      }

      try {
        const response = (await handleUpload(req)).json();
        console.log(response.then((res) => console.log(res.message)));

        // setWord(`http://127.0.0.1:9000/test/${req[0].file.name}`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function postRequestFromApi(req: IPresignedRequest) {
    const response = await fetch("api/presigned-url", {
      method: "POST",
      body: JSON.stringify(req),
    });

    return response.json().then((res) => {
      return res;
    });
  }

  // return <FileUploadForm />;

  return (
    <>
      <div className="flex">
        <input
          ref={inputRef}
          id={"file-input"}
          type="file"
          onChange={handleFileChange}
          multiple
          required
        />
        <button
          className="border rounded px-2 hover:bg-slate-200"
          onClick={async () => {
            upload();
          }}
        >
          Put API
        </button>
      </div>
      {word && <Image src={word} alt={""} width={100} height={0} />}
    </>
  );
}
