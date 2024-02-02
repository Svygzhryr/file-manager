import * as fs from "fs";
import * as zlib from "zlib";
import { pipeline } from "stream";

export const decompressFile = (path, dest) => {
  const brotli = zlib.createBrotliDecompress();
  const input = fs.createReadStream(path).on("error", () => {
    return;
  });
  const output = fs.createWriteStream(dest).on("error", () => {
    return;
  });
  pipeline(input, brotli, output, () => {
    console.log(`File ${path} decompressed into ${dest}!`);
  }).on("error", () => {
    return;
  });
};
