import { Component } from '@angular/core';
import { HttpRequestService } from '../shared/services/http-request.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    constructor(
        private httpRequestService: HttpRequestService,
        private recipeService: RecipeService,
    ) {}

    updateRecipeList() {
        this.httpRequestService.storeRecipes().subscribe((response: Recipe[]) => {
            console.log('Stored Recipes', response);
        });
    }

    fetchRecipes() {
        this.httpRequestService
            .getRecipes()
            .pipe(
                map((response: Recipe[]) => {
                    const recipes = response;

                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe.ingredients = [];
                        }
                    }

                    return recipes;
                }),
            )
            .subscribe((response: Recipe[]) => {
                this.recipeService.setRecipes(response);
            });
    }
}
