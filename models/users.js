module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        // Giving the learner model a name of type STRING
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        language: {
            type: DataTypes.STRING,
            allowNull: true
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    Users.associate = function(models) {
        Users.hasMany(models.ChatMessages, {
            onDelete: "cascade"
        });
    };


    return Users;
};