import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(name: string, email: string, password: string) {
        let body = JSON.stringify({ name: name, email: email, password: password });

        return this.http.post('/api/signup', body, this.jwt()).map((response: Response) => response.json());
    }

    // update(id: number) {
    //     return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    // }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if (currentUser && currentUser.token) {
            headers.append('Authorization', 'Bearer ' + currentUser.token);
        }
        return new RequestOptions({ headers: headers });
    }
}
