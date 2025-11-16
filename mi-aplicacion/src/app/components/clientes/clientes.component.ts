import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],  // ← QUITÉ FontAwesomeModule
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  private loadClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        console.log('✅ Clientes cargados desde backend:', this.clientes);
      },
      error: (error) => {
        console.error('❌ Error al cargar clientes:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.',
          footer: '<a href="http://localhost:8080/api/v1/cliente-service/clientes" target="_blank">Probar backend</a>'
        });
      }
    });
  }

  editCliente(cliente: Cliente): void {
    Swal.fire({
      title: 'Editar Cliente',
      html: `
        <div style="text-align: left; padding: 10px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre:</label>
          <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" value="${cliente.nombre}" style="width: 90%; margin: 0 auto 15px;">

          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Apellido:</label>
          <input type="text" id="apellido" class="swal2-input" placeholder="Apellido" value="${cliente.apellido}" style="width: 90%; margin: 0 auto 15px;">

          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email:</label>
          <input type="email" id="email" class="swal2-input" placeholder="Email" value="${cliente.email}" style="width: 90%; margin: 0 auto;">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#6c757d',
      width: '500px',
      preConfirm: () => {
        const nombre = (<HTMLInputElement>Swal.getPopup()!.querySelector('#nombre')).value;
        const apellido = (<HTMLInputElement>Swal.getPopup()!.querySelector('#apellido')).value;
        const email = (<HTMLInputElement>Swal.getPopup()!.querySelector('#email')).value;

        if (!nombre || !apellido || !email) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }

        if (!this.validarEmail(email)) {
          Swal.showValidationMessage('Email no válido');
          return false;
        }

        return { nombre, apellido, email };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const clienteActualizado: Cliente = {
          ...cliente,
          nombre: result.value.nombre,
          apellido: result.value.apellido,
          email: result.value.email
        };

        this.clienteService.updateCliente(clienteActualizado).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Actualizado!',
              text: 'El cliente ha sido actualizado correctamente.',
              timer: 2000,
              showConfirmButton: false
            });
            this.loadClientes();
          },
          error: (error) => {
            console.error('Error al actualizar:', error);
            Swal.fire('Error', 'No se pudo actualizar el cliente', 'error');
          }
        });
      }
    });
  }

  addCliente(): void {
    Swal.fire({
      title: 'Añadir Nuevo Cliente',
      html: `
        <div style="text-align: left; padding: 10px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre:</label>
          <input type="text" id="nombre" class="swal2-input" placeholder="Ingrese nombre" style="width: 90%; margin: 0 auto 15px;">

          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Apellido:</label>
          <input type="text" id="apellido" class="swal2-input" placeholder="Ingrese apellido" style="width: 90%; margin: 0 auto 15px;">

          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email:</label>
          <input type="email" id="email" class="swal2-input" placeholder="ejemplo@email.com" style="width: 90%; margin: 0 auto;">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      width: '500px',
      preConfirm: () => {
        const nombre = (<HTMLInputElement>Swal.getPopup()!.querySelector('#nombre')).value;
        const apellido = (<HTMLInputElement>Swal.getPopup()!.querySelector('#apellido')).value;
        const email = (<HTMLInputElement>Swal.getPopup()!.querySelector('#email')).value;

        if (!nombre || !apellido || !email) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }

        if (!this.validarEmail(email)) {
          Swal.showValidationMessage('Email no válido');
          return false;
        }

        return { nombre, apellido, email };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const nuevoCliente: Cliente = {
          id: 0,
          nombre: result.value.nombre,
          apellido: result.value.apellido,
          email: result.value.email,
          createAt: new Date().toISOString().split('T')[0],
          foto: '',
          region: { id: 1, nombre: 'Suramérica' }
        };

        this.clienteService.createCliente(nuevoCliente).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Creado!',
              text: 'El cliente ha sido creado correctamente.',
              timer: 2000,
              showConfirmButton: false
            });
            this.loadClientes();
          },
          error: (error) => {
            console.error('Error al crear:', error);
            Swal.fire('Error', 'No se pudo crear el cliente', 'error');
          }
        });
      }
    });
  }

  confirmDelete(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'El cliente ha sido eliminado correctamente.',
              timer: 2000,
              showConfirmButton: false
            });
            this.loadClientes();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            Swal.fire('Error', 'No se pudo eliminar el cliente', 'error');
          }
        });
      }
    });
  }

  private validarEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }
}
