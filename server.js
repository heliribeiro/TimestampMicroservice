// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

function isValidDate(d) {
  if (d.toUTCString() == "Invalid Date") {
    return "Invalid Date";
  }
}

app.get(
  "/api/timestamp/:date_string?",
  function(req, res, next) {
    if (req.params.date_string == null) {
      req.time = new Date();
    } else {
      if (isNaN(req.params.date_string)) {
        req.time = new Date(req.params.date_string);
        isValidDate(req.time);
      } else {
        req.time = new Date(Number(req.params.date_string));
      }
    }
    next();
  },
  function(req, res) {
    console.log(req.time)
    if (req.time == "Invalid Date")
      res.json({ error: "Invalid Date" });
    else res.json({ unix: req.time.getTime(), utc: req.time.toUTCString() });
  }
);

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
