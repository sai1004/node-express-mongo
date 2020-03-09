const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

/* '''''''' db '''''''' */
// on success
mongoose.connect(process.env.MONGO_URI).then(() =>
  console.log(`
  DB Result:
        Successfully Connected To DB! 
  `)
);
// on error
mongoose.connection.on("error", err =>
  console.log(` Error While Connecting To DB: ${err.message} `)
);

/* ''''''' bringing routes ''''''''' */
const postRoutes = require("./routes/post");

/* ''''''' middlewares ''''''''' */

// creating middlewares
const myOwnMiddleWare = (req, res, next) => {
  console.log("MiddleWare Applied!");
  next();
};

// using own and 3rd party middlewares
app.use(morgan("common"));
app.use(cors({ origin: "http://127.0.0.1:3000" }));
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.0.0" }));
app.use("/", postRoutes);
app.use(myOwnMiddleWare);

app.listen(port, err => {
  if (!err) {
    console.log(`
    
    ******************************************************
    NodeJs Server is listening on http://127.0.0.1:${port}

    ******************************************************
    `);
  }
});
