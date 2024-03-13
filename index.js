// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const result = response.data.drinks;
        const recipe = result[0];
        var imgUrl = recipe.strDrinkThumb + "/preview";
        console.log(imgUrl);
        var ingredientList = []; 
        var measureList = []; 
         for (let i=1; i<= 15; i++) { 
           var ing = `strIngredient${i}`;
           var mea = `strMeasure${i}`;
           var ingredient = recipe[ing]; 
           var measure = recipe[mea]; 
            if (ingredient && measure) { 
            ingredientList.push(ingredient); 
            measureList.push(measure); 
             }
            } 
        res.render("index.ejs", { recipe: recipe, ingredients: ingredientList, measures: measureList, img: imgUrl});
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  