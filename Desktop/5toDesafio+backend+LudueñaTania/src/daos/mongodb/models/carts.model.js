import { Schema, model } from 'mongoose';
import { ProductModel } from './product.model.js';

const cartCollection = 'cart';

const cartSchema = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: ProductModel
    }]
});

const CartModel = model(cartCollection, cartSchema);

export default CartModel;
