import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';
import { Recipe } from '../../recipes/recipe.model';

@Injectable({
    providedIn: 'root',
})
export class HttpRequestService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService,
    ) {}

    storeRecipes() {
        const token = this.authService.getToken();

        return this.http.put<Recipe[]>(
            `https://recipe-book-666.firebaseio.com/recipes.json`,
            this.recipeService.getRecipes(),
        );
    }

    getRecipes() {
        const token = this.authService.getToken();

        return this.http.get<Recipe[]>(`https://recipe-book-666.firebaseio.com/recipes.json`);
    }
}
