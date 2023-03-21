const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    drinks: [{
        drink: { type: Schema.Types.ObjectId, ref: 'Drink' },
        quantity: { type: Number, required: true }
    }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    totalPrice: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

OrderSchema.pre('save', function (next) {
    let totalPrice = 0;
    for (let i = 0; i < this.drinks.length; i++) {
        totalPrice += this.drinks[i].product.price * this.drinks[i].quantity;
    }
    this.totalPrice = totalPrice;
    next();
});

module.exports = mongoose.model('Order', OrderSchema);