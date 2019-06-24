import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

    apiKey: string = '42221479bfc64c9fab79cde1d5ef4467';

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const req = request.clone({
            headers: request.headers.set("X-Api-Key", this.apiKey)
        });

        return next.handle(req);
    }
}