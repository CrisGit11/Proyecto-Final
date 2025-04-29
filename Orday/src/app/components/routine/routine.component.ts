import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-routine',
  imports: [FormsModule, RouterLink],
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent {

  name: string = '';
  description: string = '';
  duration: string = '';
  category: string = '';

  constructor(private router: Router) {}

  public goTo(ruta: string): void {
    let cerrarSesion = confirm('¿Está seguro de que quiere cerrar sesión?')
    if(cerrarSesion){
      this.router.navigate([ruta]);
    }
  }

  public saveRoutine(): void{
  
  }

  
}
