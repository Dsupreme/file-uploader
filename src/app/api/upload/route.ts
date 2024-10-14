import { insertFile } from "@/app/actions";
import { db } from "@/db";
import { filesTable } from "@/db/schema";
import { NextRequest } from "next/server";

import * as fs from "fs/promises";

export async function GET() {
  let data = await db.select().from(filesTable);
  data = data.map((file: any) => ({
    ...file,
    url: "/" + file.url,
  }));
  return Response.json({ data });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file || typeof file === "string") {
    return new Response(
      JSON.stringify({
        msg: "No file uploaded",
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile("./public/uploads/" + file.name, buffer);
    await insertFile({
      name: file.name,
      size: file.size,
      type: file.type,
      url: "uploads/" + file.name,
    });
    return Response.json(
      {},
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return Response.json(
      {
        msg: err.msg ?? "Something went wrong",
      },
      { status: 400 }
    );
  }
}
