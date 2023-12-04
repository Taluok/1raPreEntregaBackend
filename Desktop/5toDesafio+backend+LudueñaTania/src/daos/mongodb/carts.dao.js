import { CartModel } from './models/carts.model.js';

export default class CartDaoMongoDB {

    async getAll() {
        try {
            return await CartModel.find({});
        } catch (error) {
            console.error('Error al obtener todos los carritos', error);
            throw new Error('Error al obtener todos los carritos');
        }
    }

    async getById(id) {
        try {
            return await CartModel.findById(id);
        } catch (error) {
            console.error(`Error al obtener el carrito con ID ${id}`, error);
            throw new Error(`Error al obtener el carrito con ID ${id}`);
        }
    }

    async create(cartObject) {
        try {
            return await CartModel.create(cartObject);
        } catch (error) {
            console.error(`Error al crear el carrito`, error);
            throw new Error('Error al crear el carrito');
        }
    }

    async update(id, cartObject) {
        try {
            return await CartModel.findByIdAndUpdate(
                { _id: id },
                cartObject,
                { new: true }
            );
        } catch (error) {
            console.error(`Error al actualizar el carrito con ID ${id}`, error);
            throw new Error(`Error al actualizar el carrito con ID ${id}`);
        }
    }

    async delete(id) {
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.error(`Error al eliminar el carrito con ID ${id}`, error);
            throw new Error(`Error al eliminar el carrito con ID ${id}`);
        }
    }
}
