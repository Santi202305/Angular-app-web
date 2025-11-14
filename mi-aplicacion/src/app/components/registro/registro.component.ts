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

  errores: {
    nombre: string;
    email: string;
    contrasena: string;
    confirmar: string;
  } = {
    nombre: '',
    email: '',
    contrasena: '',
    confirmar: ''
  };

  mostrarRequisitos: boolean = false;

  constructor(
    private router: Router,
    private validacionService: ValidacionService
  ) {}

  limpiarCampo(campo: string) {
    switch(campo) {
      case 'usuario':
        this.nombreUsuario = '';
        this.errores.nombre = '';
        break;
      case 'correo':
        this.correoElectronico = '';
        this.errores.email = '';
        break;
      case 'contrasena':
        this.contrasena = '';
        this.errores.contrasena = '';
        break;
      case 'confirmar':
        this.confirmeContrasena = '';
        this.errores.confirmar = '';
        break;
    }
  }

  validarNombreEnTiempoReal() {
    if (this.nombreUsuario.length > 0) {
      const resultado = this.validacionService.validarNombre(this.nombreUsuario);
      this.errores.nombre = resultado.valido ? '' : resultado.mensaje;
    } else {
      this.errores.nombre = '';
    }
  }

  validarEmailEnTiempoReal() {
    if (this.correoElectronico.length > 0) {
      const resultado = this.validacionService.validarEmail(this.correoElectronico);
      this.errores.email = resultado.valido ? '' : resultado.mensaje;
    } else {
      this.errores.email = '';
    }
  }

  validarContrasenaEnTiempoReal() {
    if (this.contrasena.length > 0) {
      const resultado = this.validacionService.validarContrasena(this.contrasena);
      this.errores.contrasena = resultado.valido ? '' : resultado.mensaje;
    } else {
      this.errores.contrasena = '';
    }
  }

  validarConfirmarEnTiempoReal() {
    if (this.confirmeContrasena.length > 0) {
      if (this.contrasena !== this.confirmeContrasena) {
        this.errores.confirmar = 'Las contraseñas no coinciden';
      } else {
        this.errores.confirmar = '';
      }
    } else {
      this.errores.confirmar = '';
    }
  }

  registrar() {
    // Limpiar errores previos
    this.errores = { nombre: '', email: '', contrasena: '', confirmar: '' };

    // Validar nombre
    const validacionNombre = this.validacionService.validarNombre(this.nombreUsuario);
    if (!validacionNombre.valido) {
      this.errores.nombre = validacionNombre.mensaje;
      return;
    }

    // Validar email
    const validacionEmail = this.validacionService.validarEmail(this.correoElectronico);
    if (!validacionEmail.valido) {
      this.errores.email = validacionEmail.mensaje;
      return;
    }

    // Validar contraseña
    const validacionContrasena = this.validacionService.validarContrasena(this.contrasena);
    if (!validacionContrasena.valido) {
      this.errores.contrasena = validacionContrasena.mensaje;
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.contrasena !== this.confirmeContrasena) {
      this.errores.confirmar = 'Las contraseñas no coinciden';
      return;
    }

    // Sanitizar datos
    const usuarioSanitizado = this.validacionService.sanitizar(this.nombreUsuario.trim());
    const emailSanitizado = this.validacionService.sanitizar(this.correoElectronico.trim());
    const contrasenaSanitizada = this.validacionService.sanitizar(this.contrasena);

    // Verificar si el usuario ya existe
    const usuariosGuardados = localStorage.getItem('usuarios');
    let usuarios: Usuario[] = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];

    const usuarioExiste = usuarios.find(u =>
      u.nombreUsuario === usuarioSanitizado || u.email === emailSanitizado
    );

    if (usuarioExiste) {
      this.errores.nombre = 'El usuario o email ya existe';
      return;
    }

    // Registrar nuevo usuario
    const nuevoUsuario: Usuario = {
      nombreUsuario: usuarioSanitizado,
      email: emailSanitizado,
      contrasena: contrasenaSanitizada // En producción, esto debe ser hasheado
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('usuario', usuarioSanitizado);

    alert('✅ Registro exitoso! Redirigiendo al dashboard...');
    this.router.navigate(['/dashboard']);
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}
