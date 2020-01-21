const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: Sequelize.VIRTUAL,
		get() {
			return (
				this.getDataValue("firstName") + " " + this.getDataValue("lastName")
			);
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = User;
