import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreguntaComponent {
  pregunta$: Observable<Pregunta | null> = of(null);
  cargando = true;
  error: string | null = null;
  resultado: {
    resultado: boolean;
    mensaje: string;
    seleccionado: number;
    correctaIndex: number;
  } | null = null;

  constructor(private ova: OvaService) {}

  ngOnInit(): void {
    this.cargarPregunta();
  }

  cargarPregunta(): void {
    this.cargando = true;
    this.error = null;
    this.resultado = null;
    this.pregunta$ = this.ova.obtenerPregunta();
    this.pregunta$.subscribe({
      next: () => (this.cargando = false),
      error: (err) => {
        this.cargando = false;
        this.error = 'No se pudo cargar la pregunta';
        console.error(err);
      },
    });
  }

  responder(index: number, pregunta: Pregunta): void {
    if (!pregunta || !Array.isArray(pregunta.opciones)) return;
    if (this.resultado !== null) return;

    const opcion = pregunta.opciones[index];
    if (!opcion) return;

    const esCorrecta = !!opcion.esCorrecta;
    const correctaIndex = pregunta.opciones.findIndex((o) => !!o.esCorrecta);

    this.resultado = {
      resultado: esCorrecta,
      mensaje: esCorrecta
        ? '¡Correcto!'
        : `Incorrecto. La respuesta correcta es: ${
            pregunta.opciones[correctaIndex]?.texto ?? 'N/A'
          }`,
      seleccionado: index,
      correctaIndex,
    };

    // opcional: auto-avance
    // setTimeout(() => this.cargarPregunta(), 1500);
  }

  reintentar(): void {
    this.cargarPregunta();
  }
}
