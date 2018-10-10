import { Component } from '@angular/core';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(
        private httpRequestService: HttpRequestService,
        private recipeService: RecipeService,
        public authService: AuthService,
        private router: Router,
    ) {}

    updateRecipeList() {
        this.httpRequestService.storeRecipes().subscribe(
            (response) => {
                console.log('Stored Recipes', response);
                this.router.navigate(['recipes']);
            },
            (error) => {
                if (error.status === 401) {
                    this.router.navigate(['signin']);
                }
            },
        );
    }

    fetchRecipes() {
        this.httpRequestService
            .getRecipes()
            .pipe(
                map((response) => {
                    const recipes = response;

                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe.ingredients = [];
                        }
                    }

                    return recipes;
                }),
            )
            .subscribe(
                (response: Recipe[]) => {
                    this.recipeService.setRecipes(response);
                    this.router.navigate(['recipes']);
                },
                (error) => {
                    if (error.status === 401) {
                        this.router.navigate(['signin']);
                    }
                },
            );
    }

    onLogout() {
        this.authService.logout();

        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['signin']);
        }
    }
}
