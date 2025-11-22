export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
  cuposDisponibles: number;
  numeroCreditos: number;
  idDocente: number;
  idSemestre: number;
  duracion: string;
  fechaCreacion: string;
  horario: string;
  modalidad: string;
}
