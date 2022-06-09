const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = listContacts;
