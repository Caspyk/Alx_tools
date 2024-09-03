const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
    loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }],
    investments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Investment' }],
    notifications: [{ type: String }],
});

// Password hashing before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, required: true },
    description: { type: String, required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    tenure: { type: Number, required: true }, // In months
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Loan', LoanSchema);
