import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private authTokenService = inject(AuthTokenService);
  private userService = inject(UserService);

  constructor(private router: Router) {}

  public form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password1: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  });

  public goTo(ruta: string): void {
    this.router.navigate([ruta]);
  };

  public register(): void {
    this.form.markAllAsTouched();
    if(this.form.valid){
      const { username, name, email, password1, password2 } = this.form.value;
      if(password1 !== password2){
        alert('Las contraseñas no coinciden');
        return;
      }
      this.userService.createUser(username!, name!, email!, password1!).subscribe({
        next: (user) => {
          this.userService.setProfile(user);
          const token = sessionStorage.getItem('token');
          if(token){
            this.authTokenService.setToken(token);
          };
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error(error);
          alert(error.error?.message || 'Error al registrar usuario');
        }
      });
    };
  };
  
}
