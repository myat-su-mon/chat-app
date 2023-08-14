let express = require("express");
let app = express();

let guestRoute = require("./routes/guestRoute")(express);
let userRoute = require("./routes/userRoute")(express);

app.use("/", guestRoute);
app.use("/user", userRoute);

app.listen(3000, () => console.log(`server is running at 3000`));
