/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const router = require('express').Router({ mergeParams: true });
const Category = require('../../db/models/categorySchema');
const User = require('../../db/models/userSchema');

// post category in user
router.post('/:userId/category', async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      owner: req.params.userId,
      description: req.body.description,
    });
    const newCategory = await category.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.userId) },
      { $push: { categories: newCategory._id } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// get categories from user
router.get('/:userId/category', async (req, res) => {
  try {
    const user = await User.find(
      { _id: mongoose.Types.ObjectId(req.params.userId) },
    ).then(
      (data, err) => {
        if (err) {
          throw err;
        }
        return data[0];
      },
    );

    const promises = await user.categories.map(async (categoryId) => {
      const category = await Category.findOne({ _id: mongoose.Types.ObjectId(categoryId) })
        .then(
          (data, err) => {
            if (err) {
              throw err;
            }
            return data;
          },
        );
      return category;
    });
    const categoryArray = await Promise.all(promises);

    return res.status(200).json(categoryArray);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

//--------------------------------------------------------------------------------------------

// get category of user
router.get('/:userId/category/:categoryId', async (req, res) => {
  try {
    const category = await Category.findOne(
      { _id: mongoose.Types.ObjectId(req.params.categoryId) },
    ).then(
      (data, err) => {
        if (err) {
          throw err;
        }
        return data;
      },
    );

    return res.status(200).json(category);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// put category of user
router.put('/:userId/category/:categoryId', async (req, res) => {
  const body = {};
  if (req.body.name) { body.name = req.body.name; }
  if (req.body.description) { body.description = req.body.description; }
  if (req.body.notes) { body.notes = req.body.notes; }

  try {
    const category = await Category.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.categoryId) },
      body,
      { new: true },
    )
      .then(
        (data, err) => {
          if (err) {
            throw err;
          }
          return data;
        },
      );

    const data = await category.save();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// delete category of user
router.delete('/:userId/category/:categoryId', async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndRemove(
      { _id: mongoose.Types.ObjectId(req.params.categoryId) },
    )
      .then(
        (data, err) => {
          if (err) {
            throw err;
          }
          return data;
        },
      );

    const updatedUser = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.userId) },
      { $pull: { categories: deletedCategory._id } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

module.exports = router;
