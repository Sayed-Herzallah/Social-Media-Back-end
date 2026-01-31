import CryptoJS from "crypto-js";

export const encryptPhone = ({phone}) => {
   return CryptoJS.AES.encrypt(
    phone,
    process.env.ENCRYPT_KEY
  ).toString();

};

export const decryptPhone = ({phone}) => {
  return CryptoJS.AES.decrypt(
    phone,
    process.env.ENCRYPT_KEY
  ).toString(CryptoJS.enc.Utf8);
};