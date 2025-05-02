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
    nameUser: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  public goTo(ruta: string): void {
    this.router.navigate([ruta]);
  }

  public login(): void{
    this.form.markAllAsTouched();
    if(this.form.valid){
      const { nameUser, password } = this.form.value;
      const user = this.userService.authenticate(nameUser!, password!);
      if(user){
        this.authTokenService.setToken('djkfhadfalk1243kndklfhnkaf');
        this.userService.setProfile(user);
        this.router.navigate(['/dashboard']);
      }else{
        alert('Credenciales inválidas');
      }
    }
  }

}
