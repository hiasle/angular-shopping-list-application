import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpRequestService } from '../../shared/services/http-request.service';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor(
        private httpRequestService: HttpRequestService,
        private recipeService: RecipeService,
        public authService: AuthService,
        private router: Router,
        private store: Store<fromApp.AppState>,
    ) {}

    ngOnInit(): void {
        this.authState = this.store.select('auth');
    }

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
    }
}
