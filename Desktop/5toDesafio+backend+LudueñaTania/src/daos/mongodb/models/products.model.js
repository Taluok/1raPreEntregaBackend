import { Schema, model } from 'mongoose';

const productCollection = 'product';

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String }
});

const ProductModel = model(productCollection, productSchema);

export default ProductModel;
