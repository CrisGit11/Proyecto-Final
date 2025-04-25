import { Component, inject } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' 
})

export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  public goTo(ruta: string): void {
    this.router.navigate([ruta]);
  }

  login(): void{
    if(this.email !== '' && this.password !== ''){
      //sessionStorage.setItem('token', 'dlskhfdsfndsflkj5412');
      this.router.navigate(['/profile']);
    }else{
      //Mostrar mensaje de email o contraseña incorrectos
    }
  }

  
  


}
