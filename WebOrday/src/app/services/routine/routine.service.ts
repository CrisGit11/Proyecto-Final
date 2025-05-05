import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private routines: Routine[] = [] //Declaramos el array donde almacenaremos nuestras rutinas

  public generateRoutine(
    name: string, 
    description: string, 
    duration: string, 
    category: string
  ): Routine {
    const routine: Routine = {name: name, description: description, duration: duration, category:category};
    this.routines.push(routine);
    return routine;
  }

  public getRoutines(): Routine[] {
    return this.routines;
  }

  public updateRoutine(index: number, updatedRoutine: Routine): void {
    if(index >= 0 && index < this.routines.length){
      this.routines[index] = updatedRoutine;
    }
  }

  public deleteRoutine(index: number): void {
    if(index >= 0 && index < this.routines.length){
      this.routines.splice(index, 1);
    }
  }

}

export type Routine = {
  name: string;
  description: string;
  duration: string;
  category: string;
}