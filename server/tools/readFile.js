const fs = require("fs");
const path = require("path");
const results = require("./results");
const filePath = path.join(__dirname, "crojob.txt");

const readFile = async () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data;
  } catch (Err) {
    return "null";
  }
};

module.exports = readFile;
