import { Component, inject } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' 
})

export class LoginComponent {

  name: string = '';
  password: string = '';

  constructor(private router: Router) {}

  public goTo(ruta: string): void {
    this.router.navigate([ruta]);
  }

  login(): void{
    if(this.name !== '' && this.password !== ''){
      //sessionStorage.setItem('token', 'dlskhfdsfndsflkj5412');
      sessionStorage.setItem('name', this.name);
      this.router.navigate(['/dashboard']);
    }else{
      alert('El correo y la contraseña son obligatorios para iniciar sesión');
    }
  }

}
