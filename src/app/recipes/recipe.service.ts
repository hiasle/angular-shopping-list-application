import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    public recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Fooled Chicken Tears',
            'A poor chicken has been fooled correctly and gathered its tears as trophy.',
            'http://s3.amazonaws.com/finecooking.s3.' +
                'tauntonclud.com/app/uploads/2017/04/18180350/051SIP112-grilled-' +
                'mustard-rosemary-chicken-recipe-alt-main.jpg',
        ),
        new Recipe(
            'VegiVigi',
            'The vegs as you know.',
            'https://static1.squarespace.com/static/' +
                '56d9cbd420c647c7373d4d82/t/58ed2e6386e6c02d633533ef/1495120065012/veggies.jpg',
        ),
    ];

    getRecipes(): Recipe[] {
        return this.recipes.slice();
        // to prevent user reach recipes array from outside, only reachable copy of the array
    }
}
