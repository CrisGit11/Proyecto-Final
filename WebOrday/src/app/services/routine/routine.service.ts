import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private API_URL = 'https://proyecto-final-1-j512.onrender.com/api/routine';

  constructor(private httpClient: HttpClient) {}

  public createRoutine(name: string, description: string, duration: string, category: string): Observable<Routine> {
    const token = sessionStorage.getItem('token');

    if(!token){
      alert('Token de autenticación no disponible');
    };
  
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    return this.httpClient.post<{ message: string; routine: Routine }>(
      `${this.API_URL}/generate`,
      { name, description, duration, category },
      { headers }
    ).pipe(
      tap(response => {
        sessionStorage.setItem('routine', JSON.stringify(response.routine));
      }),
      map(response => response.routine)
    );
  };

  public getRoutines(): Observable<any> {
    return this.httpClient.get(this.API_URL);
  };

  public updateRoutine(routineId: string, updatedRoutine: any): Observable<any> {
    const token = sessionStorage.getItem('token');

    if(!token){
      alert('Token de autenticación no disponible');
    };
  
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.httpClient.put(`${this.API_URL}/${routineId}`, updatedRoutine, { headers });

  };

  public deleteRoutine(routineId: string): Observable<any> {
    const token = sessionStorage.getItem('token');

    if(!token){
      alert('Token de autenticación no disponible');
    };
  
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.httpClient.delete(`${this.API_URL}/${routineId}`, { headers });

  };

};

export type Routine = {
  _id: string,
  name: string;
  description: string;
  duration: string;
  category: string;
};