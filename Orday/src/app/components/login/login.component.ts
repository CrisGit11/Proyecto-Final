import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' 
})

export class LoginComponent {

  private authTokenService = inject(AuthTokenService);

  constructor(private router: Router) {}

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  public goTo(ruta: string): void {
    this.router.navigate([ruta]);
  }

  public login(): void{
    this.form.markAllAsTouched();
    if(this.form.valid){
      sessionStorage.setItem('name', String(this.form.controls['name'].value));
      this.authTokenService.setToken('djkfhadfalk1243kndklfhnkaf');
      this.router.navigate(['/dashboard']);
    }
  }

}
