// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads view.html
    // app.get("/", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../views/main.handlebars"));
    // });

    // app.get('/', function(req, res) {
    //     res.render('index', { root: __dirname });
    // });

    app.get('/', function(res, res) {
        res.render(path.join(__dirname, '../views/index.handlebars'));
    });

    // cms route loads cms.html
    app.get("/endChat", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/endChat.html"));
    });




};