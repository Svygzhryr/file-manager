import * as fs from "fs";
import * as zlib from "zlib";
import { pipeline } from "stream";

export const compressFile = (path, dest) => {
  const brotli = zlib.createBrotliCompress();
  const input = fs.createReadStream(path).on("error", () => {
    return;
  });
  const output = fs.createWriteStream(dest).on("error", () => {
    return;
  });

  pipeline(input, brotli, output, (err) => {
    if (err) {
      console.error("Operation failed");
      return;
    }
    console.log(`File ${path} compressed into ${dest}!`);
  });
};
