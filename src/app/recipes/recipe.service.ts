import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    public recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Fooled Chicken Tears',
            'A poor chicken has been fooled correctly and gathered its tears as trophy.',
            '../assets/image/chicken-close-up-992043.jpg',
        ),
        new Recipe(
            'VegiVigi',
            'The vegs as you know.',
            '../assets/image/appetizer-background-cuisine-326281.jpg',
        ),
    ];

    getRecipes(): Recipe[] {
        return this.recipes.slice();
        // to prevent user reach recipes array from outside, only reachable copy of the array
    }
}
