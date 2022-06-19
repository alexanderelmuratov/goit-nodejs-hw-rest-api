const createError = require("http-errors");

const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const { favorite } = req.body;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    { favorite },
    { new: true }
  ).populate("owner", "_id email subscription");

  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateStatusContact;
