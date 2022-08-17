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
            unique: true
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter password",
                },
                hashedPassword(value) {
                    if(value.length < 5) {
                        throw new Error('Password must be 5 characters long');
                    }
                }
            }
        },
        aboutMe: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    };

    return sequelize.define('User', schema);

};

