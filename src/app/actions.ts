import { db } from "@/db";
import { filesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function insertFile(file: any) {
  console.log(file);
  await db.insert(filesTable).values({
    name: file.name,
    size: file.size,
    type: file.type,
    url: file.url,
    uploadedAt: new Date(),
  });
}

export async function selectFile({ id }: { id: number }) {
  return await db.select().from(filesTable).where(eq(filesTable.id, id));
}

export async function removeFile({ id }: { id: number }) {
  await db.delete(filesTable).where(eq(filesTable.id, id));
}
