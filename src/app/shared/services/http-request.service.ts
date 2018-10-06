import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';

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

        return this.http.put(
            `https://recipe-book-666.firebaseio.com/recipes.json?auth=${token}`,
            this.recipeService.getRecipes(),
        );
    }

    getRecipes() {
        const token = this.authService.getToken();

        return this.http.get(`https://recipe-book-666.firebaseio.com/recipes.json?auth=${token}`);
    }
}
