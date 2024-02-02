import * as os from "os";

export const getOsInfo = (arg) => {
  switch (arg) {
    default:
      console.log("Invalid argument");
      break;
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;
    case "--cpus":
      console.log(os.cpus());
      break;
    case "--homedir":
      console.log(os.homedir());
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--architecture":
      console.log(os.arch());
      break;
  }
};
