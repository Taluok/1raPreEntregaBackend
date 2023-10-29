import { Router } from "express";
import cartManager from '../managers/cart.manager'; 

const router = Router();

router.post('/', async (req, res) => {
    try {
        // Generar un ID único para el carrito
        const cartId = uuidv4();

        // Utiliza cartManager para crear el carrito
        const cart = await cartManager.createCart();

        // Enviar la respuesta con el carrito creado
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartManager.getCartById(cid);

        if (cart) {
            // Envia la respuesta con el carrito encontrado
            res.status(200).json(cart);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar el carrito' });
    }
});

router.post('/:idCart/product/:idProd', async (req, res) => {
    try {
        const { idProd, idCart } = req.params;

        const updatedCart = await cartManager.saveProductToCart(idCart, idProd);

        if (updatedCart) {
            // Enviar la respuesta con el carrito actualizado
            res.status(200).json(updatedCart);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

export default router;


