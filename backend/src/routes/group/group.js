/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const router = require('express').Router({ mergeParams: true });
const mongoose = require('mongoose');
const Group = require('../../db/models/groupSchema');
const User = require('../../db/models/userSchema');

// post new group
router.post('/', async (req, res) => {
  try {
    const group = new Group({
      name: req.body.name,
      owner: mongoose.Types.ObjectId(req.body.owner),
      description: req.body.description,
    });

    const data = await group.save();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

//--------------------------------------------------------------------------------------------

// get group
router.get('/:groupId/', async (req, res) => {
  try {
    const group = await Group.findOne({ _id: mongoose.Types.ObjectId(req.params.groupId) }).then(
      (data, err) => {
        if (err) {
          throw err;
        }
        return data;
      },
    );

    return res.status(200).json(group);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// put group
router.put('/:groupId/', async (req, res) => {
  const body = {};
  if (req.body.name) { body.name = req.body.name; }
  if (req.body.owner) { body.owner = req.body.owner; }
  if (req.body.description) { body.description = req.body.description; }
  if (req.body.admins) { body.admins = req.body.admins; }
  if (req.body.members) { body.members = req.body.members; }
  if (req.body.categories) { body.categories = req.body.categories; }
  if (req.body.notes) { body.notes = req.body.notes; }

  try {
    const group = await Group.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.groupId) },
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

    const data = await group.save();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// delete group
router.delete('/:groupId/', async (req, res) => {
  try {
    const deletedGroup = await Group.findOneAndRemove(
      { _id: mongoose.Types.ObjectId(req.params.groupId) },
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
      { _id: deletedGroup.owner },
      { $pull: { groups: deletedGroup._id } },
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

//--------------------------------------------------------------------------------------------

// add admin
router.post('/admin/:groupId', async (req, res) => {
  try {
    const updatedGroup = await Group.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.groupId) },
      { $push: { admins: req.body.adminId } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });
    const dataGroup = await updatedGroup.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.adminId) },
      { $push: { personal_notes: updatedGroup._id } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    await updatedUser.save();
    return res.status(200).json(dataGroup);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// remove admin
router.delete('/admin/:groupId', async (req, res) => {
  try {
    const updatedGroup = await Group.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.groupId) },
      { $pull: { admins: req.body.adminId } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    const updatedUser = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.adminId) },
      { $pull: { groups: updatedGroup._id } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    const data = await updatedUser.save();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// add member
router.post('/member/:groupId', async (req, res) => {
  try {
    const updatedGroup = await Group.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.groupId) },
      { $push: { members: req.body.memberId } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });
    const dataGroup = await updatedGroup.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.memberId) },
      { $push: { personal_notes: updatedGroup._id } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    await updatedUser.save();
    return res.status(200).json(dataGroup);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// remove member
router.delete('/member/:groupId', async (req, res) => {
  try {
    const updatedGroup = await Group.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.groupId) },
      { $pull: { members: req.body.memberId } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    const updatedUser = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.memberId) },
      { $pull: { groups: updatedGroup._id } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    const data = await updatedUser.save();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

module.exports = router;
