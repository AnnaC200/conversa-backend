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
require('dotenv').config({
  path: path.join(__dirname, envFile),
});

// destructure environment variables from process.env
const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

// This asyncronous function will run before app
const setUpDatabase = async () => {
  try {
    // connect to the database
    const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });

    // create the database if it doesn't already exist
    await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    await db.query(`USE ${DB_NAME}`);
    await db.query(`CREATE TABLE IF NOT EXISTS language(
      id INT PRIMARY KEY AUTO_INCREMENT,
      language VARCHAR(255) NOT NULL)`);
    await db.query(`CREATE TABLE IF NOT EXISTS competency(
      id INT PRIMARY KEY AUTO_INCREMENT,
      competency VARCHAR(255) NOT NULL)`);
    await db.query(`CREATE TABLE user (
      id INT PRIMARY KEY AUTO_INCREMENT,  
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      age INT NOT NULL,
      aboutMe TEXT NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      nativeLangId INT NOT NULL, FOREIGN KEY (nativeLangId) REFERENCES language(id),
      desiredLangId INT NOT NULL, FOREIGN KEY (desiredLangId) REFERENCES language(id),
      desiredLangCompId INT NOT NULL, FOREIGN KEY (desiredLangCompId) REFERENCES competency(id))`);
    db.close();
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
    });
    console.log(err);
  }
};

// run the async function
setUpDatabase();
