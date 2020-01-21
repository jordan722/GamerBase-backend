const { User } = require("../database/models");

const seedDatabase = async () => {
	try {
		await Promise.all([
			User.create({
				firstName: "Kun",
				lastName: "Yu",
				email: "kun@gmail.com"
			}),
			User.create({
				firstName: "Jordan",
				lastName: "Yaqoob",
				email: "jordan@gmail.com"
			})
		]);
	} catch (err) {
		console.log(err);
	}
};

module.exports = seedDatabase;
