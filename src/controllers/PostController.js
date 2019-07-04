const Post = require('../models/post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');
        res.json(posts);
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const filename = `${name}.jpg`;

        // redimenciona image para ficar mais leve e 
        // envia para o diretório upload/resized
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', filename)
            )

        // deleta arquivo da pasta upload
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        });

        // vai emitir para todos usuarios atualização em tempo real
        req.io.emit('post', post);

        return res.json(post)
    }
};