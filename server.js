/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const path = require("path");
const next = require("next");

const fs = require("fs");
const { Blob } = require("buffer");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all("*", (req, res) => {
    var extname = path.extname("." + req.url);
    if ([".png", ".jpg", ".xlsx", ".jpeg"].includes(extname)) {
      let buffer = fs.readFileSync(process.cwd() + "/public/" + req.url);
      let blob = new Blob([buffer]);
      res.type(blob.type);
      blob.arrayBuffer().then((buf) => {
        res.send(Buffer.from(buf));
      });
      return;
    }
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
