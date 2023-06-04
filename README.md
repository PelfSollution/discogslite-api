# discogslite-api (Backend en Typescript, Express y Prisma)
**p3-backend-2023** by David AR

## Descripción

**discogslite-api**, es un ejercicio del [_Posgrado en Full-Stack Web Technologies_](https://www.talent.upc.edu/esp/estudis/formacio/curs/313400/posgrado-full-stack-web-technologies/ "Posgrado en Full-Stack Web Technologies"). Se basa en la creación de una versión mínima "lite" de lo que podría ser la API de  [_Discogs_](https://www.discogs.com/ "Discogs"), utilizando Typescript, Express y Prisma para gestionar entidades de artistas, lanzamientos y géneros. El diseño e implementación se inspiran en el modelo y práctica presentadas en clase, por lo que sirve como una guía sólida y práctica para aquellos que están iniciándose en el desarrollo backend. 
## Estructura del Proyecto

```
discogslite-api
├── insomnia/
│ └── insomnia.json
├── src/
│ ├── artists.ts
│ ├── artists.service.ts
│ ├── genres.ts
│ ├── genres.service.ts
│ ├── releases.ts
│ ├── releases.service.ts
│ ├── prisma-client.ts
│ ├── utils.ts
│ └── server.ts
├── prisma/
│ ├── migrations/
│ ├── albums.json  
│ ├── resetDb.ts
│ ├── schema.prisma
│ └── seed.ts
├── .env.sample
├── .gitignore
├── README.md
├── docker-compose.yml
├── package-lock.json
├── package.json
└── tsconfig.json
```
## Diagrama de Entidades y Relaciones (ER) de la BBDD

```
 DiscogsArtist
+----+-------+------------+------------+
| id | name  | createdAt  | deletedAt  |
+----+-------+------------+------------+
   |
   | 1     n
   ▼
 DiscogsRelease
+----+-------+-----+------------+------------+----------+--------+
| id | title | year| createdAt  | deletedAt  | artistId | genreId|
+----+-------+-----+------------+------------+----------+--------+
  ▲
  | 1     n
  |
 DiscogsGenre
+----+-------+------------+------------+
| id | name  | createdAt  | deletedAt  |
+----+-------+------------+------------+
```
## Pre-requisitos

1. Necesitarás tener Node.js y npm instalados en tu máquina. Puedes descargarlos desde [aquí](https://nodejs.org/es/).

2. También debes tener instalado Prisma. Para instalarlo, utiliza el siguiente comando en tu terminal:

`npm install @prisma/cli -g`

3. Necesitarás tener Docker instalado en tu máquina. Puedes descargarlo desde [aquí](https://www.docker.com/products/docker-desktop).

## Instalación Local

1. Clona el repositorio en tu máquina local utilizando `git clone`.

2. Entra en el directorio del proyecto:

`cd discogslite-api`

3. Instala las dependencias del proyecto:

`npm install`

4. Inicia el servicio de la base de datos con Docker Compose:

`npm run docker:up`

5. Generar migración schema.prisma

`npx prisma migrate dev`

6. Ejecutar seed.ts para rellenar la bbdd

`npm run seed`

7. Iniciar el Servidor:

`npm run dev`

## Producción (Deploy)

Para poner en producción tu aplicación, sigue estos pasos:

1. Transpilación a código Javascript

`npm run build`

2. Inicia el servidor en modo producción: 

`npm start`

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
- [x] Mejorar control de entradas - errores, que el id sea númerico, rutas erroneas, también para saber lo que esta pasando (si se borra un artista, que artista se ha borrado), si se borran los lanzamientos asociados también avisar
- [x] Deploy Digital Ocean 
    - https://discogs-api.freeddns.org/
    - https://discogs-api.freeddns.org/releases
    - https://discogs-api.freeddns.org/releases/search/t
    - https://discogs-api.freeddns.org/releases/deleted (soft delete)
    - https://discogs-api.freeddns.org/artists
    - https://discogs-api.freeddns.org/artists/1/releases
    - https://discogs-api.freeddns.org/artists/search/t
    - https://discogs-api.freeddns.org/artists/deleted (soft delete)
    - https://discogs-api.freeddns.org/genres
    - https://discogs-api.freeddns.org/genres/1/artists
    
    
- [x] Separar parte de la lógica de los controladores a los servicios
- [x] Soft Delete (al borrar un artista, no se borra de la bbdd, se pone un campo deletedAt con la fecha de borrado)
- [x] Llamadas a la API especiales como listar tal, buscar por nombre, etc

## Insomnia

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=discogs-api&uri=https%3A%2F%2Fdiscogs-api.freeddns.org%2Finsomnia%2Finsomnia.json)

