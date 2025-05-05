import { CommonModule } from '@angular/common';
import { RoutineService, Routine } from './../../services/routine/routine.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  private routineService = inject(RoutineService);
  public routines: Routine[] = [];

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.loadRoutines();
  };

  public loadRoutines(): void {
    this.routineService.getRoutines().subscribe({
      next: (response) => {
        this.routines = response.routines;
      },
      error: (error) => {
        alert('Hubo un error al cargar las rutinas');
      }
    });
  };

  public goOut(ruta: string): void {
    let cerrarSesion = confirm('¿Está seguro de que quiere cerrar sesión?')
    if(cerrarSesion){
      this.router.navigate([ruta]);
    };
  };

  public goTo(ruta: string): void {
    this.router.navigate([ruta]);
  };

  public updateRoutine(routineId: string): void {
    const newName = prompt('Nuevo nombre de rutina:');
    const newDescription = prompt('Nueva descripción:');
    const newDuration = prompt('Nueva duración:');
    const newCategory = prompt('Nueva categoría:');
  
    const currentRoutine = this.routines.find(routine => routine._id === routineId);
  
    if(currentRoutine){
      const updatedRoutine = {
        name: newName || currentRoutine.name,          
        description: newDescription || currentRoutine.description,  
        duration: newDuration || currentRoutine.duration,  
        category: newCategory || currentRoutine.category 
      };
  
      this.routineService.updateRoutine(routineId, updatedRoutine).subscribe({
        next: () => {
          alert('Rutina actualizada');
          this.loadRoutines();
        },
        error: (error) => {
          console.error(error);
          alert('Error al actualizar la rutina');
        }
      });
    }else{
      alert('Rutina no encontrada');
    };
  };

  public deleteRoutine(routineId: string): void {
    const confirmDelete = confirm('¿Seguro que quieres eliminar esta rutina?');
    if(confirmDelete){
      this.routineService.deleteRoutine(routineId).subscribe({
        next: () => {
          alert('Rutina eliminada');
          this.loadRoutines();
        },
        error: (error) => {
          console.error(error);
          alert('Error al eliminar la rutina');
        }
      });
    };
  };

}
