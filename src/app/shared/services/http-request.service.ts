import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../../recipes/recipe.service';
import { Recipe } from '../../recipes/recipe.model';

@Injectable({
    providedIn: 'root',
})
export class HttpRequestService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put<Recipe[]>(
            `https://recipe-book-666.firebaseio.com/recipes.json`,
            this.recipeService.getRecipes(),
        );
    }

    getRecipes() {
        return this.http.get<Recipe[]>(`https://recipe-book-666.firebaseio.com/recipes.json`);
    }
}
