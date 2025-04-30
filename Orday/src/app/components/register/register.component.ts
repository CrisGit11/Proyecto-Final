import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router: Router) {}

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password1: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  })

  public goTo(ruta: string): void {
    this.router.navigate([ruta]);
  }

  public register(): void {
    this.form.markAllAsTouched();
    if(this.form.valid){
      if(this.form.controls['password1'].value !== this.form.controls['password2'].value){
        alert('Las contraseñas no coinciden');
      }else{
        sessionStorage.setItem('name', String(this.form.controls['name'].value));
        this.router.navigate(['/dashboard']);
      }    
    }
  }
  
}
