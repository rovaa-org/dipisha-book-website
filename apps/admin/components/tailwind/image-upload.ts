import { apiFetch } from "@/lib/api";
import { createImageUpload } from "novel";
import { toast } from "sonner";

const onUpload = (file: File) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';
  const promise = apiFetch(`${apiUrl}/api/uploads`, { 
    method: "POST",
    headers: {
      "content-type": file?.type || "application/octet-stream",
      "x-dipisha-filename": file?.name || "image.png",
      "X-Custom-Auth-Key": process.env.NEXT_PUBLIC_UPLOAD_AUTH_KEY!,
    },
    body: file,
  });

  return new Promise((resolve) => {
    toast.promise(
      promise.then(async (res) => {
        if (res.ok) {
          const { url } = (await res.json()) as { url: string };
          const image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };
        } else {
           const errorText = await res.text();
           throw new Error(`Error uploading image: ${errorText}`);
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => {
          return e.message;
        },
      },
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});