import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    nameUser: new FormControl('', [Validators.required]),
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
      if(this.form.controls['password1'].value !== this.form.controls['password2'].value){
        alert('Las contraseñas no coinciden');
      }else{
        this.authTokenService.setToken('djkfhadfalk1243kndklfhnkaf');
        const newUser = this.userService.createdUser(this.form.value.nameUser!, this.form.value.name!, this.form.value.email!, this.form.value.password1!);
        this.userService.setProfile(newUser);
        this.router.navigate(['/dashboard']);
      };  
    };
  };
  
}
