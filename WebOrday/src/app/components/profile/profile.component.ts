import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  private userService = inject(UserService);

  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    if(user){
      this.name = user.name;
      this.username = user.username;
      this.email = user.email;
      this.password = user.password;
    };
  };

  public goTo(ruta: string): void {
    let cerrarSesion = confirm('¿Está seguro de que quiere cerrar sesión?')
    if(cerrarSesion){
      sessionStorage.clear();
      this.router.navigate([ruta]);
    };
  };
   
}
