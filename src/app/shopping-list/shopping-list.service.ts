import { Ingredient } from '../recipes/shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // instead of using for loop
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }

        // use ES6 spread operator
        this.ingredients.push(...ingredients);

        // TODO: beware of duplication of the same items in the shopping list with a method
    }
}
