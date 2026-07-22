# 🎓 Sistema de Gestión Académica - Academia Preuniversitaria Einstein

## 📌 Descripción del Sistema

El **Sistema de Gestión Académica Einstein** es una aplicación web desarrollada para administrar y optimizar los procesos académicos y administrativos de una academia preuniversitaria.

El sistema permite gestionar de manera centralizada la información de estudiantes, docentes, cursos, matrículas, pagos, asistencia y evaluaciones, facilitando el control académico y financiero de la institución.

La aplicación cuenta con autenticación de usuarios, control de acceso mediante roles y una arquitectura cliente-servidor basada en capas, permitiendo una mejor organización del código, mantenimiento y escalabilidad del sistema.

Los principales módulos implementados son:

- Gestión de usuarios y roles.
- Registro y administración de estudiantes.
- Gestión de docentes.
- Administración de cursos y ciclos académicos.
- Registro de matrículas.
- Control de asistencia.
- Gestión de evaluaciones y calificaciones.
- Registro de pagos de estudiantes y docentes.
- Generación de consultas y reportes académicos.

---

# 🛠️ Tecnologías Utilizadas

## Frontend

Tecnologías utilizadas para el desarrollo de la interfaz de usuario:

- **React.js**: Desarrollo de componentes e interfaces dinámicas.
- **JavaScript (ES6)**: Implementación de la lógica del cliente.
- **HTML5**: Estructura de las páginas web.
- **CSS3**: Diseño y estilos personalizados.
- **Bootstrap**: Diseño responsivo y componentes visuales.
- **React Router**: Gestión de navegación entre módulos.

## Backend

Tecnologías utilizadas para la lógica del negocio y servicios API:

- **Python**: Lenguaje principal del backend.
- **Flask**: Framework para creación de API REST.
- **JWT (JSON Web Token)**: Autenticación y seguridad de sesiones.
- **Postman**: Pruebas y validación de endpoints.

## Base de Datos

Tecnologías utilizadas para almacenamiento y gestión de información:

- **MySQL 8**: Sistema gestor de base de datos.
- **MySQL Workbench**: Administración y modelado de la base de datos.
- **Procedimientos almacenados**: Implementación de operaciones complejas.
- **Triggers**: Automatización de procesos en la base de datos.
- **Views**: Optimización de consultas frecuentes.

---

# ✅ Requisitos Previos

Antes de ejecutar el sistema se requiere instalar las siguientes herramientas:

## Software necesario

### Backend

- Python 3.10 o superior.
- pip (gestor de paquetes de Python).
- MySQL Server 8.
- MySQL Workbench (opcional).

### Frontend

- Node.js 18 o superior.
- npm (incluido con Node.js).
- Navegador web actualizado.

---

# ▶️ Ejecución del Sistema

## 1. Configuración de la Base de Datos

1. Crear la base de datos en MySQL:

```sql
CREATE DATABASE academia_einstein;
