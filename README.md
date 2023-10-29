# 1raPreEntregaBackend
Este proyecto de backend está diseñado para un sistema de un e-commerce y proporciona una API para gestionar productos y carritos de compra. Está desarrollado en Node.js utilizando el framework Express y utiliza el sistema de archivos para persistir los datos.

# Gestión de Productos: 
Permite crear, actualizar, eliminar y consultar productos. Cada producto incluye información como título, descripción, precio, stock, categoría y rutas de imágenes.

# Gestión de Carritos: 
Facilita la creación de carritos de compra, la adición de productos a los carritos y la recuperación de carritos existentes.

# Funcionalidades implementadas:
Creación de productos con campos obligatorios y opcionales.
Actualización y eliminación de productos por ID.
Creación de carritos únicos para cada usuario.
Adición de productos a los carritos.
Consulta de productos y carritos por ID.
Validación de existencia de productos antes de agregarlos a los carritos.

# Uso:
Clone este repositorio en su máquina local.
Instale las dependencias con npm install.
Inicie el servidor con npm start.

# Rutas de ejemplo:
GET /api/products: Obtener todos los productos.
GET /api/products/:pid: Obtener un producto por ID.
POST /api/products: Crear un nuevo producto.
PUT /api/products/:pid: Actualizar un producto por ID.
DELETE /api/products/:pid: Eliminar un producto por ID.
POST /api/carts: Crear un nuevo carrito.
GET /api/carts/:cid: Obtener un carrito por ID.
POST /api/carts/:idCart/product/:idProd: Agregar un producto a un carrito.

# Requisitos:
Node.js
Express
npm
