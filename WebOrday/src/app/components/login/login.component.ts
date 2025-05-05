import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { User, UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' 
})

export class LoginComponent {

  private authTokenService = inject(AuthTokenService);
  private userService = inject(UserService);

  constructor(private router: Router) {}

  public form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  public goTo(ruta: string): void {
    this.router.navigate([ruta]);
  }

  public login(): void {
    this.form.markAllAsTouched();
    if(this.form.valid){
      const { username, password } = this.form.value;
      this.userService.authenticate(username!, password!).subscribe({
        next: (user) => {
          this.authTokenService.setToken(sessionStorage.getItem('token')!);
          this.userService.setProfile(user);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Credenciales inválidas');
          console.error(err);
        }
      });
    };
  };
  

}
