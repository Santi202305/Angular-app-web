import { Routes } from '@angular/router';
import { LagrangeComponent } from './components/lagrange/lagrange.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteDetalleComponent } from './components/clientes/cliente-detalle.component';
import { CursosComponent } from './components/cursos/cursos.component';

export const routes: Routes = [
  { path: 'lagrange', component: LagrangeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/detalle/:id', component: ClienteDetalleComponent },
  { path: 'cursos', component: CursosComponent },
  { path: '**', redirectTo: '/login' }
];
