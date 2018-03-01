// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

app.get("/", function(res, res) {
  res.sendFile(path.join(__dirname, "../views/layouts/main.handlebars"));
});

  // cms route loads cms.html
  app.get("/endChat", function(req, res) {
    res.sendFile(path.join(__dirname, "/endChat.html"));
  });
};
