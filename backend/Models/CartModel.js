import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Credit/Debit', 'Mpesa', 'Cash on Delivery'], required: true } 
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
