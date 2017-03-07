import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/index';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor( private router: Router, private userService: UserService ) {

    }

    register() {
        this.loading = true;
        this.userService.create(this.model.name, this.model.email, this.model.password)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
}
