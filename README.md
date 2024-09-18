# Payment App

Bienvenido a **Payment App**, una plataforma de pagos en línea que permite a los usuarios realizar transacciones de manera rápida y segura. Esta aplicación incluye un frontend en **React con Vite** y un backend en **NestJS**, con una base de datos MySQL pre-seedeada con algunos usuarios de prueba.

## 🌐 URL de la Aplicación

Puedes acceder a la aplicación desplegada en la siguiente URL:

[http://ec2-3-17-62-141.us-east-2.compute.amazonaws.com/](http://ec2-3-17-62-141.us-east-2.compute.amazonaws.com/)

## 🌍 IP de la Aplicación

La aplicación está alojada en la siguiente IP: 3.17.62.141 


## 🗃️ Seed de la Base de Datos

La base de datos se encuentra preconfigurada con algunos datos iniciales (seeds) para facilitar las pruebas. A continuación se muestra la información de los usuarios disponibles:

### Usuarios Seed

| Email               | Contraseña    |
|---------------------|---------------|
| johndoe@example.com | password123   | 
| janesmith@example.com   | password456   | 
| alicejohnson@example.com   | password789   | 

## 🚀 Cómo Funciona

### Frontend

El frontend de la aplicación está desarrollado en **React con Vite** y ofrece una experiencia de usuario rápida y dinámica. Los usuarios pueden iniciar sesión, navegar por los productos y realizar compras de manera sencilla.

#### Características del frontend:

- Interfaz intuitiva.
- Listado de productos disponibles.
- Realización de compras con integración al backend.

### Backend

El backend de la aplicación está desarrollado en **NestJS** y expone una API REST que permite manejar la autenticación, los productos y las transacciones de los usuarios. La base de datos utilizada es Postgres y prisma para el ORM.

#### Características del backend:

- Endpoints de autenticación (login y registro).
- Gestión de productos y transacciones.
- Validación de usuarios a través de JWT.
- Uso de la librería `crypto` para seguridad en transacciones.
- Se desplegó por medio de Docker.

### Proceso de compra:

1. El usuario selecciona un producto.
2. Se envía una solicitud al backend para procesar la compra.
3. El backend valida la información y genera un recibo de transacción.
4. Te redirige a ver el resumen de la compra



### Aspectos a mejorar

- UX/UI
- Seguridad de la información
- Arquitectura
- Validaciones


### Variables de entorno para front-end
- VITE_API_URL=
- VITE_WOMPI_PUBLIC_KEY=

### Variables de entorno para back-end
- DATABASE_URL=''
- WOMPI_PRIVATE_KEY=''
- WOMPI_PUBLIC_KEY=''
- UAT_SANDBOX_URL=''
- JWT_SECRET=''