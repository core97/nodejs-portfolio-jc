const User = require('../models/User');

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
}

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params
      const deletedUser = await User.findByIdAndDelete(id)
      return res.status(200).json(deletedUser)
    } catch (error) {
      return next(error)
    }
}

const deleteAllUsers = async (req, res, next) => {
  try {
    User.remove({}, (err) => {
      if (err) throw Error(err);
    });
    res.status(200).json('Se han borrado todos los usuarios');
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { description, avatar } = req.body;

        const user = await User.findById(id)
        user.description = description || user.description;
        user.avatar = avatar || user.avatar;

        await user
        .save()
        .then(() =>
            res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                description: user.description,
                avatar: user.avatar
            }
            })
        )
        .catch(err => {
            throw Error(err)
        })
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getUserById,
    getAllUser,
    deleteUser,
    deleteAllUsers,
    updateUser,
}
