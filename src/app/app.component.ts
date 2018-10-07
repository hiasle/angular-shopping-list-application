import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public loadedFeature = 'recipe';

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.authService.token = null;

        firebase.initializeApp({
            apiKey: 'AIzaSyAoylaSlAWFMNX6ZmNtXOreNzHO7UVjwH0',
            authDomain: 'recipe-book-666.firebaseapp.com',
        });

        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['signin']);
        }
    }

    public onNavigate(feature: string) {
        this.loadedFeature = feature;
    }
}
