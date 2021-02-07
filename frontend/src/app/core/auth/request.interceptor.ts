import { configuracao } from './../../configuracao';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaderResponse, HttpInterceptor, HttpProgressEvent,
    HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
        | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        if (req.url.startsWith(configuracao.rotaBackendPrivado) && this.tokenService.hasToken()) {
            const token = this.tokenService.getToken();
            req = req.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }
        return next.handle(req);
    }
}

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
            return throwError(err);
        }));
    }
}