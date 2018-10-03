import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode = false;
    recipeForm: FormGroup;

    constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];

            this.editMode = params['id'] != null;

            this.initForm();
        });
    }

    private initForm() {
        let recipeName = '';
        let recipeImgPath = '';
        let recipeDescription = '';

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);

            recipeName = recipe.name;
            recipeDescription = recipe.description;
            recipeImgPath = recipe.imagePath;
        }

        this.recipeForm = new FormGroup({
            name: new FormControl(recipeName),
            imagePath: new FormControl(recipeImgPath),
            description: new FormControl(recipeDescription),
        });
    }
}
