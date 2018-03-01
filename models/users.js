module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    // Giving the learner model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Users.associate = function(models){
    Users.hasMany(models.ChatMessages, {
      onDelete: "cascade"
    });
  };


  return Users;
};

