import * as fs from "fs";
import { createHash } from "crypto";

export const calculateHash = (path) => {
  const fileContents = fs.readFileSync(path, {
    encoding: "utf-8",
  });
  const hashedValue = createHash("sha256").update(fileContents).digest("hex");
  console.log(hashedValue);
};
