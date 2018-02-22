// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var user = {
  all: function(cb) {
    orm.all("userTable", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("userTable", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("userTable", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (controller.js).
module.exports = user;