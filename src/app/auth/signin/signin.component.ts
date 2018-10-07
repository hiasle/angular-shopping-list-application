import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
    @ViewChild('f')
    signinForm: NgForm;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.initializeFormValues();
    }

    initializeFormValues() {
        const initialization = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.signinForm.form.setValue({
                    userData: {
                        email: 'test@test.com',
                        password: 'testuser',
                    },
                });
            }, 1000);
        });

        initialization
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onSignin() {
        const email = this.signinForm.value.userData.email;
        const password = this.signinForm.value.userData.password;

        this.authService.signinUser(email, password);
    }
}
