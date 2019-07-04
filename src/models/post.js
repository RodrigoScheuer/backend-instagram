const mongoose = require('mongoose');

// representação da tabela no banco de dados mongodb atlas
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Post', PostSchema);