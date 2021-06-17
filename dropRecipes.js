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
const User = require('./models/User');
const Ingredient = require('./models/Ingredient');
const Pantry = require('./models/Pantry');
const Recipe = require('./models/Recipe');
const Category = require('./models/Category');


const removeRecipesFromUsers = async () => {
    const userList = await User.find();
    userList.forEach(user=>{
        console.log('------before----')
        console.log(user)
        for (const recipe of user.recipes) (
            user.recipes.pull(recipe)
        )
        console.log("-------after----")
        console.log(user.recipes)
        const savedUser = user.save()
    })
}

const removeRecipesFromDatabase = async () => {
    db.dropCollection("recipes", function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
      });
}

removeRecipesFromUsers()
removeRecipesFromDatabase()