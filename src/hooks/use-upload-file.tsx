import "dotenv/config";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "./use-toast";

function useUploadFile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const fetchData = async (abortController: AbortController) => {
    await fetch("/api/upload", {
      method: "GET",
      cache: "no-store",
      signal: abortController.signal,
    })
      .then(async (response) => {
        if (response?.ok) {
          const { data } = await response.json();
          setUploadedFiles(data);
          setRefresh(false);
        } else {
          throw new Error("Error on GET all files");
        }
      })
      .catch((err) => {
        if (abortController.signal.aborted) return;
      });
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (refresh) {
      fetchData(abortController);
    }

    return () => abortController.abort();
  }, [refresh]);

  const onUpload = useCallback(
    async (file: File, onSuccess: any) => {
      setIsUpdating(true);
      const data = new FormData();
      data.append("file", file);
      try {
        const res: Response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        if (!res.ok) throw new Error();
        toast({
          title: "File uploaded successfully",
          description: `${file.name} uploaded to local server, entry added in database`,
        });
        onSuccess();
        setRefresh(true);
      } catch {
        toast({
          variant: "destructive",
          title: "File uploaded failed",
          description: `Unable to upload ${file.name} to local server`,
        });
      } finally {
        setIsUpdating(false);
      }
    },
    [toast]
  );

  const onRemove = useCallback(
    async (id: number) => {
      try {
        setIsUpdating(true);
        const res: Response = await fetch("api/remove", {
          method: "POST",
          body: JSON.stringify({ id }),
        });
        if (!res.ok) throw new Error();
        toast({
          title: "File removed successfully",
          description: `Removed file from DB and Public folder`,
        });
        setRefresh(true);
      } catch {
        toast({
          variant: "destructive",
          title: "File remove failed",
          description: `Unable to remove file`,
        });
      } finally {
        setIsUpdating(false);
      }
    },
    [toast]
  );

  return {
    onUpload,
    onRemove,
    uploadedFiles,
    isUpdating,
  };
}

export { useUploadFile };
