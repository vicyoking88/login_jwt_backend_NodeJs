# Introduction 
Ejemplo basico Api Rest JWT en nodejs express, permite obtener un token a partir de la creacion o logueo de un usuario, 

## Implmentación

- ejecutar en la consola `yarn` o `npm i` de acuerdo al manejador de paquetes de su preferencia

## Boot

- ejecutar en la consola `npm run dev` levanta un servidor local que escucha en el puerto http://localhost:3000

### END POINTS =>

#### authentication

- POST: `/api/v1/signup` => Crea un usuario y devuelve un token. bodyReq `{"email":"example@hotmail.com", "password":"123456789"}`
- POST: `/api/v1//signin` => Se autentica usuario existente devuelve un token. bodyReq `{"email":"example@hotmail.com", "password":"123456789"}`

#### public routes

- GET: `/api/v1/tasks` => devuelve todos las tareas disponibles para todos los usuarios.

#### private routes 

- GET: `/api/v1/tasks` => devuelve todos las tareas disponibles para usuarios registrados o autenticados. headers : `{authorization:Bearer 'token'}`

- GET: `/api/v1/profile` => devuelve el id del usuario autenticado` headers : `{authorization:Bearer 'token'}`

## NOTES

Es necesario tener instalado y corriendo MongoDb para el almacenamiento de los usuarios.