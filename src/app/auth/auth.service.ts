import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) {}

    signupUser(email: string, password: string) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => console.log(error.message));
    }

    signinUser(email: string, password: string) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.getToken();
                // console.log('Authenticated: ', this.isAuthenticated());
            })
            .catch((error) => console.log(error));
    }

    logout() {
        firebase.auth().signOut();

        this.token = null;
    }

    getToken() {
        firebase
            .auth()
            .currentUser.getIdToken()
            .then((tokenResponse: string) => {
                this.token = tokenResponse;

                this.router.navigate(['/']);
            })
            .catch((error) => {
                if (error.status === 401) {
                    this.router.navigate(['signin']);
                } else {
                    console.log(error.message);
                }
            });

        return this.token;
    }

    isAuthenticated() {
        return this.token !== null;
    }
}
