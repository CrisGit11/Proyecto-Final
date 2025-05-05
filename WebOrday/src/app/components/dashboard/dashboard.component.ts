import { CommonModule } from '@angular/common';
import { RoutineService, Routine } from './../../services/routine/routine.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
    this.routines = this.routineService.getRoutines();
  };

  public goOut(ruta: string): void {
    let cerrarSesion = confirm('¿Está seguro de que quiere cerrar sesión?')
    if(cerrarSesion){
      sessionStorage.clear();
      this.router.navigate([ruta]);
    };
  };

  public goTo(ruta: string): void {
    this.router.navigate([ruta]);
  };

  public updateRoutine(index: number): void {
    const routine = this.routines[index];
  
    const newName = prompt('Nuevo nombre de rutina:', routine.name);
    const newDescription = prompt('Nueva descripción:', routine.description);
    const newDuration = prompt('Nueva duración:', routine.duration);
    const newCategory = prompt('Nueva categoría:', routine.category);
  
    if(newName && newDescription && newDuration && newCategory){
      const updatedRoutine: Routine = {
        ...routine,
        name: newName,
        description: newDescription,
        duration: newDuration,
        category: newCategory
      };
  
      this.routineService.updateRoutine(index, updatedRoutine);
      this.routines = this.routineService.getRoutines(); 
    };
  };

  public deleteRoutine(index: number): void{
    const confirmDelete = confirm(`¿Seguro que quieres eliminar la rutina "${this.routines[index].name}"?`);
    if(confirmDelete){
      this.routineService.deleteRoutine(index);
      this.routines = this.routineService.getRoutines(); 
      sessionStorage.clear();
    };
  };

}
