import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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
                    required: true,
                    min: 1
                }
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        discountApplied: {
            type: Number,
            default: 0,
            min: 0
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
        },
        orderStatus: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'],
            default: 'Pending'
        },
        shippingAddress: {
            location: String,
            residence: String
        },
        paymentMethod: {
            type: String,
            enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'],
            default: 'Cash on Delivery'
        },
        transactionId: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
