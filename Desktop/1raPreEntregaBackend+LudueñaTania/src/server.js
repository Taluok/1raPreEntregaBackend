import express from "express";
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';

const port = 8080;

import morgan from 'morgan';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));


