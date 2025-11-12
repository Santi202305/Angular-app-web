import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombreUsuario: string = '';
  correoElectronico: string = '';
  contrasena: string = '';
  confirmeContrasena: string = '';

  constructor(private router: Router) {}

  limpiarCampo(campo: string) {
    switch(campo) {
      case 'usuario':
        this.nombreUsuario = '';
        break;
      case 'correo':
        this.correoElectronico = '';
        break;
      case 'contrasena':
        this.contrasena = '';
        break;
      case 'confirmar':
        this.confirmeContrasena = '';
        break;
    }
  }

  iniciarSesion() {
    if (this.validarFormulario()) {
      localStorage.setItem('usuario', this.nombreUsuario);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Por favor complete todos los campos correctamente');
    }
  }

  validarFormulario(): boolean {
    if (!this.nombreUsuario || !this.correoElectronico ||
      !this.contrasena || !this.confirmeContrasena) {
      return false;
    }
    if (this.contrasena !== this.confirmeContrasena) {
      alert('Las contraseñas no coinciden');
      return false;
    }
    return true;
  }
}
