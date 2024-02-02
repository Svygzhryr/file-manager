import * as os from "os";
import * as readline from "node:readline/promises";

import * as nav from "./scripts/nav.js";
import * as file from "./scripts/files.js";
import * as hash from "./scripts/hash.js";
import { getOsInfo } from "./scripts/osinfo.js";
import { compressFile } from "./scripts/compress.js";
import { decompressFile } from "./scripts/decompress.js";

const closeApp = () => {
  process.exit();
};

const beginListening = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (input) => {
    const args = input.split(" ");
    const command = args.shift();

    try {
      switch (command) {
        default:
          console.log("\x1b[36mInvalid input\x1b[0m");
          break;

        case "up":
          nav.goUp();
          break;

        case "cd":
          nav.changeDirectory(args[0]);
          break;

        case "ls":
          nav.showFileList();
          break;

        case "cat":
          file.readFile(args[0]);
          break;

        case "add":
          file.createFile(args[0]);
          break;

        case "rn":
          file.renameFile(args[0], args[1]);
          break;

        case "cp":
          file.copyFile(args[0], args[1]);
          break;

        case "mv":
          file.moveFile(args[0], args[1]);
          break;

        case "rm":
          file.deleteFile(args[0]);
          break;

        case "os":
          getOsInfo(args[0]);
          break;

        case "hash":
          hash.calculateHash(args[0]);
          break;

        case "compress":
          compressFile(args[0], args[1]);
          break;

        case "decompress":
          decompressFile(args[0], args[1]);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  });
};

const startApp = () => {
  const args = process.argv;
  let username = "";
  args.forEach((item) => {
    username = item.match(/(?<==)(.*)/g);
  });

  console.log(`Welcome to file manager, \x1b[34m${username}!\x1b[0m`);
  nav.changeDirectory(os.homedir());

  process.on("exit", () => {
    console.log(
      `Thank you for using File Manager, \x1b[34m${username}\x1b[0m, goodbye!`
    );
  });

  beginListening();

  console.log(`You can now start entering commands`);
};

startApp();
