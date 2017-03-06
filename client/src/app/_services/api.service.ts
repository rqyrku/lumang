import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {VARIABLES} from '../_variables/index';
import {AuthenticationService} from './auth.service';
import {CacheService} from './cache.service';
import {Pull} from '../_classes/index';

@Injectable()
export class ApiService {
    private headers:Headers;
    private requestsPull:Pull = new Pull();

    constructor(private http:Http, private router:Router, private cache:CacheService, private auth:AuthenticationService) {
        this.setHeaders();
    }

    private setHeaders() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        //this.headers.append('Authorization', 'Bearer ' + this.auth.token);
    }

    setZero(number:number):string {
        let result:string = null;
        if (number < 10) {
            result = '0' + number;
        } else {
            result = number.toString()
        }
        return result;
    }

    toApiDate(date:any) {
        date = new Date(date);
        //mock for test
        return date.getFullYear() + '-' + this.setZero(date.getMonth() + 1) + '-' + this.setZero(date.getDate());
    }

    // updateAuthToken() {
    //     return new Promise((resolve, reject)=> {
    //         this.auth.refreshToken().then(()=> {
    //             this.setHeaders();
    //             resolve();
    //         }, this.handleError(reject));
    //     });
    // }
    doGet(path:string, params:any = new URLSearchParams()){
        return new Promise((resolve: any, reject:any)=>{
            var subscription = this.http.get(path,{
                headers: this.headers,
                search: params
            }).subscribe((res:any)=>{
                subscription.unsubscribe();
                resolve(res.json());
            }, (err:any)=>{
                console.log('error', err);
                subscription.unsubscribe();
                reject(err);
            });
        })
    }
    doPost(path:string, data:any){
        return new Promise((resolve: any, reject:any)=>{
            var subscription = this.http.post(path, data,{
                headers: this.headers
            }).subscribe((res:any)=>{
                subscription.unsubscribe();
                resolve(res.json());
            }, (err:any)=>{
                console.log('error', err);
                subscription.unsubscribe();
                reject(err);
            });
        })
    }
    doPut(path:string, data:any){
        return new Promise((resolve: any, reject:any)=>{
            var subscription = this.http.put(path, data,{
                headers: this.headers
            }).subscribe((res:any)=>{
                subscription.unsubscribe();
                resolve(res.json());
            }, (err:any)=>{
                console.log('error', err);
                subscription.unsubscribe();
                reject(err);
            });
        })
    }
    doDelete(path:string, data:any = {}){
        return new Promise((resolve: any, reject:any)=>{
            var subscription = this.http.delete(path, new RequestOptions({
                headers: this.headers,
                body: JSON.stringify(data)
            })).subscribe((res:any)=>{
                subscription.unsubscribe();
                resolve(res.json());
            }, (err:any)=>{
                console.log('error', err);
                subscription.unsubscribe();
                reject(err);
            });
        })
    }
    // wrapRequest(func:any, fromCache:boolean = false, cacheName:string = null, storage:string = null):Promise<any> {
    //     let request = ()=>{
    //         return new Promise((resolve:any, reject:any)=> {
    //             if (fromCache) {
    //                 if (cacheName) {
    //                     let cached = this.cache.get(cacheName, storage);
    //                     if (cached) {
    //                         return setTimeout(()=> {
    //                             resolve(cached);
    //                         }, 10);
    //                     }
    //                 }
    //             }
    //             return this.updateAuthToken().then(()=> {
    //                 func((data:any)=> {
    //                     if (cacheName) {
    //                         this.cache.add(cacheName, data, storage);
    //                     }
    //                     resolve(data);
    //                 }, reject);
    //             }, reject);
    //         });
    //     };
    //     if(this.auth.user.isNeedUpdateToken()){
    //         return this.requestsPull.add(()=> {
    //             return request();
    //         })
    //     } else {
    //         return request();
    //     }
    // }

    handleResponse(resolve:any) {
        return (response:any)=> {
            resolve(response.data);
        }
    }

    handleError(reject:any) {
        return (response:any)=> {
            console.log(response);
            if (response.status === 401) {
                this.auth.logout();
                this.requestsPull.reset();
                this.router.navigate(['/login']);
            } else {
                reject(response.json());
            }
        }
    }
}
