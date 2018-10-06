import * as firebase from 'firebase';

export class AuthService {
    token: string;

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
            .then((response) =>
                firebase
                    .auth()
                    .currentUser.getIdToken()
                    .then((tokenResponse: string) => {
                        this.token = tokenResponse;
                    }),
            )
            .catch((error) => console.log(error.message));
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
            });

        return this.token;
    }

    isAuthenticated() {
        return this.token !== null;
    }
}
