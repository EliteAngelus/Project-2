var db = require("../models");

module.exports = function(app) {
  app.get("/api/ChatMessages", function(req, res) {
    db.ChatMessages.findAll({}).then(function(dbChatMessages) {
      res.json(dbChatMessages);
    });
  });


  app.post("/api/Users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.post("/api/ChatMessages", function(req, res){
     console.log(req.body);
    db.ChatMessages.create({
      messages: req.body.message,
      UserId: 1
    }).then(function(dbChatMessages){
      
      res.json(dbChatMessages);
    });
  });

  app.delete("/api/Users/:id", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

};
