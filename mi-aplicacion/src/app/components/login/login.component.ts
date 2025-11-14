import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidacionService } from '../../services/validacion.service';

interface Usuario {
  nombreUsuario: string;
  email: string;
  contrasena: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombreUsuario: string = '';
  contrasena: string = '';
  recordarme: boolean = false;
  mensajeError: string = '';

  // Usuarios registrados (simulación - en producción iría a base de datos)
  private usuariosRegistrados: Usuario[] = [];

  constructor(
    private router: Router,
    private validacionService: ValidacionService
  ) {
    // Cargar usuarios de localStorage
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
      this.usuariosRegistrados = JSON.parse(usuariosGuardados);
    }
  }

  limpiarCampo(campo: string) {
    if (campo === 'usuario') {
      this.nombreUsuario = '';
    } else if (campo === 'contrasena') {
      this.contrasena = '';
    }
    this.mensajeError = '';
  }

  iniciarSesion() {
    this.mensajeError = '';

    // Validar que los campos no estén vacíos
    if (!this.nombreUsuario || !this.contrasena) {
      this.mensajeError = 'Por favor complete todos los campos';
      return;
    }

    // Sanitizar entradas
    const usuarioSanitizado = this.validacionService.sanitizar(this.nombreUsuario.trim());
    const contrasenaSanitizada = this.validacionService.sanitizar(this.contrasena);

    // Buscar usuario en la lista
    const usuarioEncontrado = this.usuariosRegistrados.find(
      u => u.nombreUsuario === usuarioSanitizado && u.contrasena === contrasenaSanitizada
    );

    if (!usuarioEncontrado) {
      this.mensajeError = 'Usuario o contraseña incorrectos';
      return;
    }

    // Login exitoso
    localStorage.setItem('usuario', usuarioSanitizado);
    if (this.recordarme) {
      localStorage.setItem('recordar', 'true');
    }

    this.router.navigate(['/dashboard']);
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }

  olvidoContrasena() {
    alert('Funcionalidad de recuperación de contraseña próximamente');
  }
}
