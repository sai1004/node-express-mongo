const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

/* '''''''' db '''''''' */
// on success
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true }).then(() =>
  console.log(`
  DB Result:
        ----------------------------
        Successfully Connected To DB!
        ---------------------------- 
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
app.use(cors());

var whitelist = ["http://127.0.0.1:4200"];
var corsOptionsDelegate = function(req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.0.0" }));
app.use(bodyParser.json());
app.use("/", cors(corsOptionsDelegate), postRoutes);
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
