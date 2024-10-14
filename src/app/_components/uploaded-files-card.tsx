import Image from "next/image";
import { FileTextIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyCard } from "@/components/ui/empty-card";
import { useMemo } from "react";

interface UploadedFilesCardProps {
  uploadedFiles: File[];
  onRemove: (id: number) => Promise<void>;
}

export default function UploadedFilesCard({
  uploadedFiles,
  onRemove,
}: UploadedFilesCardProps) {
  console.log(uploadedFiles);
  const upload = useMemo(
    () => (
      <div className="w-full">
        <Card className="">
          <CardHeader>
            <CardTitle>Uploaded files</CardTitle>
            <CardDescription>View the uploaded files here</CardDescription>{" "}
          </CardHeader>
          <CardContent>
            {uploadedFiles.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {uploadedFiles.map((file: any) => {
                  if (
                    file.type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  ) {
                    return (
                      <div
                        key={file.id}
                        className="relative w-60 text-center shadow-md hover:shadow-2xl px-6 py-4"
                      >
                        <div
                          className="absolute text-xl right-2 top-2 font-bold text-red-900 cursor-pointer"
                          onClick={() => onRemove(file.id)}
                        >
                          X
                        </div>
                        <FileTextIcon width="100%" height="91%" />
                        <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                          {file.name}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={file.id}
                      className="relative flex flex-col justify-between text-center shadow-md hover:shadow-2xl px-6 py-4"
                    >
                      <div className="relative w-60 aspect-square">
                        <Image
                          src={file.url}
                          alt={file.name}
                          fill
                          sizes="(min-width: 640px) 640px, 100vw"
                          loading="lazy"
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div
                        className="absolute text-xl right-2 top-2 font-bold text-red-900 cursor-pointer"
                        onClick={() => onRemove(file.id)}
                      >
                        X
                      </div>

                      <div className="text-ellipsis">{file.name}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyCard
                title="No files uploaded"
                description="Upload some files to see them here"
                className="w-full"
              />
            )}
          </CardContent>
        </Card>
      </div>
    ),
    [uploadedFiles, onRemove]
  );

  return <>{upload}</>;
}
