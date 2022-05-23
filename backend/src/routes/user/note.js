/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router({ mergeParams: true });
const mongoose = require('mongoose');
const Category = require('../../db/models/categorySchema');
const Note = require('../../db/models/noteSchema');
const User = require('../../db/models/userSchema');

// post note in user
router.post('/:userId/category/:categoryId/note', async (req, res) => {
  try {
    const note = new Note({
      name: req.body.name,
      owner: req.params.userId,
      content: req.body.content,
      summary: req.body.summary,
    });
    const newNote = await note.save();

    await Category.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.categoryId) },
      { $push: { notes: newNote._id } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    const updatedUser = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.userId) },
      { $push: { personal_notes: newNote._id } },
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

// get all notes of category
router.get('/:userId/category/:categoryId/note', async (req, res) => {
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

    const promises = await category.notes.map(async (noteId) => {
      const note = await Note.findOne({ _id: mongoose.Types.ObjectId(noteId) })
        .then(
          (data, err) => {
            if (err) {
              throw err;
            }
            return data;
          },
        );
      return note;
    });
    const noteArray = await Promise.all(promises);

    return res.status(200).json(noteArray);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

//--------------------------------------------------------------------------------------------

// get note of user
router.get('/:userId/category/:categoryId/note/:noteId', async (req, res) => {
  try {
    const note = await Note.findOne(
      { _id: mongoose.Types.ObjectId(req.params.noteId) },
    ).then(
      (data, err) => {
        if (err) {
          throw err;
        }
        return data;
      },
    );

    return res.status(200).json(note);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// put note of user
router.put('/:userId/category/:categoryId/note/:noteId', async (req, res) => {
  const body = {};
  if (req.body.name) { body.name = req.body.name; }
  if (req.body.content) { body.content = req.body.content; }
  if (req.body.summary) { body.summary = req.body.summary; }

  try {
    const note = await Note.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.noteId) },
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

    const data = await note.save();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// delete note of user
router.delete('/:userId/category/:categoryId/note/:noteId', async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndRemove(
      { _id: mongoose.Types.ObjectId(req.params.noteId) },
    )
      .then(
        (data, err) => {
          if (err) {
            throw err;
          }
          return data;
        },
      );

    await Category.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.categoryId) },
      { $pull: { notes: deletedNote._id } },
      { new: true },
    )
      .then((data, err) => {
        if (err) {
          throw err;
        }
        return data;
      });

    const updatedUser = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.userId) },
      { $pull: { personal_notes: deletedNote._id } },
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
