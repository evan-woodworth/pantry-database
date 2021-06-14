require("dotenv").config();
const mongoose = require('mongoose');

let connectionString = "";
if (process.env.NODE_ENV === "production") {
  connectionString = process.env.DB_URL;
} else {
  connectionString = process.env.MONGO_URI;
}
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});

const db = mongoose.connection;

// Set up event for database to print connection
db.once('open', ()=>console.log(`Connect to MongoDB at ${db.host}:${db.port}`));

db.on('error', (error)=>console.log(`Database error`, error));

// Import all of your models
const User = require('./User');
const Ingredient = require('./Ingredient');
const Pantry = require('./Pantry');
const Recipe = require('./Recipe');
const Category = require('./Category');

// export all of the models from this file
module.exports = {
    User,
    Ingredient,
    Pantry,
    Recipe,
    Category
}