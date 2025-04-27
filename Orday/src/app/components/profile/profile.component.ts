import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  name: string = '';

  constructor(private router: Router) {}

  public goTo(ruta: string): void {
    let cerrarSesion = confirm('¿Está seguro de que quiere cerrar sesión?')
    if(cerrarSesion){
      this.router.navigate([ruta]);
    }
  }

  ngOnInit(): void {
    // Obtenemos el nombre del usuario desde sessionStorage
    this.name = sessionStorage.getItem('name') || 'Usuario Anónimo';
  }
  
}
