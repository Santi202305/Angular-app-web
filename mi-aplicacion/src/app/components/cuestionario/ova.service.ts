import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Opcion {
  texto: string;
  esCorrecta?: boolean;
}

export interface Pregunta {
  id: string;
  texto: string;
  opciones: Opcion[];
}

@Injectable({
  providedIn: 'root',
})
export class OvaService {
  private apiUrl = 'http://localhost:8080/api/ova';

  constructor(private http: HttpClient) {}

  // método singular esperado por los componentes
  obtenerPregunta(): Observable<Pregunta> {
    return this.http.get<Pregunta>(`${this.apiUrl}/pregunta`).pipe(catchError(this.handleError));
  }

  // mantener compatibilidad si otros usan obtenerPreguntas()
  obtenerPreguntas(): Observable<Pregunta> {
    return this.obtenerPregunta();
  }

  verificarRespuesta(idPregunta: number, opcion: number): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/validar`, { idPregunta, opcion })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let msg = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(msg));
  }
}
