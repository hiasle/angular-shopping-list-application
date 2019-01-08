import { Recipe } from './recipe.model';

import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Vegetarian Bowl',
            'Delicious vegetables as tasty as always.',
            '../assets/image/appetizer-background-cuisine-326281.jpg',
            [
                new Ingredient('Rocket', 1),
                new Ingredient('Tomato', 5),
                new Ingredient('Soy Sprouts', 20),
            ],
        ),
    ];

    constructor() {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;

        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
        // to prevent user reach recipes array from outside, only reachable copy of the array
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);

        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;

        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);

        this.recipesChanged.next(this.recipes.slice());
    }
}
