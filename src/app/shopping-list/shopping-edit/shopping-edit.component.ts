import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f')
    shoppingListForm: NgForm;

    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(
        private shoppingListService: ShoppingListService,
        private store: Store<fromShoppingList.AppState>,
    ) {}

    ngOnInit() {
        this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngredient(index);

            this.shoppingListForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount,
            });
        });
    }

    onSubmitItem(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);

        if (this.editMode) {
            this.store.dispatch(
                new ShoppingListActions.UpdateIngredient({
                    index: this.editedItemIndex,
                    ingredient: newIngredient,
                }),
            );
        } else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
        }

        this.editMode = false;
        form.reset();
    }

    onClear() {
        this.shoppingListForm.reset();

        this.editMode = false;
    }

    onDelete() {
        this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));

        this.onClear();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
