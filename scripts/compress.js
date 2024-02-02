import * as fs from "fs";
import * as zlib from "zlib";
import { pipeline } from "stream";

export const compressFile = (path, dest) => {
  const brotli = zlib.createBrotliCompress();
  const input = fs.createReadStream(path);
  const output = fs.createWriteStream(dest);

  pipeline(input, brotli, output, (err) => {
    if (err) throw err;
    console.log(`File ${path} compressed into ${dest}!`);
  });
};
