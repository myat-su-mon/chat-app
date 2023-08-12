let fs = require("fs");

// fs.writeFile("test.txt", "myat", function (err) {
//   if (err) console.log(err);
//   else console.log("File Successfully Write");
// });

fs.readFile("ab.txt", "utf-8", function (err, result) {
  if (err) console.log(err);
  else console.log(result);
});

// fs.appendFile("test.txt", " finally", function (err) {
//   if (err) console.log(err);
//   else console.log("File Successfully Append");
// });
