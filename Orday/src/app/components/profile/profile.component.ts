import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  name: string = '';
  nameUser: string = '';
  email: string = '';
  password: string = '';

  newPassword: string = '';  
  isPasswordFormVisible = false; 

  constructor(private router: Router) {}

  public goTo(ruta: string): void {
    let cerrarSesion = confirm('¿Está seguro de que quiere cerrar sesión?')
    if(cerrarSesion){
      this.router.navigate([ruta]);
    }
  }

  ngOnInit(): void {
    // Obtenemos el nombre del usuario y su email desde sessionStorage
    this.name = sessionStorage.getItem('name')!;
    this.nameUser = sessionStorage.getItem('nameUser')!;
    this.email = sessionStorage.getItem('email')!;
    this.password = sessionStorage.getItem('password')!;
  }

  // Cambia la contraseña y la guarda en sessionStorage
  public changePassword(): void {
    if(this.newPassword){
      sessionStorage.setItem('password', this.newPassword); // Guarda la nueva contraseña
      alert('Contraseña cambiada correctamente');
      this.isPasswordFormVisible = false; // Cierra el formulario
    }else{
      alert('Por favor, ingrese una contraseña válida');
    }
  }

  // Cancela el cambio de contraseña
  public cancelChange(): void {
    this.isPasswordFormVisible = false; // Cierra el formulario sin guardar
  }

  // Mostrar el formulario de cambio de contraseña
  public showPasswordForm(): void {
    this.isPasswordFormVisible = true;
  }

  
}
