import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    public recipes: Recipe[];

    constructor(
        private recipeService: RecipeService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
            this.recipes = recipes;
        });

        this.recipes = this.recipeService.getRecipes();
    }

    onNewRecipe() {
        console.log('Authenticated: ', this.authService.isAuthenticated());
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['new'], { relativeTo: this.route });
        } else {
            this.router.navigate(['/signin']);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
