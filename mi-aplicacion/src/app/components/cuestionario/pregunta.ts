import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { OvaService } from './ova.service';

export interface Opcion {
  texto: string;
  esCorrecta?: boolean;
}

export interface Pregunta {
  id: string;
  texto: string;
  opciones: Opcion[];
}

@Component({
  selector: 'app-pregunta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css'],
})
export class PreguntaPage implements OnInit {
  pregunta$: Observable<Pregunta | null> = of(null);
  pregunta: Pregunta | null = null;
  cargando = false;
  error: string | null = null;
  resultado: any = null;

  constructor(private ova: OvaService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarPregunta();
  }

  cargarPregunta(): void {
    this.cargando = true;
    this.error = null;
    this.resultado = null;
    console.log('Solicitando pregunta al servicio...');
    this.pregunta$ = this.ova.obtenerPregunta();

    this.pregunta$.subscribe({
      next: (resp) => {
        console.log('Pregunta recibida del backend:', resp);
        this.pregunta = resp;
        this.cargando = false;
        try {
          this.cd.detectChanges();
        } catch (e) {
          /* noop */
        }
      },
      error: (err) => {
        console.error('Error al obtener pregunta:', err);
        this.error = 'No se pudo cargar la pregunta';
        this.cargando = false;
      },
    });
  }

  responder(index: number, preguntaParam?: Pregunta): void {
    const preguntaUsada = preguntaParam ?? this.pregunta;
    console.log('Respuesta elegida:', index, 'para pregunta:', preguntaUsada?.id);

    if (!preguntaUsada || !Array.isArray(preguntaUsada.opciones)) return;
    if (this.resultado !== null) return;

    const opcion = preguntaUsada.opciones[index];
    if (!opcion) return;

    const esCorrecta = !!opcion.esCorrecta;
    const correctaIndex = preguntaUsada.opciones.findIndex((o: any) => !!o.esCorrecta);

    this.resultado = {
      resultado: esCorrecta,
      mensaje: esCorrecta
        ? '¡Correcto!'
        : `Incorrecto. La respuesta correcta es: ${
            preguntaUsada.opciones[correctaIndex]?.texto ?? 'N/A'
          }`,
      seleccionado: index,
      correctaIndex,
    };

    console.log('Resultado:', this.resultado);

    try {
      this.cd.detectChanges();
    } catch (e) {
      /* ignore */
    }
  }

  reintentar(): void {
    this.cargarPregunta();
  }
}