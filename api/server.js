// // See https://github.com/typicode/json-server#module
// const jsonServer = require('json-server')

// const server = jsonServer.create()

// // Uncomment to allow write operations
// // const fs = require('fs')
// // const path = require('path')
// // const filePath = path.join('db.json')
// // const data = fs.readFileSync(filePath, "utf-8");
// // const db = JSON.parse(data);
// // const router = jsonServer.router(db)

// // Comment out to allow write operations
// const router = jsonServer.router('db.json')

// const middlewares = jsonServer.defaults()

// server.use(middlewares)
// // Add this before server.use(router)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/blog/:resource/:id/show': '/:resource/:id'
// }))
// server.use(router)
// server.listen(3000, () => {
//     console.log('JSON Server is running')
// })

// // Export the Server API
// module.exports = server


const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

// Crear el servidor JSON
const server = jsonServer.create();

// Ruta del archivo de la base de datos
const filePath = path.join(__dirname, 'db.json');

// Leer y parsear el archivo de la base de datos
const data = fs.readFileSync(filePath, 'utf-8');
const db = JSON.parse(data);

// Crear el router con la base de datos leída
const router = jsonServer.router(db);

// Configurar middlewares por defecto (logging, CORS, etc.)
const middlewares = jsonServer.defaults();
server.use(middlewares);

// Reescribir rutas para simplificar la API
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

// Usar el router configurado
server.use(router);

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('JSON Server is running');
});

// Exportar el servidor para uso externo
module.exports = server;
