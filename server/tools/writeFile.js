const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "crojob.txt");
const writeFile = async (id) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(id), "utf-8");
    console.log("File created and data written.");
  } catch (Err) {
    return Err;
  }
};

module.exports = writeFile;
