import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpHandleService { 
    constructor(private http: Http) {}
    getHeader = function (authRequired) {
        let header = new Headers();
        header.append("Content-Type", "application/json"); 
        return {headers: header};
    }
    
    post = function (requesturl:string, requestdata:any, authRequired?:boolean) {
        return this.http.post(requesturl, JSON.stringify(requestdata), this.getHeader(authRequired));
    };
    put = function (requesturl:string, requestdata:any, authRequired?:boolean) {
        return this.http.put(requesturl, JSON.stringify(requestdata), this.getHeader(authRequired));
    };
    get = function (requesturl:string, authRequired?:boolean) {
        return this.http.get(requesturl, this.getHeader(authRequired));
    };
    delete = function (requesturl:string, requestdata:any, authRequired?:boolean) {
        return this.http.delete(requesturl, this.getHeader(authRequired));
    };
}