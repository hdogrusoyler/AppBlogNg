import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const jwt = JSON.parse(this.userService.token);
        // const jwt = new BehaviorSubject<User>(JSON.parse(this.userService.token));
        // const tok = JSON.stringify('Bearer ' + jwt);
        if (jwt) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt}`
                }
            });
        }

        console.log(request.headers.get('Authorization'));
        return next.handle(request);
    }
}
