const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./router/auth");
const organisationsRouter = require("./router/organisations");
const shiftsRouter = require("./router/shifts");
const usersRouter = require("./router/users");
const app = express();
const cors = require('cors');

const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.options('*', cors())

app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/organisations", organisationsRouter);
app.use("/shifts", shiftsRouter);
app.use("/users", usersRouter);
app.use(cors());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
