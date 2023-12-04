import fs from 'fs/promises';

export class ProductDaoFS {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (await fs.access(this.path).then(() => true).catch(() => false)) {
                const productsJSON = await fs.readFile(this.path, 'utf-8');
                return JSON.parse(productsJSON);
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(`Error al leer el archivo: ${error.message}`);
        }
    }

    async getProductById(idSearch) {
        try {
            const products = await this.getProducts();
            const product = products.find((p) => p.id === idSearch);
            if (!product) {
                throw new Error(`No existe producto con id ${idSearch}.`);
            }
            return product;
        } catch (error) {
            throw new Error(`Error al buscar el producto con id ${idSearch}`);
        }
    }

    async addProduct({ title, description, code, price, stock, category, thumbnail }) {
        try {
            const products = await this.getProducts();
            const existingProduct = products.find((p) => p.code === code);

            if (existingProduct) {
                throw new Error(`Ya existe un producto con el código ${code}.`);
            }

            const newProduct = {
                status: true,
                id: this.generateId(products),
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnail,
            };

            const updatedProducts = [...products, newProduct];
            await this.saveProducts(updatedProducts);
            return newProduct;
        } catch (error) {
            throw new Error(`Error al agregar el producto: ${error.message}`);
        }
    }

    async updateProduct(idSearch, updateValues) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex((p) => p.id === idSearch);

            if (productIndex === -1) {
                throw new Error(`El producto con id ${idSearch} no existe.`);
            }

            const updatedProduct = {
                id: idSearch,
                ...products[productIndex],
                ...updateValues,
            };

            products[productIndex] = updatedProduct;
            await this.saveProducts(products);
            return updatedProduct;
        } catch (error) {
            throw new Error(`Error al actualizar el producto con id ${idSearch}`);
        }
    }

    async deleteProduct(idSearch) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex((p) => p.id === idSearch);

            if (productIndex === -1) {
                throw new Error(`El producto con id ${idSearch} no existe.`);
            }

            const deletedProduct = products.splice(productIndex, 1)[0];
            await this.saveProducts(products);
            return deletedProduct;
        } catch (error) {
            throw new Error(`Error al eliminar el producto con id ${idSearch}`);
        }
    }

    // Métodos privados

    generateId(products) {
        return products.length === 0 ? 1 : Math.max(...products.map((p) => p.id)) + 1;
    }

    async saveProducts(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }
}
