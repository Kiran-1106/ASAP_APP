import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, combineLatestAll, flatMap, map, Observable, of} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private SERVER_URL = environment.SERVER_URL;
  auth = false;
  // @ts-ignore
  authState$ = new BehaviorSubject<boolean>(this.auth);
  // @ts-ignore
  loginMessage$ = new BehaviorSubject<string>(null);
  // @ts-ignore
  userData$ = new BehaviorSubject<ResponseModel | object>(null);
  user: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  registerUser(formData: any): Observable<{ message: string }> {
    const {username, fname, lname, email, password, age} = formData;
    return this.http.post<{ message: string }>(`${this.SERVER_URL}/auth/register`, {
      username,
      email,
      fname,
      lname,
      password,
      age
    });
  }

  contactUser(formData: any): Observable<{ message: string }> {
    const {name, email, message} = formData;
    return this.http.post<{ message: string }>(`${this.SERVER_URL}/auth/contact`, {
      name,
      email,
      message
    });
  }

  loginUsingEmail(email: string, password: string) {
    return this.http.post<ResponseModel>(`${this.SERVER_URL}/auth/login`, {email, password})
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((emaildata: ResponseModel) => {
        if(typeof(emaildata) === 'string') {
          this.loginMessage$.next(emaildata);
        } else {
          this.auth = emaildata.auth
          this.authState$.next(this.auth);
          this.userData$.next(emaildata.user);
          this.router.navigate(['']).then();
        }
      })
  }


  loginUsingUsername(username: string, password: string) {
    return this.http.post<ResponseModel>(`${this.SERVER_URL}/auth/login`, {username, password})
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((usernamedata: ResponseModel) => {
        if(typeof(usernamedata) === 'string') {
          this.loginMessage$.next(usernamedata);
        } else {
          this.auth = usernamedata.auth
          this.authState$.next(this.auth);
          this.userData$.next(usernamedata.user);
          this.router.navigate(['']).then();
        }
      })
  }

  logout() {
    this.auth = false;
    this.authState$.next(this.auth);
    this.router.navigateByUrl(`/login`);
  }

  isloggedIn(): boolean {
    const loginCookie = localStorage.getItem('auth');
    if(loginCookie === 'true') {
      return true;
    }
    return false;
  }

}

export interface ResponseModel {
  token: string;
  auth: boolean;
  user: {
    id: number;
    username: string;
    email: string;
    fname: string;
    lname: string;
    age: number;
    role: string;
  }
}
