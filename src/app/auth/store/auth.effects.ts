import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
    @Effect()
    // @Effect({dispatch: false}) do this if you don't want to change state in the end
    authSignup = this.actions$.pipe(
        ofType(AuthActions.DO_SIGNUP),
        map((action: AuthActions.DoSignup) => {
            return action.payload;
        }),
        switchMap((authData: { username: string; password: string }) => {
            return from(
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(authData.username, authData.password),
            );
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            return [
                {
                    type: AuthActions.SIGNUP,
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token,
                },
            ];
        }),
    );
    // all the action inside of the app

    @Effect()
    authSignin = this.actions$.pipe(
        ofType(AuthActions.DO_SIGNIN),
        map((action: AuthActions.DoSignup) => {
            return action.payload;
        }),
        switchMap((authData: { username: string; password: string }) => {
            return from(
                firebase.auth().signInWithEmailAndPassword(authData.username, authData.password),
            );
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            return [
                {
                    type: AuthActions.SIGNIN,
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token,
                },
            ];
        }),
    );

    constructor(private actions$: Actions) {}
}
