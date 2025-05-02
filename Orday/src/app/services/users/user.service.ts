import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [] //Declaramos el array donde almacenaremos los usuarios
  private currentUser: User | null = null;

  public createdUser(
    nameUser: string, 
    name: string, 
    email: string, 
    password: string
  ): User {
    const user: User = {nameUser: nameUser, name: name, email: email, password:password};
    this.users.push(user);
    this.setProfile(user);
    return user;
  };

  public setProfile(user: User): void {
    this.currentUser = user;
    sessionStorage.setItem('nameUser', user.nameUser);
    sessionStorage.setItem('name', user.name);
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('password', user.password);
  };

  public getCurrentUser(): User | null {
    return this.currentUser;
  };

  public updatePassword(newPassword: string): void {
    if(this.currentUser){
      this.currentUser.password = newPassword;
      this.setProfile(this.currentUser); // Actualiza sesión también
    };
  };

  public authenticate(nameUser: string, password: string): User | null {
    console.log(this.users);
    const user = this.users.find(user => user.nameUser === nameUser && user.password === password);
    if(user){
      this.setProfile(user);
    };
    return user || null;
  };

}

export type User = {
  nameUser: string;
  name: string,
  email: string;
  password: string;
};