# Listado Productos CRUD

Prueba técnica desarrollada con .NET 8 Web API y Next.js 15 para la gestión de productos, incluyendo autenticación JWT, CRUD completo, generación de reportes PDF y despliegue de base de datos mediante Docker.

## Tecnologías Utilizadas

### Backend

* .NET 8 Web API
* Entity Framework Core
* SQL Server
* JWT Authentication
* QuestPDF
* BCrypt.Net

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* TanStack React Table
* Axios
* React Hot Toast

### Infraestructura

* Docker
* Docker Compose

---

## Funcionalidades

### Autenticación

* Registro de usuarios
* Inicio de sesión
* Generación de token JWT
* Protección de endpoints mediante autorización

### Gestión de Productos

* Crear productos
* Editar productos
* Eliminar productos
* Consultar productos
* Búsqueda por nombre
* Paginación
* Ordenamiento de columnas

### Reportes

* Generación de reporte PDF de productos mediante QuestPDF

---

## Estructura del Proyecto

```text
app_product
│
├── api/                 # Backend .NET 8
│
├── frontend/            # Frontend Next.js 15
│
├── docker-compose.yml   # Base de datos SQL Server
│
└── README.md
```

---

## Requisitos

Antes de ejecutar el proyecto asegúrese de tener instalado:

* .NET SDK 8
* Node.js 20 o superior
* Docker Desktop
* Git

---

## Ejecución del Proyecto

### 1. Clonar repositorio

```bash
git clone https://github.com/LastBraulio/listado_productos_crud.git
```

```bash
cd listado_productos_crud
```

---

### 2. Levantar Base de Datos

```bash
docker compose up -d
```

Verificar contenedores:

```bash
docker ps
```

---

### 3. Ejecutar Backend

Entrar al proyecto API:

```bash
cd api
```

Restaurar paquetes:

```bash
dotnet restore
```

Aplicar migraciones:

```bash
dotnet ef database update
```

Ejecutar API:

```bash
dotnet run
```

Swagger disponible en:

```text
http://localhost:5237/swagger
```

---

### 4. Ejecutar Frontend

Abrir una nueva terminal.

Entrar al proyecto frontend:

```bash
cd frontend/frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar aplicación:

```bash
npm run dev
```

Aplicación disponible en:

```text
http://localhost:3000
```

---

## Flujo de Uso

### Registro

1. Crear usuario desde la pantalla de registro.
2. Iniciar sesión.

### Productos

Una vez autenticado podrá:

* Crear productos
* Editar productos
* Eliminar productos
* Buscar productos
* Descargar reporte PDF

---

## Características Implementadas

* Arquitectura API REST
* Entity Framework Core
* Migraciones
* SQL Server en Docker
* JWT Authentication
* CRUD completo
* Paginación
* Filtros de búsqueda
* Generación de PDF
* Tailwind CSS
* TanStack Table
* React Hot Toast
* Diseño responsivo básico

---

## Autor

Braulio Castillo

Repositorio:

https://github.com/LastBraulio/listado_productos_crud
