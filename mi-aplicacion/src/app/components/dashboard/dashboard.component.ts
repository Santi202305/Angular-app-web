import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Tarjeta {
  id: number;
  titulo: string;
  descripcion: string;
  textoBoton: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nombreUsuario: string = '';
  busqueda: string = '';
  mostrarBusqueda: boolean = false;

  tarjetas: Tarjeta[] = [
    {
      id: 1,
      titulo: 'Title',
      descripcion: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.',
      textoBoton: 'Button'
    },
    {
      id: 2,
      titulo: 'Title',
      descripcion: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.',
      textoBoton: 'Button'
    },
    {
      id: 3,
      titulo: 'Title',
      descripcion: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.',
      textoBoton: 'Button'
    },
    {
      id: 4,
      titulo: 'Title',
      descripcion: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.',
      textoBoton: 'Button'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('usuario') || 'Username';
  }

  toggleBusqueda() {
    this.mostrarBusqueda = !this.mostrarBusqueda;
    if (!this.mostrarBusqueda) {
      this.busqueda = '';
    }
  }

  cerrarBusqueda() {
    this.mostrarBusqueda = false;
    this.busqueda = '';
  }

  accionTarjeta(id: number) {
    console.log('Acción de tarjeta:', id);
    alert(`Acción ejecutada en tarjeta ${id}`);
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/registro']);
  }
}
