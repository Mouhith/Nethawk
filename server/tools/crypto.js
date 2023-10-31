const CryptoJS = require("crypto-js");
const iv = process.env.SECRETKEY_IV;
const encrypt = async (dataToEncrypt) => {
  const data = JSON.stringify(dataToEncrypt);
  const encrypted = CryptoJS.AES.encrypt(data, process.env.SECRETKEY, {
    iv,
  }).toString();
  return encrypted;
};
const decryption = async (dataTodecryPt) => {
  const decrypted = CryptoJS.AES.decrypt(dataTodecryPt, process.env.SECRETKEY, {
    iv,
  });
  const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

module.exports = {
  encrypt,
  decryption,
};
