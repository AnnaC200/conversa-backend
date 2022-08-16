module.exports = (sequelize, DataTypes) => {
  const schema = {
    language: DataTypes.STRING,
  };

  return sequelize.define('Language', schema);
};
