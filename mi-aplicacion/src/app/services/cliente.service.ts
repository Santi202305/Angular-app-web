import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/v1/cliente-service/clientes';

  // Datos de prueba (mock data)
  private clientesMock: Cliente[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@email.com',
      createAt: '2025-01-15',
      foto: '',
      region: { id: 1, nombre: 'Latinoamérica' }
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'García',
      email: 'maria.garcia@email.com',
      createAt: '2025-01-16',
      foto: '',
      region: { id: 2, nombre: 'Europa' }
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'López',
      email: 'carlos.lopez@email.com',
      createAt: '2025-01-17',
      foto: '',
      region: { id: 1, nombre: 'Latinoamérica' }
    },
    {
      id: 4,
      nombre: 'Ana',
      apellido: 'Martínez',
      email: 'ana.martinez@email.com',
      createAt: '2025-01-18',
      foto: '',
      region: { id: 3, nombre: 'Asia' }
    },
    {
      id: 5,
      nombre: 'Pedro',
      apellido: 'Rodríguez',
      email: 'pedro.rodriguez@email.com',
      createAt: '2025-01-19',
      foto: '',
      region: { id: 1, nombre: 'Latinoamérica' }
    }
  ];

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    // MODO PRUEBA: Retorna datos mock
    return of(this.clientesMock);

    // MODO PRODUCCIÓN: Descomenta cuando Docker funcione
    // return this.http.get<Cliente[]>(this.apiUrl);
  }

  getCliente(id: string | null): Observable<Cliente> {
    // MODO PRUEBA: Busca en datos mock
    const cliente = this.clientesMock.find(c => c.id === Number(id));
    return of(cliente!);

    // MODO PRODUCCIÓN: Descomenta cuando Docker funcione
    // return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    // MODO PRUEBA
    const newId = Math.max(...this.clientesMock.map(c => c.id)) + 1;
    cliente.id = newId;
    this.clientesMock.push(cliente);
    return of(cliente);

    // MODO PRODUCCIÓN
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post<Cliente>(this.apiUrl, cliente, { headers });
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    // MODO PRUEBA
    const index = this.clientesMock.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      this.clientesMock[index] = cliente;
    }
    return of(cliente);

    // MODO PRODUCCIÓN
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente, { headers });
  }

  deleteCliente(id: number): Observable<void> {
    // MODO PRUEBA
    const index = this.clientesMock.findIndex(c => c.id === id);
    if (index !== -1) {
      this.clientesMock.splice(index, 1);
    }
    return of(undefined);

    // MODO PRODUCCIÓN
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
