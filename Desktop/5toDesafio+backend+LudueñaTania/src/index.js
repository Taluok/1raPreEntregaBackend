import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import './daos/mongodb/connection.js';
import viewRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { ProductDaoFS } from '../src/daos/filesystem/products.dao.js';

const productDaoFs = new ProductDaoFS('./data/products.json');
const __dirname = path.resolve();

const app = express();
const PORT = 8088;

app.use(express.static('data'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', handlebars());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewRouter);

const httpServer = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('🟢 New Connection', socket.id);

    socket.on('deleteProduct', async (data) => {
        try {
            const { idProduct } = data;
            console.log('Console 1 app.js:', typeof idProduct);
            await productDaoFs.deleteProduct(idProduct);
            const products = await productDaoFs.getProducts();
            socketServer.emit('products', products);
        } catch (error) {
            socket.emit('deleteProductError', { errorMessage: error.message });
            console.error(error.message);
        }
    });
});

export default socketServer;

