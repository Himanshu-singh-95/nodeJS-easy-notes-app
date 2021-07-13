const catchError = (err, req, res) => {
  if (err.kind === "ObjectId") {
    return res.status(404).send({
      message: "Note not found with id " + req.params.noteId,
    });
  }
  return res.status(500).send({
    message: "Error retrieving note with id " + req.params.noteId,
  });
};

const noteNotFound = (req, res) => {
  return res.status(404).send({
    message: "Note not found with id " + req.params.noteId,
  });
};

const dataRetrieveError = (err, res) => {
  return res.status(500).send({
    message: err.message || "Some error occurred while retrieving notes.",
  });
};

module.exports = { catchError, noteNotFound, dataRetrieveError };
