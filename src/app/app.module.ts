///<reference path="../../node_modules/@angular/common/http/src/client.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { HttpRequestService } from './shared/services/http-request.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        ShoppingListModule,
        AppRoutingModule,
        SharedModule,
        CoreModule,
        AuthModule,
        StoreModule.forRoot({
            shoppingList: shoppingListReducer,
        }),
    ],
    providers: [
        ShoppingListService,
        RecipeService,
        HttpRequestService,
        AuthService,
        AuthGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
