/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const router = require('express').Router({ mergeParams: true });
const mongoose = require('mongoose');
const User = require('../../db/models/userSchema');

// post new user
router.post('/', async (req, res) => {
  try {
    const user = new User({
      groups: req.body.groups,
      personal_notes: req.body.personal_notes,
      categories: req.body.categories,
      friends_list: req.body.friends_list,
    });

    const data = await user.save();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

//--------------------------------------------------------------------------------------------

// get user
router.get('/:userId/', async (req, res) => {
  try {
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(req.params.userId) }).then(
      (data, err) => {
        if (err) {
          throw err;
        }
        return data;
      },
    );

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// put user
router.put('/:userId/', async (req, res) => {
  const body = {};
  if (req.body.groups) { body.groups = req.body.groups; }
  if (req.body.personal_notes) { body.personal_notes = req.body.personal_notes; }
  if (req.body.categories) { body.categories = req.body.categories; }
  if (req.body.friends_list) { body.friends_list = req.body.friends_list; }

  try {
    const user = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.userId) },
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

    const data = await user.save();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

module.exports = router;
