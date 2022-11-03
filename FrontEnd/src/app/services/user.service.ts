import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private SERVER_URL = environment.SERVER_URL;
  // @ts-ignore
  auth = false;
  authState$ = new BehaviorSubject<boolean>(this.auth);

  constructor(private http: HttpClient) { }

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

}
