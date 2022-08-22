/* eslint-disable no-undef */
// require the promise version of mysql2
const mysql = require('mysql2/promise');

// require path to handle file paths
const path = require('path');

// extract any command line arguments from argv
// eslint-disable-next-line no-undef
const args = process.argv.slice(2)[0];

// use args to determine if .env or .env.test should be loaded
const envFile = args === 'test' ? '../.env.test' : '../.env';

// load environment variables from env files
// require('dotenv').config({
//   path: path.join(__dirname, envFile),
// });

if (args === "test") {
  require('dotenv').config({
    path: path.join(__dirname, envFile)
  });
 }
 

// destructure environment variables from process.env
const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT, DB_DIALECT, CLEARDB_DATABASE_URL } = process.env;

// This asyncronous function will run before app
const setUpDatabase = async () => {
  try {
    // connect to the database
    const db = CLEARDB_DATABASE_URL ?
    await mysql.createConnection(CLEARDB_DATABASE_URL) :
    await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
      dialect: DB_DIALECT
    });
  
    // create the database if it doesn't already exist
    !CLEARDB_DATABASE_URL && (await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`));
    !CLEARDB_DATABASE_URL && (await db.query(`USE ${DB_NAME}`));

    // clear out any records in the competencies table
    // so we don't get any duplicates
    await db.query('DELETE FROM Competencies');
    // reset IDs for primary key back to one so competencies always have same IDs
    await db.query('ALTER TABLE Competencies AUTO_INCREMENT = 1;')

    // seed the competencies table
    let competenciesSeedQuery = ''
    competenciesSeedQuery += 'INSERT INTO Competencies\n'
    competenciesSeedQuery += '(competency, createdAt, updatedAt)\n'
    competenciesSeedQuery += 'VALUES\n'
    competenciesSeedQuery += "('Beginner',NOW(), NOW()),\n"
    competenciesSeedQuery += "('Intermediate',NOW(), NOW()),\n"
    competenciesSeedQuery += "('Advanced',NOW(), NOW())\n"
    


    await db.query(competenciesSeedQuery);

    // clear out any records in the competencies table
    // so we don't get any duplicates
    await db.query('DELETE FROM Languages');
    // reset IDs for primary key back to one so competencies always have same IDs
    await db.query('ALTER TABLE Languages AUTO_INCREMENT = 1;')

    // seed the languages table
    let languagesSeedQuery = ''
    languagesSeedQuery += 'INSERT INTO Languages\n'
    languagesSeedQuery += '(language, createdAt, updatedAt)\n'
    languagesSeedQuery += 'VALUES\n'
    languagesSeedQuery += "('English',NOW(), NOW()),\n"
    languagesSeedQuery += "('French',NOW(), NOW()),\n"
    languagesSeedQuery += "('German',NOW(), NOW()),\n"
    languagesSeedQuery += "('Spanish',NOW(), NOW()),\n"
    languagesSeedQuery += "('Italian',NOW(), NOW()),\n"
    languagesSeedQuery += "('Greek',NOW(), NOW()),\n"
    languagesSeedQuery += "('Russian',NOW(), NOW()),\n"
    languagesSeedQuery += "('Japanese',NOW(), NOW()),\n"
    languagesSeedQuery += "('Welsh',NOW(), NOW()),\n"
    languagesSeedQuery += "('Urdu',NOW(), NOW()),\n"
    languagesSeedQuery += "('Polish',NOW(), NOW()),\n"
    languagesSeedQuery += "('Ukrainian',NOW(), NOW()),\n"
    languagesSeedQuery += "('Cantonese',NOW(), NOW())\n"
    
    await db.query(languagesSeedQuery);

       // clear out any records in the desiredLangs table
    // so we don't get any duplicates
    await db.query('DELETE FROM DesiredLangs');
    // reset IDs for primary key back to one so desiredlangs always have same IDs
    await db.query('ALTER TABLE DesiredLangs AUTO_INCREMENT = 1;')

    // seed the languages table
    let desiredLangsSeedQuery = ''
    desiredLangsSeedQuery += 'INSERT INTO DesiredLangs\n'
    desiredLangsSeedQuery += '(desiredLanguage, createdAt, updatedAt)\n'
    desiredLangsSeedQuery += 'VALUES\n'
    desiredLangsSeedQuery += "('English',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('French',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('German',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('Spanish',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('Italian',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('Greek',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('Russian',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('Japanese',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('Welsh',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('Urdu',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('Polish',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('Ukrainian',NOW(), NOW()),\n"
    desiredLangsSeedQuery += "('Cantonese',NOW(), NOW())\n"
    
    await db.query(desiredLangsSeedQuery);

           // clear out any records in the Users table
    // so we don't get any duplicates
    await db.query('DELETE FROM Users');
    // reset IDs for primary key back to one so Users always have same IDs
    await db.query('ALTER TABLE Users AUTO_INCREMENT = 1;')

    let usersSeedQuery = ''
    usersSeedQuery += 'INSERT INTO Users\n'
    usersSeedQuery += '(firstName, lastName, age, location, email, hashedPassword, aboutMe, createdAt, updatedAt)\n'
    usersSeedQuery += 'VALUES\n'
    usersSeedQuery += "('Tom', 'Haynes', 28, 'Manchester', 'tom@test.com', 'password123', 'I am a legend',NOW(), NOW()),\n"
    usersSeedQuery += "('Jimmy', 'McGill', 40, 'Manchester', 'jimmy.mcgill@test.com', 'password123', 'I am a lawyer',NOW(), NOW()),\n"
    usersSeedQuery += "('Cristiano', 'Ronaldo', 37, 'Manchester', 'cr7@test.com', 'cr7manunited', 'I am a football player',NOW(), NOW()),\n"
    usersSeedQuery += "('Sam', 'Howe', 26, 'Leeds', 'sam.howe@test.com', 'wordpass123', 'I am a film maker',NOW(), NOW()),\n"
    usersSeedQuery += "('Nick', 'McAlpine', 32, 'Leeds', 'nick.alpine@test.com', 'supersecurepass', 'I am a coding legend',NOW(), NOW()),\n"
    usersSeedQuery += "('Anna', 'Chan', 25, 'Leeds', 'anna.chan@test.com', 'sequelizemaster', 'I am a lawyer',NOW(), NOW())\n"


    await db.query(usersSeedQuery);
   
    db.end();
  } catch (err) {
    // if something goes wrong, console.log the error and the current environment variables
    console.log(
      `Your environment variables might be wrong. Please double check .env file`
    );
    console.log('Environment Variables are:', {
      DB_PASSWORD,
      DB_NAME,
      DB_USER,
      DB_HOST,
      DB_PORT,
      DB_DIALECT
    });
    console.log(err);
  }
};

// run the async function
setUpDatabase();