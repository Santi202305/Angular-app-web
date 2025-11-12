import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  limpiarCampo(campo: string) {
    if (campo === 'usuario') {
      this.nombreUsuario = '';
    } else if (campo === 'contrasena') {
      this.contrasena = '';
    }
  }

  iniciarSesion() {
    if (this.nombreUsuario && this.contrasena) {
      localStorage.setItem('usuario', this.nombreUsuario);
      if (this.recordarme) {
        localStorage.setItem('recordar', 'true');
      }
      this.router.navigate(['/dashboard']);
    } else {
      alert('Por favor complete todos los campos');
    }
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }

  olvidoContrasena() {
    alert('Funcionalidad de recuperación de contraseña');
  }
}
