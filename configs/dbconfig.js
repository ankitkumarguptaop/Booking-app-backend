const dotenv = require("dotenv");
dotenv.config();
module.exports={
  "development": {
    "username": process.env.DB_USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_TYPE
  },
  "test": {
    "username": process.env.DB_USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": "database_test",
    "host":  process.env.DB_HOST,
    "dialect": process.env.DB_TYPE
  },
  "production": {
    "username": process.env.DB_USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": "database_production",
    "host":  process.env.DB_HOST,
    "dialect": process.env.DB_TYPE
  }
}
