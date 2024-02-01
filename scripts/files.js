import * as fs from "fs";

export const readFile = (path) => {
  const rs = fs.createReadStream(path, {});
  rs.on("data", (data) => {
    console.log(data.toString());
  });
};

export const createFile = (name) => {
  fs.open(name, "w", (err) => {
    if (err) throw err;
    console.log(`File ${name} created!`);
  });
};

export const renameFile = (oldName, newName) => {
  fs.rename(oldName, newName, (err) => {
    if (err) throw err;
    console.log(`File ${oldName} renamed to ${newName}`);
  });
};

export const copyFile = (path, dest) => {
  fs.createReadStream(path)
    .pipe(fs.createWriteStream(dest))
    .on("finish", () => {
      console.log(`File ${path} copied!`);
    });
};

export const moveFile = (path, dest) => {
  fs.createReadStream(path)
    .pipe(fs.createWriteStream(dest))
    .on("finish", () => {
      fs.unlink(path, (err) => {
        if (err) throw err;
        console.log(`File ${path} moved!`);
      });
    });
};

export const deleteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
    console.log(`File ${path} deleted!`);
  });
};
