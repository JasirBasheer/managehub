const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: Number, required: true },
    batch: { type: String, required: true }
});

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
