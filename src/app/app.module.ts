///<reference path="../../node_modules/@angular/common/http/src/client.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { HttpRequestService } from './shared/services/http-request.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ShoppingListComponent,
        ShoppingEditComponent,
        SignupComponent,
        SigninComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RecipesModule,
        AppRoutingModule,
        SharedModule,
    ],
    providers: [
        ShoppingListService,
        RecipeService,
        HttpRequestService,
        AuthService,
        AuthGuardService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
