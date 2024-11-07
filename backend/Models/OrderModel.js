import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    discountApplied: {
        type: Number,
        default: 0
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    datePaid: {
        type: Date,
        default: null
    }
});


const Order = mongoose.model('Order', orderSchema);
export default Order;
