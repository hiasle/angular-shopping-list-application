import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
    public shoppingListState: Observable<{ ingredients: Ingredient[] }>;

    constructor(
        private shoppingListService: ShoppingListService,
        private store: Store<{
            shoppingList: {
                ingredients: Ingredient[];
            };
        }>,
    ) {}

    ngOnInit() {
        this.shoppingListState = this.store.select('shoppingList');
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }
}
