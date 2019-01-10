import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router, private store: Store<fromApp.AppState>) {}

    signupUser(email: string, password: string) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.store.dispatch(new AuthActions.Signup());

                firebase
                    .auth()
                    .currentUser.getIdToken()
                    .then((tokenResponse: string) => {
                        this.store.dispatch(new AuthActions.SetToken(tokenResponse));

                        this.router.navigate(['/']);
                    })
                    .catch((error) => {
                        if (error.status === 401) {
                            this.router.navigate(['signin']);
                        } else {
                            console.log(error.message);
                        }
                    });
            })
            .catch((error) => console.log(error.message));
    }

    signinUser(email: string, password: string) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.store.dispatch(new AuthActions.Signin());

                this.getToken();
                // console.log('Authenticated: ', this.isAuthenticated());
            })
            .catch((error) => console.log(error));
    }

    logout() {
        firebase.auth().signOut();

        this.store.dispatch(new AuthActions.Logout());

        this.router.navigate(['signin']);
    }

    // TODO:  getToken() & isAuthenticated() method to be removed after implementation of ngRX

    getToken() {
        firebase
            .auth()
            .currentUser.getIdToken()
            .then((tokenResponse: string) => {
                this.store.dispatch(new AuthActions.SetToken(tokenResponse));

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
