"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadFile } from "@/hooks/use-upload-file";
import { SyntheticEvent, useRef, useState } from "react";

import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { cn, formatBytes } from "@/lib/utils";
import UploadedFilesCard from "../_components/uploaded-files-card";

const formSchema = z.object({
  file: z
    .instanceof(File, {
      message: "Please select a file.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The file is too large. Please choose a file smaller than ${formatBytes(
        MAX_FILE_SIZE
      )}.`,
    })
    .refine(
      (file) => {
        return ACCEPTED_FILE_TYPES.includes(file.type);
      },
      {
        message:
          "Please upload a valid image file (JPEG, PNG, or WebP) or Excel file.",
      }
    ),
});

type Schema = z.infer<typeof formSchema>;

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [isDragActive, setDragActive] = useState(false);

  const { onUpload, uploadedFiles, isUpdating, onRemove } = useUploadFile(); // progresses

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    formState: { isSubmitSuccessful },
    handleSubmit,
    control,
    reset,
    setValue,
  } = form;

  const removeFile = () => {
    formRef.current?.reset();
    reset({ file: undefined });
  };

  const handleDragEnter = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDrop = (e: any, field: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      field.onChange(e.dataTransfer.files![0]);
    }
  };
  const handleDragLeave = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDragOver = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  function onSubmit(input: Schema) {
    setLoading(true);
    onUpload(input.file, () => {
      removeFile();
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("flex w-full flex-col gap-6")}
          ref={formRef}
        >
          <FormField
            control={control}
            name="file"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        {...field}
                        ref={inputRef}
                        id="files"
                        type="file"
                        value={undefined}
                        onChange={(e) => {
                          field.onChange(e.target.files![0]);
                        }}
                        disabled={isUpdating}
                        className="hidden"
                        hidden
                      />
                      {!field.value && (
                        <p
                          className="w-full border border-dashed p-4 cursor-pointer"
                          onClick={() => {
                            inputRef.current?.click();
                          }}
                          onDragEnter={handleDragEnter}
                          onDrop={(e) => handleDrop(e, field)}
                          onDragLeave={handleDragLeave}
                          onDragOver={handleDragOver}
                        >
                          Drag and Drop or{" "}
                          <span className="underline text-blue-900 font-bold">
                            Select
                          </span>{" "}
                          File
                        </p>
                      )}
                      {field.value && (
                        <div className="w-full border border-dashed p-4  flex justify-between">
                          <div>{field.value.name}</div>
                          <div
                            className="text-red-900 font-bold px-4 cursor-pointer"
                            onClick={removeFile}
                          >
                            X
                          </div>
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <Button type="submit">Upload</Button>
        </form>
      </Form>
      <h1>Uploaded Files</h1>
      <UploadedFilesCard uploadedFiles={uploadedFiles} onRemove={onRemove} />
    </>
  );
}
