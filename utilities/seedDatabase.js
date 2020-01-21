const { User } = require("../database/models");

const seedDatabase = async () => {
	await Promise.all([
		User.create({
			firstName: "Kun",
			lastName: "Yu",
			email: "kun@gmail.com",
		}),
		User.create({
			firstName: "Jordan",
			lastName: "Yaqoob",
			email: "jordan@gmail.com",
		}),
	]);
};

module.exports = seedDatabase;
