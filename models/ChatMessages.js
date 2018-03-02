module.exports = function(sequelize, DataTypes) {
  var ChatMessages = sequelize.define("ChatMessages", {
    messages: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });
 var Users = require("./users.js");
  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
ChatMessages.associate = function (models){
  models.ChatMessages.belongsTo(models.Users, {
    onDelete: "CASCADE",
    foreignKey:{
      allowNull: false
    }
  })
};

  return ChatMessages;
};

