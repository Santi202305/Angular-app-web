# 🚀 Sistema de Gestión de Clientes - Angular

Aplicación web full-stack con Angular 17 y microservicios Spring Boot para gestión de clientes y usuarios.

[![Angular](https://img.shields.io/badge/Angular-17-red)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Descripción

Sistema completo que incluye:
- ✅ Autenticación con validaciones de seguridad
- ✅ Dashboard interactivo
- ✅ CRUD de clientes
- ✅ Diseño responsive
- ✅ Integración con microservicios

---

## 🎯 Demo Rápida
```bash
# Clonar e instalar
git clone https://github.com/Santi202305/Angular-app-web.git
cd Angular-app-web
npm install

# Ejecutar
ng serve

# Abrir navegador
http://localhost:4200
```

**Credenciales de prueba:**
- Crear cuenta en `/registro`
- Contraseña: Mínimo 8 caracteres (Ej: `Abcd1234`)

---

## 🏗️ Arquitectura
```
Frontend (Angular)  →  API REST  →  Microservicios (Spring Boot)
                                    ├── Usuario Service (8080)
                                    └── Cliente Service (8081)
```

---

## 📦 Estructura del Proyecto
```
src/app/
├── components/
│   ├── clientes/           # Gestión de clientes
│   ├── cuestionario/       # Ova Arquitectura
│   ├── cursos/             # Gestion De Cursos
│   ├── dashboard/          # Panel principal
│   ├── lagrange/           # Ova Analisis Numerico
│   ├── login/              # Inicio de sesión
│   └── registro/           # Registro de usuarios
├── environments/
│   ├── environment.prod    # Gestión de clientes
│   └── environment         # Registro de usuarios
├── models/                 # Interfaces TypeScript
│   ├── clientes/           # Gestión de clientes
│   └── curso/              # Gestion De Cursos
├── services/               # Servicios HTTP
│   ├── cliente.service.ts
│   ├── curso.service.ts
│   └── validacion.service.ts
└── app.routes.ts           # Configuración de rutas
```

---

## ✨ Características Frontend

### 🔐 Seguridad
- Validación de nombres (sin palabras ofensivas)
- Validación estricta de emails
- Contraseñas seguras (8+ chars, mayúsculas, minúsculas, números)
- Sanitización contra XSS
- Prevención de inyección SQL

### 🎨 UI/UX
- Diseño responsive mobile-first
- Animaciones y transiciones suaves
- Validaciones en tiempo real
- Alertas con SweetAlert2

### 🔄 Funcionalidades
| Módulo | Rutas | Descripción |
|--------|-------|-------------|
| Login | `/login` | Inicio de sesión |
| Registro | `/registro` | Crear cuenta nueva |
| Dashboard | `/dashboard` | Panel con menú lateral |
| Clientes | `/clientes` | Lista de clientes |
| Detalle | `/clientes/detalle/:id` | Ver/Eliminar cliente |
| Lagrange | `/lagrange` | Ova Analisis Numerico |
| Cuestionario | `/cuestionario` | Ova Arquitectura |

---

## 🛠️ Tecnologías

**Frontend:**
- Angular 17 (Standalone Components)
- TypeScript 5.2
- RxJS 7.8
- SweetAlert2
- CSS3 Responsive

**Backend (Microservicios):**
- Spring Boot 3.x
- PostgreSQL
- Docker & Docker Compose

---

## 📦 Servicios Backend

### 👤 Usuario Service
* **Puerto:** 8080
* **Base URL:** `http://localhost:8080`

**Endpoints:**
```
GET    /api/v1/usuario-service/usuarios
POST   /api/v1/usuario-service/usuarios
PUT    /api/v1/usuario-service/usuarios
DELETE /api/v1/usuario-service/usuarios
```

### 👥 Cliente Service
* **Puerto:** 8081
* **Base URL:** `http://localhost:8081`

**Endpoints:**
```
GET    /api/v1/cliente-service/clientes
GET    /api/v1/cliente-service/clientes/{id}
POST   /api/v1/cliente-service/clientes
PUT    /api/v1/cliente-service/clientes/{id}
DELETE /api/v1/cliente-service/clientes/{id}
```

---

## 🚀 Instalación Completa

### 1. Frontend
```bash
# Clonar repositorio
git clone https://github.com/Santi202305/Angular-app-web.git
cd Angular-app-web

# Instalar dependencias
npm install

# Instalar SweetAlert2
npm install sweetalert2

# Ejecutar
ng serve
```

### 2. Backend (Docker)
```bash
# Crear compose.yaml
services:
  postgres:
    image: 'postgres:latest'
    environment:
      - 'POSTGRES_DB=curso_springboot'
      - 'POSTGRES_PASSWORD=a1b2c3d4'
      - 'POSTGRES_USER=devdb'
    ports:
      - '5432:5432'

  cliente-service:
    image: 'cliente-service:latest'
    ports:
      - '8081:8080'
    depends_on:
      - postgres

# Iniciar servicios
docker compose up -d

# Verificar
curl http://localhost:8081/api/v1/cliente-service/clientes
```

---

## 📝 Uso Rápido

1. **Registrarse:** Ve a `/registro` y crea una cuenta
2. **Login:** Inicia sesión con tus credenciales
3. **Dashboard:** Explora el menú lateral
4. **Clientes:** Click en "Clientes" para ver la lista
5. **Detalle:** Click en "Ver Detalle" para más información
6. **Eliminar:** Usa el botón rojo para eliminar (confirmación incluida)

---

## 🔒 Validaciones Implementadas
```typescript
// Nombre de usuario
- Mínimo 2 caracteres
- Solo letras y espacios
- Sin palabras ofensivas

// Email
- Formato válido (@ejemplo.com)
- Sin caracteres especiales peligrosos

// Contraseña
- Mínimo 8 caracteres
- Al menos 1 mayúscula
- Al menos 1 minúscula
- Al menos 1 número
- Sin código HTML/JavaScript
```

---

## 👨‍💻 Autor

**Santiago García Granda**
- GitHub: [@Santi202305](https://github.com/Santi202305)
- Repositorio: [Angular-app-web](https://github.com/Santi202305/Angular-app-web.git)

---

## 📅 Versión Actual: v1.0.0

**Fecha:** 2025-01-15

### ✅ Completado
- Sistema de autenticación completo
- Dashboard funcional con menú lateral
- CRUD de clientes con validaciones
- Validaciones de seguridad (XSS, SQL injection)
- Diseño responsive mobile-first
- Integración con SweetAlert2

### 🔄 En Desarrollo
- Integración JWT para tokens
- Guards de protección de rutas
- Deploy en servidor
- Tests unitarios y e2e
- PWA (Progressive Web App)

---

## 📄 Licencia

MIT License - Proyecto educativo

---

## 📞 Contacto

**Repositorio:** https://github.com/Santi202305/Angular-app-web.git

Para dudas o sugerencias, crear un issue en GitHub.

---

⭐ Si te gusta el proyecto, dale una estrella en GitHub!
```

---

## 🎯 **LICENSE actualizado**
```
MIT License

Copyright (c) 2025 Santiago García Granda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
