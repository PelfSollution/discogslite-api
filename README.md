# Backend en Typescript, Express y Prisma
## Descripción

Proyecto destinado a proporcionar un backend robusto y fácil de usar utilizando Typescript, Express y Prisma. La implementación se basa en el modelo presentado en clase y sirve como una guía sólida para los alumnos que se inician en el desarrollo backend.

## Pre-requisitos

1. Necesitarás tener Node.js y npm instalados en tu máquina. Puedes descargarlos desde [aquí](https://nodejs.org/es/).

2. También debes tener instalado Prisma. Para instalarlo, utiliza el siguiente comando en tu terminal:

`npm install @prisma/cli -g`

## Inicio rápido

1. Clona el repositorio en tu máquina local utilizando `git clone`.

2. Entra en el directorio del proyecto:

`cd p3-backend-2023`

3. Instala las dependencias del proyecto:

`npm install`

4. Inicia el proyecto:

`npm run dev`

## Comandos de scripts

- `npm run dev`: Inicia el servidor en modo desarrollo.
- `npm test`: Ejecuta los tests del proyecto (actualmente no se ha especificado ningún test).
- `npm run seed`: Siembra la base de datos con datos iniciales.
- `npm run cliente`: Inicia Prisma Studio, que es una interfaz visual para trabajar con tu base de datos.
- `npm run reset-db`: Restablece la base de datos.
- `npm run reload-db`: Recarga la base de datos ejecutando los comandos `reset-db` y `seed`.
- `npm run prisma:generate`: Genera el cliente de Prisma.
- `npm run prisma:migrate`: Ejecuta las migraciones de Prisma.
- `npm start`: Inicia el servidor en modo producción.
- `npm run prepare`: Prepara el proyecto para la producción.

## Funcionalidades

- [x] artists.ts - todas las operaciones CRUD básicas, para manejar la creación, lectura, actualización y eliminación de artistas
- [] genres.ts - todas las operaciones CRUD básicas, para manejar la creación, lectura, actualización y eliminación de géneros
- [] releases.ts - todas las operaciones CRUD básicas, para manejar la creación, lectura, actualización y eliminación de lanzamientos

