import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    public shoppingListState: Observable<{ shoppingList: Ingredient[] }>;
    private subscription: Subscription;

    constructor(
        private shoppingListService: ShoppingListService,
        private store: Store<{
            shoppingList: { shoppingList: Ingredient[] };
        }>,
    ) {}

    ngOnInit() {
        this.shoppingListState = this.store.select('shoppingList');

        // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
        //     (ingredient: Ingredient[]) => {
        //         this.ingredients = ingredient;
        //     },
        // );
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
