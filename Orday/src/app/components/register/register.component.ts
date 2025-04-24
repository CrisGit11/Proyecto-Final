import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registerForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { 
      validators: this.passwordsMatch
    });
  }

  // Método para verificar si las contraseñas coinciden
  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  // Método para mostrar/ocultar la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Método para mostrar/ocultar la contraseña de confirmación
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Método de envío del formulario
  onSubmit() {
    if (this.registerForm.valid) {
      // Aquí iría la lógica para registrar al usuario
      console.log('Formulario de registro válido', this.registerForm.value);
      // Si el registro es exitoso, redirige a la página de inicio de sesión
      this.router.navigate(['/login']);
    } else {
      console.log('Formulario inválido');
    }
  }

  // Redirigir a la página principal si el botón "Atrás" es presionado
  goHome() {
    this.router.navigate(['/']);
  }
  goLogin() {
    this.router.navigate(['/login']);
  }
}
