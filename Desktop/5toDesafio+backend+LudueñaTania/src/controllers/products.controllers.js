import * as productService from '../services/product.service.js';
import { ProductDao } from '../daos/filesystem/products.dao.js';

const productDao = new ProductDao('../daos/filesystem/data/products.json');

class ProductController {
    static async getAll(req, res, next) {
        try {
            const products = await productService.getAll();
            const { limit } = req.query;

            if (!limit || isNaN(limit) || parseInt(limit) <= 0) {
                return res.status(200).json(products);
            } else {
                const limitParseado = parseInt(limit);
                const filterProducts = products.slice(0, limitParseado);
                return res.status(200).json(filterProducts);
            }
        } catch (error) {
            next(error.message);
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const productFind = await productService.getById(id);

            if (!productFind) {
                return res.status(404).json({ message: `Producto no encontrado con id ${id}` });
            } else {
                return res.status(200).json(productFind);
            }
        } catch (error) {
            next(error.message);
        }
    }

    static async create(req, res, next) {
        try {
            const newProduct = await productService.create(req.body);
            return res.status(201).json(newProduct);
        } catch (error) {
            next(error.message);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const updateValues = req.body;
            const productUpdate = await productService.update(id, updateValues);

            if (!productUpdate) {
                return res.status(400).json({ message: `Error al actualizar el producto con id ${id}` });
            } else {
                return res.status(200).json(productUpdate);
            }
        } catch (error) {
            next(error.message);
        }
    }

    static async remove(req, res, next) {
        try {
            const { id } = req.params;
            const deletedProduct = await productService.remove(id);

            if (!deletedProduct) {
                return res.status(400).json({ message: `Error al eliminar el producto con id: ${id}` });
            } else {
                return res.status(200).json(deletedProduct);
            }
        } catch (error) {
            next(error.message);
        }
    }
}

export default ProductController;
