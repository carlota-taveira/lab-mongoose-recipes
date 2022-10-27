const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');

const data = require('./data');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const pasta = { title: 'Pasta Bolognese', level: 'Easy Peasy', ingredients: ['pasta', 'meat', 'tomato sauce'], cuisine: 'italian', dishType: 'main_course', duration: 20, creator: 'Carlota' };


const manageRecipes = async () => {
  try {
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();
    await Recipe.create(pasta);

    let multipleRecipes = await Recipe.insertMany(data);
    multipleRecipes.forEach(recipes => console.log(recipes.title))

    let rec = await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    console.log(rec);
    console.log("Done")

    await Recipe.deleteOne({ title: 'Carrot Cake' })
    console.log("Done");

    mongoose.disconnect();

  } catch (error) {

    console.log(error);
  }
};
manageRecipes();









//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
