import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ApiService } from '../_services/api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  public token: string;
  public user: Object;

  constructor(private http: Http, private api: ApiService ) {

  }

  login(email: string, password: string): Observable<any> {

    return this.http.post('/api/login', JSON.stringify({ email: email, password: password }))
        .map((response: any) => {
            // login successful if there's a jwt token in the response
            let token = response.json().data.token;
            let user = response.json().data.user;

            if (token) {
                // set token property
                this.token = token;
                this.user = user
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ user: user, token: token }));

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
