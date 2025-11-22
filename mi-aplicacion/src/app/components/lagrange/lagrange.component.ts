import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Punto {
  x: number;
  y: number;
}

@Component({
  selector: 'app-lagrange',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lagrange.component.html',
  styleUrls: ['./lagrange.component.css']
})
export class LagrangeComponent {
  puntos: Punto[] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ];

  xInterpolar: number = 0;
  resultado: number | null = null;

  agregarPunto(): void {
    this.puntos.push({ x: 0, y: 0 });
  }

  eliminarPunto(index: number): void {
    if (this.puntos.length > 2) {
      this.puntos.splice(index, 1);
    }
  }

  calcular(): void {
    // Validar que tengamos al menos 2 puntos
    if (this.puntos.length < 2) {
      alert('Se necesitan al menos 2 puntos para interpolar');
      return;
    }

    // Validar que no haya valores vacíos
    const puntosValidos = this.puntos.every(p =>
      p.x !== null && p.x !== undefined &&
      p.y !== null && p.y !== undefined
    );

    if (!puntosValidos) {
      alert('Todos los campos deben estar llenos');
      return;
    }

    // Interpolación de Lagrange
    this.resultado = this.interpolacionLagrange(this.puntos, this.xInterpolar);
  }

  private interpolacionLagrange(puntos: Punto[], x: number): number {
    let resultado = 0;
    const n = puntos.length;

    for (let i = 0; i < n; i++) {
      let termino = puntos[i].y;

      for (let j = 0; j < n; j++) {
        if (i !== j) {
          termino *= (x - puntos[j].x) / (puntos[i].x - puntos[j].x);
        }
      }

      resultado += termino;
    }

    return resultado;
  }

  limpiar(): void {
    this.puntos = [
      { x: 0, y: 0 },
      { x: 0, y: 0 }
    ];
    this.xInterpolar = 0;
    this.resultado = null;
  }
}
