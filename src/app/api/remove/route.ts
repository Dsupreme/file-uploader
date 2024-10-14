import { NextRequest } from "next/server";

import * as fs from "fs/promises";
import { removeFile, selectFile } from "@/app/actions";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await selectFile(body);
  console.log(res);
  if (!res.length) {
    return Response.json(
      {
        msg: "File does not exist",
      },
      {
        status: 400,
      }
    );
  }
  try {
    fs.unlink("./public/" + res[0].url);
    removeFile(body);

    return Response.json(
      {
        msg: "File deleted successfully",
      },
      { status: 200 }
    );
  } catch {
    return Response.json(
      {
        msg: "Unable to delete file",
      },
      {
        status: 500,
      }
    );
  }
}
