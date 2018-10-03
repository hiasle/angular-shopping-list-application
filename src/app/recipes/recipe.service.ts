import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from './shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Fooled Chicken Tears',
            'A poor chicken has been fooled correctly and gathered its tears as trophy.',
            '../assets/image/chicken-close-up-992043.jpg',
            [
                new Ingredient('Chicken Tenders', 1),
                new Ingredient('Pane', 1),
                new Ingredient('Lettuce', 1),
                new Ingredient('Lemon', 1),
            ],
        ),
        new Recipe(
            'VegiVigi',
            'The vegs as you know.',
            '../assets/image/appetizer-background-cuisine-326281.jpg',
            [
                new Ingredient('Rocket', 1),
                new Ingredient('Tomato', 5),
                new Ingredient('Soy Sprouts', 20),
            ],
        ),
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
        // to prevent user reach recipes array from outside, only reachable copy of the array
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);

        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;

        this.recipesChanged.next(this.recipes.slice());
    }
}
