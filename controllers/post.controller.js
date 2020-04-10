const Post = require('../models/Post');

const createPost = async (req, res, next) => {
  try {
    const { title, content, summary, image, user } = req.body;
    const newPost = new Post({
      title,
      content,
      summary,
      image,
      user,
    });

    await newPost.validate();
    const postCreated = await newPost.save();

    return res.status(200).json(postCreated);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .select('title dateCreation content image userId')
      .populate({ path: 'userId', select: 'name avatar' });

    return res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const post = await Post.find()
    .select('dateCreation category title content summary image userId')
    .populate({ path: 'user', select: 'name avatar description' });
    return res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    return res.status(200).json(deletedPost);
  } catch (error) {
    return next(error);
  }
};

const deleteAllPosts = async (req, res, next) => {
  try {
    Post.remove({}, (err) => {
      if (err) throw Error(err);
    });
    res.status(200).json('Se han borrado todos los posts');
  } catch (error) {
    return next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, summary, image, category } = req.body;

    const post = await Post.findById(id);
    post.title = title || post.title;
    post.content = content || post.content;
    post.summary = summary || post.summary;
    post.image = image || post.image;
    post.category = category || category;

    await post
      .save()
      .then(() =>
        res.status(200).json(post)
      )
      .catch((err) => {
        throw Error(err);
      });
  } catch (error) {
    return next(error);
  }
};

// @TODO: Hacer uno que devuelva los posts ordenados con mas visitas según la categoría
// @TODO: Hacer uno para la búsqueda por título

module.exports = {
  createPost,
  getPostById,
  getAllPosts,
  deletePost,
  deleteAllPosts,
  updatePost,
};
