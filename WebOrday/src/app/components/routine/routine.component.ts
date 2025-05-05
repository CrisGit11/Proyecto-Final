import { RoutineService } from './../../services/routine/routine.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-routine',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})

export class RoutineComponent {

  private routineService = inject(RoutineService);

  constructor(private router: Router) {}

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])
  });

  public goTo(ruta: string): void {
    let cerrarSesion = confirm('¿Está seguro de que quiere cerrar sesión?');
    if(cerrarSesion){
      sessionStorage.clear();
      this.router.navigate([ruta]);
    };
  };

  public saveRoutine(): void {
    this.form.markAllAsTouched();
    if(this.form.valid){
      const { name, description, duration, category } = this.form.value;
      this.routineService.createRoutine(name!, description!, duration!, category!).subscribe({
        next: (response) => {
          alert('Rutina creada exitosamente');
          this.router.navigate(['/dashboard']); 
        },
        error: (error) => {
          alert('Hubo un error al crear la rutina');
        }
      });
    };
  };

  public cancelRoutine(): void {
    const cancelRoutine = confirm('¿Está seguro de que quiere cancelar?');
    if(cancelRoutine){
      this.form.reset();
    };
  };

};
