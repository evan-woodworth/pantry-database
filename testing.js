const {User, Recipe, Pantry, Ingredient} = require('./models') 

// const testFunction = async () => {
//     console.log('###############################')
//     const user = await User.findOne({email: 'test8@hotmail.com'})
//     console.log(user)
//     const newPantry = new Pantry({
//         name: "dumbPantry",
//         type: "Personal"
//     })
//     newPantry.users.push({
//         user, 
//         access: true,
//         admin: true
//     })
//     const savedNewPantry = await newPantry.save()
//     console.log(savedNewPantry)
//     console.log('****************')
//     console.log(newPantry)
//     user.pantries.push(savedNewPantry)
//     const savedUser = await user.save()
//     console.log(savedUser)
//     const newShoppingList = savedNewPantry.shoppingLists.push({
//         name: "dumberShoppingList"
//     }) 
    
//     console.log(newShoppingList)
//     const savedAnotherNewShoppingList = await savedNewPantry.save()
//     console.log(savedAnotherNewShoppingList)
//     console.log(newShoppingList) 

// }

// testFunction();

const findUsers = async () => {
    const users = await User.find();
    console.log(users);
}

const findUser = async (userId) => {
    const user = await User.findById(userId);
    console.log(user);
}

const findUserRecipes = async (userId) => {
    const user = await User.findById(userId).populate("recipes")
    console.log(user)
}

const findRecipes = async () => {
    const recipes = await Recipe.find()
    console.log(recipes)
}

const findRecipe = async (recipeId) => {

}

const removeRecipeFromUser = async (userId, recipeId) => {
    // User.updateOne({_id: userId}, {$pull:{recipes:recipeId}},{multi:true});
    const user = await User.findById(userId)
    console.log(user.recipes)
    user.recipes.pull(recipeId)
    console.log(user.recipes)
    const savedUser = await user.save();
    console.log(savedUser);
}

// findUsers();
// findRecipes();

removeRecipeFromUser("60c6c3a730315b0b9f5f98bc", "60c78609f0835b08b459ae44")
// findUserRecipes("60c6c3a730315b0b9f5f98bc")