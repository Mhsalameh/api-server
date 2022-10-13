"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const food = require("./food.js");
const person = require("./person.js");
const Collection = require("./collection-class.js")
const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory" : process.env.DATABASE_URL;
console.log(POSTGRES_URI)

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(POSTGRES_URI, {});
const foodModel = food(sequelize, DataTypes);
const personModel = person(sequelize, DataTypes);

const collectFood = new Collection(foodModel);
const collectPerson = new Collection(personModel);

module.exports = {
  db: sequelize,
  Food: collectFood,
  Person: collectPerson,
};
