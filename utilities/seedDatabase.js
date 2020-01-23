const { User } = require("../database/models");

const seedDatabase = async () => {
	try {
		await Promise.all([
			User.create({
				name: "Kun Yu",
				email: "kun@gmail.com",
				password: "pass"
			}),
			User.create({
				name: "Jordan Yaqoob",
				email: "jordan@gmail.com",
				password: "pass"
			})
		]);
	} catch (err) {
		console.log(err);
	}
};

module.exports = seedDatabase;
