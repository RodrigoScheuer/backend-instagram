const Post = require('../models/post');

module.exports = {
    async store(req, res) {
        const post = await Post.findById(req.params.id);

        post.likes += 1;

        await post.save();

        // vai emitir para todos usuarios atualização em tempo real
        req.io.emit('like', post);

        return res.json(post);
    }
};