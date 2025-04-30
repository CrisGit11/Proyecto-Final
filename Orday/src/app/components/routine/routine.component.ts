import { RoutineService } from './../../services/routine/routine.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  })

  public goTo(ruta: string): void {
    let cerrarSesion = confirm('¿Está seguro de que quiere cerrar sesión?')
    if(cerrarSesion){
      this.router.navigate([ruta]);
    }
  }

  public saveRoutine(): void{
    this.form.markAllAsTouched();
    if(this.form.valid){
      const newRoutine = this.routineService.generateRoutine(this.form.value.name!, this.form.value.description!, this.form.value.duration!, this.form.value.category!);
      if(newRoutine){
        this.router.navigate(['/dashboard']);
      }
      
    }
  
  }

  
}
