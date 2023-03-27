import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User';
import { first, Observable, catchError, tap, BehaviorSubject } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:5000/user";
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router) { }

  signup(user: Omit<User, "id">): Observable<User> {
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
      first(),
      tap(() => {
        this.router.navigate(["login"]);
      }),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    );
  }

  login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<{
    token: string
  }> {
    return this.http.post(`${this.url}/login`, { email, password }, this.httpOptions).pipe(
      first(),
      tap((tokenObject: { token: string }) => {
        localStorage.setItem("token", tokenObject.token);
        this.isUserLoggedIn$.next(true);
        this.router.navigate(["home"]);
      }),
      catchError(this.errorHandlerService.handleError<{ token: string }>("login"))
    );
  }
}
