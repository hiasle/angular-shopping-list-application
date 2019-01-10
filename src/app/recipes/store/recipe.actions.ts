import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPE = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export class SetRecipe implements Action {
    readonly type = SET_RECIPE;

    constructor(public payload: Recipe[]) {}
}

export class AddRecipes implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) {}
}

export class UpdateRecipes implements Action {
    readonly type = UPDATE_RECIPE;

    constructor(public payload: { index: number; updatedRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: number) {}
}

export type RecipeActions = SetRecipe | AddRecipes | UpdateRecipes | DeleteRecipe;
