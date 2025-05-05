import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: User | null = null;
  private API_URL = 'https://proyecto-final-1-j512.onrender.com/api/users';

  constructor(private httpClient: HttpClient) {}

  public createUser(username: string, name: string, email: string, password: string): Observable<User> {
    return this.httpClient.post<{ success: boolean; data: User }>(`${this.API_URL}/register`, {
      username,
      name,
      email,
      password
    }).pipe(
      tap(response => {
        this.currentUser = response.data;
        sessionStorage.setItem('user', JSON.stringify(response.data));
      }),
      map(response => response.data)
    );
  };

  public authenticate(username: string, password: string): Observable<User> {
    return this.httpClient.post<{ user: User, token: string }>(`${this.API_URL}/login`, {
      username,
      password
    }).pipe(
      tap(response => {
        if(response.user){
          this.currentUser = response.user;
          sessionStorage.setItem('user', JSON.stringify(response.user));
          sessionStorage.setItem('token', response.token);
        }else{
        console.error('No se recibió el usuario en la respuesta:', response);
        }
      }),
      map(response => response.user)
    );
  };

  public setProfile(user: User): void {
    this.currentUser = user;
    sessionStorage.setItem('user', JSON.stringify(user));
  };

  public getCurrentUser(): User | null {
    return this.currentUser;
  };

  public updatePassword(newPassword: string): void {
    if(this.currentUser){
      this.currentUser.password = newPassword;
      this.setProfile(this.currentUser);
    };
  };
}

export type User = {
  _id?: string;
  username: string;
  name: string;
  email: string;
  password: string; 
};