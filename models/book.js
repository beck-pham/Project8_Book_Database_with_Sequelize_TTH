const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false, //disallow null
            validate: {
                notNull: {
                    msg: 'Please provide a value for "title"'
                },
                notEmpty: {
                    //custom error message
                    msg: 'Please provide a value for "title"'
                }
            }
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false, //disallow null
            validate: {
                notNull: {
                    msg: 'Please provide a value for "author"'
                },
                notEmpty: {
                    //custom error message
                    msg: 'Please provide a value for "author"'
                }
            }
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false, //disallow null
            validate: {
                notNull: {
                    msg: 'Please provide a value for "genre"'
                },
                notEmpty: {
                    //custom error message
                    msg: 'Please provide a value for "genre"'
                }
            }
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false, //disallow null
            validate: {
                notNull: {
                    msg: 'Please provide a value for "year"'
                },
                notEmpty: {
                    //custom error message
                    msg: 'Please provide a value for "year"'
                }
            }
        },
    }, { sequelize });
    return Book;
}