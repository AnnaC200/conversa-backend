module.exports = (sequelize, DataTypes) => {
  const schema = {
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  
  return sequelize.define('Language', schema);
};
