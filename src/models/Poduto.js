const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    nome: String,
    quantidade: Number,
    unidade: String,
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('Produto', PostSchema);