import { ProductModel } from './models/products.model.js';

export default class ProductDaoMongoDB {

    async getAll() {
        try {
            return await ProductModel.find({});
        } catch (error) {
            console.error('Error al obtener todos los productos', error);
            throw new Error('Error al obtener todos los productos');
        }
    }

    async getById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            console.error(`Error al obtener el producto con ID ${id}`, error);
            throw new Error(`Error al obtener el producto con ID ${id}`);
        }
    }

    async create(productObject) {
        try {
            return await ProductModel.create(productObject);
        } catch (error) {
            console.error('Error al crear el producto', error);
            throw new Error('Error al crear el producto');
        }
    }

    async update(id, productObject) {
        try {
            return await ProductModel.findByIdAndUpdate(
                { _id: id },
                productObject,
                { new: true }
            );
        } catch (error) {
            console.error(`Error al actualizar el producto con ID ${id}`, error);
            throw new Error(`Error al actualizar el producto con ID ${id}`);
        }
    }

    async delete(id) {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            console.error(`Error al eliminar el producto con ID ${id}`, error);
            throw new Error(`Error al eliminar el producto con ID ${id}`);
        }
    }
}
