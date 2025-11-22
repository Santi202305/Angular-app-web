import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Tarjeta {
  id: number;
  titulo: string;
  descripcion: string;
  textoBoton: string;
  icono: string;
  ruta?: string;
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
      titulo: 'Gestión de Cursos',
      descripcion: 'Administra y visualiza todos los cursos disponibles. Crea, edita y elimina cursos según sea necesario.',
      textoBoton: 'Ver Cursos',
      icono: '📚',
      ruta: '/cursos'
    },
    {
      id: 2,
      titulo: 'Gestión de Clientes',
      descripcion: 'Administra la información de tus clientes. Visualiza, agrega y actualiza datos de contacto.',
      textoBoton: 'Ver Clientes',
      icono: '👥',
      ruta: '/clientes'
    },
    {
      id: 3,
      titulo: 'Calculadora de Lagrange',
      descripcion: 'Herramienta de interpolación polinómica de Lagrange. Calcula valores interpolados basados en puntos de datos conocidos.',
      textoBoton: 'Abrir Calculadora',
      icono: '📊',
      ruta: '/lagrange'
    },
    {
      id: 4,
      titulo: 'Mensajes',
      descripcion: 'Revisa y gestiona todos tus mensajes. Mantente en contacto con tus clientes y colaboradores.',
      textoBoton: 'Ver Mensajes',
      icono: '💬',
      ruta: '/mensajes'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('usuario') || 'Santiago';
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

  accionTarjeta(tarjeta: Tarjeta) {
    if (tarjeta.ruta) {
      this.router.navigate([tarjeta.ruta]);
    } else {
      console.log('Acción de tarjeta:', tarjeta.id);
      alert(`Acción ejecutada en tarjeta ${tarjeta.titulo}`);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/registro']);
  }

  irAClientes() {
    this.router.navigate(['/clientes']);
  }

  irACursos() {
    this.router.navigate(['/cursos']);
  }

  irALagrange() {
    this.router.navigate(['/lagrange']);
  }
}
