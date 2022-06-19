const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;

  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  const filter = await Contact.find({ owner: _id, favorite }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  const result = favorite ? filter : contacts;

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listContacts;
