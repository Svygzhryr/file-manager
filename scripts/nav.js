import * as fs from "fs";

export const showCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const changeDirectory = (directory) => {
  process.chdir(directory);
  showCurrentDirectory();
};

export const goUp = () => {
  process.chdir("../");
  showCurrentDirectory();
};

export const showFileList = async () => {
  let tableData = [];
  fs.readdir(process.cwd(), { withFileTypes: true }, async (err, files) => {
    files.forEach((file, index) => {
      const promise = new Promise((resolve, reject) => {
        resolve({
          name: file.name,
          type: file.isDirectory() ? "directory" : "file",
        });
      });
      tableData.push(promise);
    });
    const filesArray = await Promise.all(tableData);
    const dirs = filesArray.filter((file) => file.type === "directory");
    const fls = filesArray.filter((file) => file.type === "file");
    console.table([...dirs, ...fls]);
  });
};
