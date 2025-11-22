import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  cargando: boolean = false;

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.loadCursos();
  }

  private loadCursos(): void {
    console.log('🔄 Iniciando carga de cursos...');
    this.cargando = true;

    this.cursoService.getCursos().subscribe({
      next: (data) => {
        console.log('✅ Cursos cargados:', data);
        this.cursos = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('❌ Error completo:', error);
        this.cargando = false;
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: `No se pudo conectar: ${error.message}`,
          footer: '<a href="http://localhost:8082/api/v1/cursos" target="_blank">Verificar servicio</a>'
        });
      }
    });
  }

  addCurso(): void {
    Swal.fire({
      title: 'Añadir Nuevo Curso',
      html: `
      <div style="text-align: left; padding: 10px;">
        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre del Curso:</label>
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre del curso" style="width: 90%; margin: 0 auto 15px;">

        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Descripción:</label>
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción del curso" style="width: 90%; margin: 0 auto 15px; min-height: 80px;"></textarea>

        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Cupos Disponibles:</label>
        <input type="number" id="cuposDisponibles" class="swal2-input" placeholder="Cupos" min="1" value="30" style="width: 90%; margin: 0 auto 15px;">

        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Número de Créditos:</label>
        <input type="number" id="numeroCreditos" class="swal2-input" placeholder="Créditos" min="1" value="3" style="width: 90%; margin: 0 auto 15px;">

        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Duración (formato: 2H, 35m o 2H35m):</label>
        <input type="text" id="duracion" class="swal2-input" placeholder="Ej: 2H30m" value="2H" style="width: 90%; margin: 0 auto 15px;">

        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Horario (formato: Día(s) HH:mm):</label>
        <input type="text" id="horario" class="swal2-input" placeholder="Ej: Lunes,Miércoles 14:30" value="Lunes 08:00" style="width: 90%; margin: 0 auto 15px;">

        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Modalidad:</label>
        <select id="modalidad" class="swal2-input" style="width: 90%; margin: 0 auto;">
          <option value="presencial">Presencial</option>
          <option value="virtual">Virtual</option>
          <option value="mixto">Mixto</option>
        </select>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Crear Curso',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      width: '600px',
      preConfirm: () => {
        const nombre = (<HTMLInputElement>Swal.getPopup()!.querySelector('#nombre')).value;
        const descripcion = (<HTMLTextAreaElement>Swal.getPopup()!.querySelector('#descripcion')).value;
        const cuposDisponibles = (<HTMLInputElement>Swal.getPopup()!.querySelector('#cuposDisponibles')).value;
        const numeroCreditos = (<HTMLInputElement>Swal.getPopup()!.querySelector('#numeroCreditos')).value;
        const duracion = (<HTMLInputElement>Swal.getPopup()!.querySelector('#duracion')).value;
        const horario = (<HTMLInputElement>Swal.getPopup()!.querySelector('#horario')).value;
        const modalidad = (<HTMLSelectElement>Swal.getPopup()!.querySelector('#modalidad')).value;

        // Validaciones
        if (!nombre || nombre.trim().length < 2) {
          Swal.showValidationMessage('El nombre es requerido');
          return false;
        }

        if (!descripcion || descripcion.trim().length < 5) {
          Swal.showValidationMessage('La descripción es requerida (mín. 5 caracteres)');
          return false;
        }

        // Validar formato de duración
        const duracionRegex = /^(\d+H)?(\d+m)?$/;
        if (!duracionRegex.test(duracion)) {
          Swal.showValidationMessage('Formato de duración inválido. Use: 2H, 35m o 2H35m');
          return false;
        }

        // Validar formato de horario
        const horarioRegex = /^[A-Za-zÁÉÍÓÚáéíóú,]+\s+\d{2}:\d{2}$/;
        if (!horarioRegex.test(horario)) {
          Swal.showValidationMessage('Formato de horario inválido. Use: Lunes 08:00 o Lunes,Miércoles 14:30');
          return false;
        }

        return {
          nombre: nombre.trim(),
          descripcion: descripcion.trim(),
          activo: true,
          cuposDisponibles: parseInt(cuposDisponibles),
          numeroCreditos: parseInt(numeroCreditos),
          idDocente: 1,
          idSemestre: 1,
          duracion: duracion,
          fechaCreacion: new Date().toISOString().split('T')[0],
          horario: horario,
          modalidad: modalidad
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        console.log('📝 Creando curso:', result.value);

        const nuevoCurso: Curso = result.value as Curso;

        this.cursoService.createCurso(nuevoCurso).subscribe({
          next: (response) => {
            console.log('✅ Curso creado:', response);
            Swal.fire({
              icon: 'success',
              title: '¡Curso Creado!',
              text: 'El curso ha sido registrado exitosamente.',
              timer: 2000,
              showConfirmButton: false
            });
            this.loadCursos();
          },
          error: (error) => {
            console.error('❌ Error al crear:', error);
            Swal.fire('Error', `No se pudo crear el curso: ${error.message}`, 'error');
          }
        });
      }
    });
  }

  editCurso(curso: Curso): void {
    Swal.fire({
      title: 'Editar Curso',
      html: `
        <div style="text-align: left; padding: 10px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre del Curso:</label>
          <input type="text" id="nombre" class="swal2-input" value="${curso.nombre}" style="width: 90%; margin: 0 auto 15px;">

          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Descripción:</label>
          <textarea id="descripcion" class="swal2-textarea" style="width: 90%; margin: 0 auto 15px; min-height: 80px;">${curso.descripcion || ''}</textarea>

          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Cupos Disponibles:</label>
          <input type="number" id="cuposDisponibles" class="swal2-input" value="${curso.cuposDisponibles}" min="1" style="width: 90%; margin: 0 auto 15px;">

          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Número de Créditos:</label>
          <input type="number" id="numeroCreditos" class="swal2-input" value="${curso.numeroCreditos}" min="1" style="width: 90%; margin: 0 auto;">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ffc107',
      width: '550px',
      preConfirm: () => {
        const nombre = (<HTMLInputElement>Swal.getPopup()!.querySelector('#nombre')).value;
        const descripcion = (<HTMLTextAreaElement>Swal.getPopup()!.querySelector('#descripcion')).value;
        const cuposDisponibles = (<HTMLInputElement>Swal.getPopup()!.querySelector('#cuposDisponibles')).value;
        const numeroCreditos = (<HTMLInputElement>Swal.getPopup()!.querySelector('#numeroCreditos')).value;

        if (!nombre || nombre.trim().length < 2) {
          Swal.showValidationMessage('El nombre es requerido');
          return false;
        }

        return {
          nombre: nombre.trim(),
          descripcion: descripcion.trim(),
          cuposDisponibles: parseInt(cuposDisponibles),
          numeroCreditos: parseInt(numeroCreditos)
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const cursoActualizado: Curso = {
          ...curso,
          nombre: result.value.nombre,
          descripcion: result.value.descripcion,
          cuposDisponibles: result.value.cuposDisponibles,
          numeroCreditos: result.value.numeroCreditos
        };

        this.cursoService.updateCurso(cursoActualizado).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Actualizado!',
              text: 'El curso ha sido actualizado.',
              timer: 2000,
              showConfirmButton: false
            });
            this.loadCursos();
          },
          error: (error) => {
            Swal.fire('Error', `No se pudo actualizar: ${error.message}`, 'error');
          }
        });
      }
    });
  }

  confirmDelete(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el curso permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoService.deleteCurso(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'El curso ha sido eliminado.',
              timer: 2000,
              showConfirmButton: false
            });
            this.loadCursos();
          },
          error: (error) => {
            Swal.fire('Error', `No se pudo eliminar: ${error.message}`, 'error');
          }
        });
      }
    });
  }
}
