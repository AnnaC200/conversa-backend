const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const {
    firstName,
    lastName,
    age,
    aboutMe,
    email,
    password,
    location, 
    nativeLangId,
    desiredLangId,
    desiredLangCompId
  } = req.body;

  try {
    const [result] = await db.query(`INSERT INTO user (
      firstName,
      lastName,
      age,
      aboutMe,
      email,
      password,
      location, 
      nativeLangId,
      desiredLangId,
      desiredLangCompId) VALUES ('${firstName}', '${lastName}', '${age}', '${aboutMe}', '${email}', '${password}', '${location}', '${nativeLangId}', '${desiredLangId}', '${desiredLangCompId}')`);

    res.status(201).send({id:result.insertId});
  } catch (err) {
      console.log(err)
    res.status(500).json(err.sqlMessage);
  }

  db.close();
};

exports.read = async (req, res) => {
  const db = await getDb();

  try {
    const [user] = await db.query('SELECT * FROM user');
    console.log[user]

    res.status(200).json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  db.close();
}

exports.readById = async (req, res) => {
  const db = await getDb(); 
  const { userId } = req.params;

  const [[user]] = await db.query('SELECT * FROM user WHERE id = ?', 
  [userId])

  if (!user) {
    res.status(404)
  } else {
    res.status(200).json(user)
  }
  db.close()
}

exports.update = async (req, res) => {
  const db = await getDb()
  const data = req.body
  const { userId } = req.params

  try {
    const [
      { affectedRows }
    ] = await db.query('UPDATE user SET ? WHERE id = ?', [data, userId])

    if (!affectedRows) {
      res.status(404)
    } else {
      res.status(200).send('Successfully updated')
    }
  } catch (err) {
    res.status()
  }
  db.close()
}
