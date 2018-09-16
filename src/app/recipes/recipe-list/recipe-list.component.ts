import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
    @Output() recipeWasSelected = new EventEmitter<Recipe>();

    public recipes: Recipe[] = [
        new Recipe(
            'Fooled Chicken Tears',
            'A poor chicken has been fooled correctly and gathered its tears as trophy.',
            'http://s3.amazonaws.com/finecooking.s3.' +
            'tauntonclud.com/app/uploads/2017/04/18180350/051SIP112-grilled-' +
            'mustard-rosemary-chicken-recipe-alt-main.jpg'),
        new Recipe(
            'VegiVigi',
            'The vegs as you know.',
            'https://static1.squarespace.com/static/' +
            '56d9cbd420c647c7373d4d82/t/58ed2e6386e6c02d633533ef/1495120065012/veggies.jpg'),
    ];

    constructor() {
    }

    ngOnInit() {
    }

    onRecipeSelected(recipe: Recipe) {
        this.recipeWasSelected.emit(recipe);
    }

}
