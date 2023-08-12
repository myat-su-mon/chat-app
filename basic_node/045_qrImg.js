let qr = require("qr-image");
let fs = require("fs");

let encodedString = process.argv[2];
let outputImage = process.argv[3];

let qrimg = qr.image(encodedString, { type: "png", size: 20 });
qrimg.pipe(fs.createWriteStream(outputImage));
