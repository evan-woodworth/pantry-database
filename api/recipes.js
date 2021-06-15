// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models
const { Recipe, Ingredient, User } = require('../models')

// controllers
// testing
const test = async (req, res) => {
    res.json({ message: 'Recipe endpoint OK!'});
}


// fetch one by Id
const fetchOneById = async (req, res) => {
    const { id } = req.params;
    console.log('--- Inside of Recipe fetchOneById ---');
    console.log(`Searching for ${id}`);
    try {
        Recipe.findById(id).populate("ingredients.ingredient")
        .exec((err, theRecipe)=>{
            if (err) console.log("error", err);
            console.log(theRecipe)
            res.json({ theRecipe });
        })
    } catch (error) {
        console.log("Error inside of /recipes/id/:id");
        console.log(error);
        return res.status(400).json({message:'Recipe not found, please try again.'})
    }
}


// fetch all by name
const fetchAllByName = async (req, res) => {
    const { name } = req.params;
    console.log('--- Inside of Recipe fetchOneByName ---');
    console.log(`Searching for ${name}`);
    try {
        let theRecipes = await Recipe.find({ name: { $regex: `${name}`, $options: 'i' } });
        res.json({ theRecipes });
    } catch (error) {
        console.log("Error inside of /recipes/name/:name");
        console.log(error);
        return res.status(400).json({message:'Recipes not found, please try again.'})
    }
}

// fetch all recipes
const fetchAll = async (req, res) => {
    console.log('--- Inside of Recipe fetchAll ---');
    console.log(`Searching for all recipes`);
    try {
        let theRecipes = await Recipe.find();
        res.json({ theRecipes });
    } catch (error) {
        console.log("Error inside of /recipes/");
        console.log(error);
        return res.status(400).json({message:'Recipes not found, please try again.'})
    }
}

const editRecipe = async (req, res) => {
    console.log('--- Inside of Recipe fetchAll ---');
    console.log(`Searching for all recipes`);
    const { name, mealId, category, area,
        instruction, youtubeUrl} = req.body;

    try {
        let recipe = await Recipe.findOne({ mealId });

        console.log('updating recipe')
        recipe.name = name;
        recipe.category = category;
        recipe.area = area;
        recipe.instruction = instruction;
        recipe.youtubeUrl = youtubeUrl;
        const savedRecipe = recipe.save();
        res.json(savedRecipe)
        } catch (error) {
            console.log("Error inside of /recipes/edit");
            console.log(error);
            return res.status(400).json({message:'Recipe not edited, please try again.'})
        }
}

// routes
// get
router.get('/test', test)
router.get('/id/:id', fetchOneById)
router.get('/name/:name', fetchAllByName)
router.get('/', fetchAll)

// post

// put
router.put('/edit', editRecipe);


module.exports = router; 