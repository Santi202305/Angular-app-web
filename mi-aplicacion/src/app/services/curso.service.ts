import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Curso } from '../models/curso';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = `${environment.apiUrl}/cursos`;

  constructor(private http: HttpClient) {
    console.log('🔗 CursoService inicializado. API URL:', this.apiUrl);
  }

  getCursos(): Observable<Curso[]> {
    console.log('📡 Obteniendo cursos desde:', this.apiUrl);
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ Respuesta del backend:', response);
        return response.cursos || [];
      }),
      catchError(this.handleError)
    );
  }

  getCurso(id: string | null): Observable<Curso> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.curso),
      catchError(this.handleError)
    );
  }

  createCurso(curso: Curso): Observable<Curso> {
    console.log('📝 Enviando curso al backend:', curso);
    return this.http.post<any>(this.apiUrl, curso).pipe(
      map(response => {
        console.log('✅ Curso creado en backend:', response);
        return response.curso;
      }),
      catchError(this.handleError)
    );
  }

  updateCurso(curso: Curso): Observable<Curso> {
    return this.http.put<any>(`${this.apiUrl}/${curso.id}`, curso).pipe(
      map(response => response.curso),
      catchError(this.handleError)
    );
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('❌ Error completo:', error);
    console.error('❌ Status:', error.status);
    console.error('❌ Error response:', error.error);

    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del backend
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
      if (error.error && error.error.mensaje) {
        errorMessage += `\nDetalle: ${error.error.mensaje}`;
      }
      if (error.error && error.error.error) {
        errorMessage += `\nError: ${error.error.error}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
