const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

const Users = db.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: "id",
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "first_name",
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "last_name",
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: "username",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: "email",
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "password",
        },
    },
    {
        define: {
            freezeTableName: true,
        },
        hooks: {
            beforeCreate: async function (user) {
                user.email = user.email.toLowerCase();

                const salt = bcrypt.hash(user.password, salt);
                user.password = await bcrypt.hash(user.password, salt);
            },
        },
    }
);

Users.login = async function (email, password) {
    const user = await this.findOne({ where: { email } });
    if (!user) {
        throw Error("Error: email does not exist");
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
        throw Error("Error: password is incorrect");
    }

    return user;
};

module.exports = Users;
