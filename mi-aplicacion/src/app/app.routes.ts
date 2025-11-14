import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesComponent } from "./components/clientes/clientes.component";
import { ClienteDetalleComponent } from './components/clientes/cliente-detalle.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/detalle/:id', component: ClienteDetalleComponent },
  { path: '**', redirectTo: '/login' }
];
