import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password1: string = '';
  password2: string = '';

  constructor(private router: Router) {}

  public goTo(ruta: string): void {
    this.router.navigate([ruta]);
  }

  register(): void {
    if(this.name === '' || this.email === '' || this.password1 === '' || this.password2 === ''){
      alert('Faltan datos por completar');
    }else if(this.password1 !== this.password2) {
      alert('Las contraseñas no coinciden');
    }else {
      //sessionStorage.setItem('token', 'dlskhfdsfndsflkj5412');
      this.router.navigate(['/profile']);
    }
  }
  
}
