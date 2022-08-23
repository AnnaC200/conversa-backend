const { User } = require('../models');

const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    location,
    email,
    hashedPassword,
    aboutMe,
    nativeLangId,
    desiredLangId,
    desiredLangCompetencyId,
  } = req.body;

  try {
    const createdUser = await User.create({
      firstName,
      lastName,
      age,
      location,
      email,
      hashedPassword,
      aboutMe,
      nativeLangId,
      desiredLangId,
      desiredLangCompetencyId,
    });

    return res.status(201).json(createdUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error creating user' });
  }
};

const findUserByPk = async (req, res) => {
  const { userId } = req.params;

  try {
    const foundUser = await User.findByPk(userId);

    if (!foundUser)
      return res
        .status(404)
        .json({ message: 'could not find user with that ID' });

    return res.status(201).json(foundUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error finding user' });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users.length)
      return res.status(404).json({ message: 'could not find all users' });
    return res.json(users);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error find all user' });
  }
};

const findUsersByName = async (req, res) => {
  const firstName = req.params.firstName;

  try {
    const foundUsersByName = await User.findAll({
      where: { firstName },
    });

    return res.json(foundUsersByName);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'could not find user by firstName ' });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.update(
      { location: req.body.location },
      { where: { id: userId } }
    );

    return res.json(updatedUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error updating user' });
  }
};

const updateUserLang = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.update(
      { nativeLangId: req.body.nativeLangId },
      { where: { id: userId } }
    );

    return res.json(updatedUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error updating native language' });
  }
};

const updateUserDesiredLang = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.update(
      { desiredLangId: req.body.desiredLangId },
      { where: { id: userId } }
    );

    return res.json(updatedUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error updating desired language' });
  }
};

const updateUserComp = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.update(
      { desiredLangCompetencyId: req.body.desiredLangCompetencyId },
      { where: { id: userId } }
    );

    return res.json(updatedUser);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: 'error updating desired language competency' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userToDelete = await User.destroy({ where: { id: userId } });
    if (!userToDelete)
      return res
        .status(404)
        .json({ message: 'could not find delete with that ID' });
    return res.status(201).json(userToDelete);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error deleting user' });
  }
};

module.exports = {
  createUser,
  findUserByPk,
  findUsersByName,
  findAllUsers,
  updateUser,
  updateUserLang,
  updateUserDesiredLang,
  updateUserComp,
  deleteUser,
};
