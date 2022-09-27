const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipeController = require("../controllers/recipe");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//recipe Routes - simplified for now
router.get("/newRecipe", ensureAuth, recipeController.getNewRecipe);

router.get("/showRecipe/:id", ensureAuth, recipeController.getRecipe);

router.get("/favorites", ensureAuth, recipeController.getFavorites);

router.post(
  "/createRecipe",
  upload.single("file"),
  recipeController.createRecipe
);

router.put("/addFavorite/:id", ensureAuth, recipeController.addFavorite);

router.put("/removeFavorite/:id", ensureAuth, recipeController.removeFavorite);

//functionality not implimented yet
// router.put("/likeRecipe/:id", recipeController.likeRecipe);

// router.delete("/deleteRecipe/:id", recipeController.deleteRecipe);

module.exports = router;
