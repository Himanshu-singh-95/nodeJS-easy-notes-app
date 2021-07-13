const Note = require("../models/note.model.js");
const {
  catchError,
  noteNotFound,
  dataRetrieveError,
} = require("./handleErrors.js");

// Create and Save a new Note
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.content) {
    return validateEmptyContent(res);
  }

  // Create a Note
  const note = createNote(req);

  try {
    // Save Note in the database
    const data = await note.save();
    res.send(data);
  } catch (err) {
    return dataRetrieveError(err, res);
  }
};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
  try {
    const notes = await Note.find({}); // find all documents
    res.send(notes);
  } catch (err) {
    return dataRetrieveError(err, res);
  }
};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return noteNotFound(req, res);
    }
    res.send(note);
  } catch (err) {
    return catchError(err, req, res);
  }
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return validateEmptyContent(res);
  }

  // Find note and update it with the request body
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.noteId,
      {
        title: req.body.title || "Untitled Note",
        content: req.body.content,
      },
      { new: true } //  If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
    );

    if (!note) {
      return noteNotFound(req, res);
    }

    res.send(note);
  } catch (err) {
    return catchError(err, req, res);
  }
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
  try {
    const note = await Note.findByIdAndRemove(req.params.noteId);
    if (!note) {
      return noteNotFound(req, res);
    }
    res.send({ message: "Note deleted successfully!" });
  } catch {
    return catchError(err, req, res);
  }
};

const createNote = (req) => {
  return new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content,
  });
};

const validateEmptyContent = (req, res) => {
  return res.status(400).send({
    message: "Note content can not be empty",
  });
};
