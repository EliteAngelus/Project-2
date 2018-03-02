// var express = require("express");
// var bodyParser = require("body-parser");

// var PORT = process.env.PORT || 3000;

// var app = express();

// // Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static("public"));

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
// app.use(bodyParser.json());

// // Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// // Import routes and give the server access to them.
// var routes = require("./controllers/controller.js");

// app.use(routes);

// app.listen(PORT, function() {
//   console.log("App now listening at localhost:" + PORT);
// });

// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
// var express = require("express");
// var bodyParser = require("body-parser");
// var Pusher = require("pusher");

// // Sets up the Express App
// // =============================================================
// var app = express();
// var PORT = process.env.PORT || 3000;

// // Requiring our models for syncing
// var db = require("./models");

// // Sets up the Express app to handle data parsing

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
// app.use(bodyParser.json());

// // Static directory
// app.use(express.static("public"));

// // Routes
// // =============================================================
// require("./routes/post-api-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/html-routes.js")(app);

// // Syncing our sequelize models and then starting our Express app
// // =============================================================
// db.sequelize.sync({ force: true }).then(function() {
//     app.listen(PORT, function() {
//         console.log("App listening on PORT " + PORT);
//     });
// });


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

var pusher = new Pusher({
    appId: "478426",
    key: "507bfdfaab454a693999",
    secret: "26efb694b16fb3444fc1",
    cluster: "us2"
});
pusher.trigger("public-language-app", "event", {
    "message": "Hello World!"
});

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set up var app to use post and get to retrieve chat messages
app.post('/message', function(req, res) {
    var message = req.body.message;
    pusher.trigger('public-language-chat', 'message-added', { message });
    res.sendStatus(200);
});

// Import routes and give the server access to them.
// var routes = require("./controllers/controller.js");

// app.use(routes);

// app.listen(PORT, function() {
//   console.log("App now listening at localhost:" + PORT);
// });

// Requiring our models for syncing
var db = require("./models");

// Routes
// =============================================================

require("./routes/db-api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});