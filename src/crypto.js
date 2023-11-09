// const { pbkdf2Sync, createHash } = await import("node:crypto");
// import { Buffer } from "node:buffer";

// const key = pbkdf2Sync("test1234", "test1234", 390000, 32, "sha256");
// // console.log(key); // '3745e48...08d59ae'
// // let xx = Buffer.from(key).toString("hex");
// // console.log(xx);
// // console.log(Buffer.from(key).toString("base64"));
//
// let yy = createHash("md5").update("test1234").digest("base64");
// console.log(yy);



import Utf8 from "crypto-js/enc-utf8";
import { encrypt } from "crypto-js/aes";

import { decrypt } from "crypto-js/aes";
const key="4M9LPeC5";
const iv =" yUbxcATp";
const password = encrypt("test1234", Utf8.parse(key), {
    iv: Utf8.parse(iv),
}).toString();
console.log(password)


const originPwd = decrypt(password, Utf8.parse(key), {iv:Utf8.parse(iv)})

console.log(originPwd)


