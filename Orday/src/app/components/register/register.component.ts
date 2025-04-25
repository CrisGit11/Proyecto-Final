import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  public goTo(ruta: string): void {
    this.router.navigate([ruta]);
  }

  register(): void{
    if(this.name !== '' && this.email !== '' && this.password !== ''){
      //sessionStorage.setItem('token', 'dlskhfdsfndsflkj5412');
      this.router.navigate(['/profile']);
    }else{
      //Mostrar mensaje de email o contraseña incorrectos
    }
  }
  
  
}
