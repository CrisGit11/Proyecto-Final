import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [] //Declaramos el array donde almacenaremos los usuarios

  public createdUser(
    nameUser: string, 
    name: string, 
    email: string, 
    password: string
  ): User {
    const user: User = {nameUser: nameUser, name: name, email: email, password:password};
    this.users.push(user);
    return user;
  }

  public setProfile(user: User): void {
    sessionStorage.setItem('nameUser', user.nameUser);
    sessionStorage.setItem('name', user.name);
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('password', user.password);
  }

}

export type User = {
  nameUser: string;
  name: string,
  email: string;
  password: string;
}