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

3. Inicia el servicio de la base de datos con Docker Compose:

`npm run docker:up`

4. Instala las dependencias del proyecto:

`npm install`

5. Generar migración schema.prisma

`npx prisma migrate dev`

6. Ejecutar seed.ts para rellenar la bbdd

`npm run seed`

7. Iniciar el Servidor:

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
- [x] genres.ts - todas las operaciones CRUD básicas, para manejar la creación, lectura, actualización y eliminación de géneros
- [x] releases.ts - todas las operaciones CRUD básicas, para manejar la creación, lectura, actualización y eliminación de lanzamientos

## Pendientes
- [x] Mejorar control de entradas - errores, que el id sea númerico, rutas erroneas, también para saber lo que esta pasando (si se borra un artista, que artista se ha borrado), si se borran los lanzamientos asociados también avisar
- [x] Deploy Digital Ocean 
      - https://discogs-api.freeddns.org/
      - https://discogs-api.freeddns.org/releases
      - https://discogs-api.freeddns.org/artists
      - https://discogs-api.freeddns.org/genres

## Insomnia

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://discogs-api.freeddns.org/insomnia/insomnia.json)

