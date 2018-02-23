var express = require("express");
var bodyParser = require("body-parser");
var Pusher = require("pusher");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set up the pusher information to use chat feature
var pusher = new Pusher(
  { appId: "478426",
    key: "507bfdfaab454a693999",
    secret: "26efb694b16fb3444fc1",
    cluster: "us2"
  });

// Set up var app to use post and get to retrieve chat messages
app.post('/message', function (req, res) {
  var message = req.body.message;
  pusher.trigger('public-chat', 'message-added', { message });
  res.sendStatus(200);
});
app.get('/', function (req, res) {
  res.sendFile('/public/index.html', { root: __dirname });
});

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/controller.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});