const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.use(function(req, res, next){
  let string = `${req.method} ${req.path} - ${req.ip}`
 console.log(string) 
   
  next();
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
},
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

app.get('/:echo/echo', function(req, res) {
res.json(req.params);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});

app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

app.get("/json", (req, res) => {
if (process.env.MESSAGE_STYLE === "uppercase") {
  res.json({ message: "Hello json".toUpperCase()})
}
  res.json({
          message: "Hello json"
  })
});

 module.exports = app;
