module.exports = (sequelize, DataTypes) => {
  const schema = {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nativeLangId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    desiredLangId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    desiredLangCompetencyId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  };

  return sequelize.define('User', schema);
};
