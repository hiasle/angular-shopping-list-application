import { Component } from '@angular/core';
import { HttpRequestService } from '../shared/services/http-request.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    constructor(private httpRequestService: HttpRequestService) {}

    updateRecipeList() {
        this.httpRequestService.storeRecipes().subscribe((response: Recipe[]) => {
            console.log('Stored Recipes', response);
        });
    }
}
