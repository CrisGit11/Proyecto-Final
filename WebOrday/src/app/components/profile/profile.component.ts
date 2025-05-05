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
  nameUser: string = '';
  email: string = '';
  password: string = '';

  newPassword: string = '';  
  isPasswordFormVisible = false; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    if(user){
      this.name = user.name;
      this.nameUser = user.nameUser;
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

  // Cambia la contraseña y la guarda en sessionStorage
  public changePassword(): void {
    if(this.newPassword){
      this.userService.updatePassword(this.newPassword);
      this.password = this.newPassword; // Para que el cambio se vea en el perfil
      alert('Contraseña cambiada correctamente');
      this.isPasswordFormVisible = false;
    }else{
      alert('Por favor, ingrese una contraseña válida');
    };
  };

  // Cancela el cambio de contraseña
  public cancelChange(): void {
    this.isPasswordFormVisible = false; // Cierra el formulario sin guardar
  };

  // Mostrar el formulario de cambio de contraseña
  public showPasswordForm(): void {
    this.isPasswordFormVisible = true;
  };
   
}
