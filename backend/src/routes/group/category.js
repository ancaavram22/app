/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const router = require('express').Router({ mergeParams: true });
const Category = require('../../db/models/categorySchema');
const Group = require('../../db/models/groupSchema');

// post category in group
router.post('/:groupId/category', async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      owner: req.params.groupId,
      description: req.body.description,
    });
    const newCategory = await category.save();

    const updatedGroup = await Group.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.groupId) },
      { $push: { categories: newCategory._id } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    return res.status(200).json(updatedGroup);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// get categories from group
router.get('/:groupId/category', async (req, res) => {
  try {
    const group = await Group.find(
      { _id: mongoose.Types.ObjectId(req.params.groupId) },
    ).then(
      (data, err) => {
        if (err) {
          throw err;
        }
        return data[0];
      },
    );

    const promises = await group.categories.map(async (categoryId) => {
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

// get category of group
router.get('/:groupId/category/:categoryId', async (req, res) => {
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

// put category of group
router.put('/:groupId/category/:categoryId', async (req, res) => {
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

// delete category of group
router.delete('/:groupId/category/:categoryId', async (req, res) => {
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

    const updatedGroup = await Group.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.groupId) },
      { $pull: { categories: deletedCategory._id } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    return res.status(200).json(updatedGroup);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

module.exports = router;
