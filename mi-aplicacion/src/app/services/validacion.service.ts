import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  // Lista de palabras ofensivas (puedes agregar más)
  private palabrasOfensivas = [
    'idiota', 'tonto', 'estupido', 'maldito', 'odio', 'malo',
    'admin', 'root', 'test', 'null', 'undefined'
  ];

  // Validar nombre (sin palabras ofensivas, solo letras y espacios)
  validarNombre(nombre: string): { valido: boolean; mensaje: string } {
    if (!nombre || nombre.trim().length < 2) {
      return { valido: false, mensaje: 'El nombre debe tener al menos 2 caracteres' };
    }

    if (nombre.trim().length > 50) {
      return { valido: false, mensaje: 'El nombre no puede tener más de 50 caracteres' };
    }

    // Solo letras, espacios y acentos
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexNombre.test(nombre)) {
      return { valido: false, mensaje: 'El nombre solo puede contener letras' };
    }

    // Verificar palabras ofensivas
    const nombreLower = nombre.toLowerCase();
    for (const palabra of this.palabrasOfensivas) {
      if (nombreLower.includes(palabra)) {
        return { valido: false, mensaje: 'El nombre contiene palabras no permitidas' };
      }
    }

    return { valido: true, mensaje: '' };
  }

  // Validar email
  validarEmail(email: string): { valido: boolean; mensaje: string } {
    if (!email || email.trim().length === 0) {
      return { valido: false, mensaje: 'El email es obligatorio' };
    }

    // Regex estricto para email
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(email)) {
      return { valido: false, mensaje: 'El email no es válido' };
    }

    // Validar que no contenga caracteres peligrosos
    if (this.contieneCodigo(email)) {
      return { valido: false, mensaje: 'El email contiene caracteres no permitidos' };
    }

    return { valido: true, mensaje: '' };
  }

  // Validar contraseña segura
  validarContrasena(contrasena: string): { valido: boolean; mensaje: string } {
    if (!contrasena || contrasena.length === 0) {
      return { valido: false, mensaje: 'La contraseña es obligatoria' };
    }

    if (contrasena.length < 8) {
      return { valido: false, mensaje: 'La contraseña debe tener al menos 8 caracteres' };
    }

    if (contrasena.length > 50) {
      return { valido: false, mensaje: 'La contraseña no puede tener más de 50 caracteres' };
    }

    // Debe contener al menos una mayúscula
    if (!/[A-Z]/.test(contrasena)) {
      return { valido: false, mensaje: 'La contraseña debe contener al menos una mayúscula' };
    }

    // Debe contener al menos una minúscula
    if (!/[a-z]/.test(contrasena)) {
      return { valido: false, mensaje: 'La contraseña debe contener al menos una minúscula' };
    }

    // Debe contener al menos un número
    if (!/[0-9]/.test(contrasena)) {
      return { valido: false, mensaje: 'La contraseña debe contener al menos un número' };
    }

    // Validar que no contenga código HTML o scripts
    if (this.contieneCodigo(contrasena)) {
      return { valido: false, mensaje: 'La contraseña contiene caracteres no permitidos' };
    }

    return { valido: true, mensaje: '' };
  }

  // Detectar código malicioso (XSS, SQL injection)
  private contieneCodigo(texto: string): boolean {
    const patronesPeligrosos = [
      /<script/i,
      /<iframe/i,
      /javascript:/i,
      /onerror=/i,
      /onload=/i,
      /onclick=/i,
      /<img/i,
      /eval\(/i,
      /SELECT.*FROM/i,
      /INSERT.*INTO/i,
      /DELETE.*FROM/i,
      /DROP.*TABLE/i,
      /--/,
      /;/
    ];

    return patronesPeligrosos.some(patron => patron.test(texto));
  }

  // Sanitizar texto (eliminar caracteres peligrosos)
  sanitizar(texto: string): string {
    return texto
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
}
