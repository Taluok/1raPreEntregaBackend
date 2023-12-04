import fs from 'fs/promises';

class CartsDao {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            const exists = await this.fileExists();
            if (exists) {
                const cartJSON = await fs.readFile(this.path, 'utf-8');
                return JSON.parse(cartJSON);
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(`Error al leer el archivo: ${error.message}`);
        }
    }

    async getCartById(idSearch) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find((cart) => cart.id === Number(idSearch));
            return cart || null;
        } catch (error) {
            throw new Error(`Error al buscar el carrito con id ${idSearch}`);
        }
    }

    async saveProductToCart(idCart, idProd) {
        try {
            const products = await this.loadProducts();
            const carts = await this.getCarts();
            const cartExists = await this.getCartById(idCart);

            if (!cartExists) {
                throw new Error(`Carrito con id ${idCart} no encontrado`);
            }

            const productToAdd = products.find((product) => product.id === idProd);

            if (!productToAdd) {
                throw new Error(`Producto con id ${idProd} no encontrado`);
            }

            const existingProductInCart = cartExists.products.find((p) => p.id === idProd);

            if (existingProductInCart) {
                existingProductInCart.quantity += 1;
            } else {
                const newCartItem = {
                    id: idProd,
                    quantity: 1,
                };
                cartExists.products.push(newCartItem);
            }

            await this.saveCart(cartExists);
            return cartExists;
        } catch (error) {
            throw new Error(`Error al guardar el producto en el carrito: ${error.message}`);
        }
    }

    async createCart() {
        try {
            const carts = await this.getCarts();
            const cart = {
                id: this.generateId(carts),
                products: [],
            };
            carts.push(cart);
            await fs.writeFile(this.path, JSON.stringify(carts));
            return cart;
        } catch (error) {
            throw new Error(`Error al crear el carrito: ${error.message}`);
        }
    }

    async fileExists() {
        try {
            await fs.access(this.path);
            return true;
        } catch (error) {
            return false;
        }
    }

    async loadProducts() {
        try {
            const productsData = await fs.readFile('./data/products.json', 'utf-8');
            return JSON.parse(productsData);
        } catch (error) {
            throw new Error(`Error al cargar los productos: ${error.message}`);
        }
    }

    generateId(carts) {
        if (!carts || carts.length === 0) {
            return 1;
        }
        const maxId = carts.reduce((max, cartItem) => (cartItem.id > max ? cartItem.id : max), 0);
        return maxId + 1;
    }

    async saveCart(cart) {
        let carts = await this.getCarts();
        const indexToUpdate = carts.findIndex((c) => c.id === cart.id);
        carts[indexToUpdate] = cart;
        await fs.writeFile(this.path, JSON.stringify(carts));
    }
}

export default CartsDao;

