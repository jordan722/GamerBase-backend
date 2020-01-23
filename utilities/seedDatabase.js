const { User, Post } = require("../database/models");

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
			}),
			Post.create({
				title: "first post",
				lastUpdated: "yesterday",
				replies: [{'title':'first comment', 'threadId':1, 'userId':1},{'title':'second comment', 'threadId':1, 'userId':0}],
				userId: 1,
			})
		]);
	} catch (err) {
		console.log(err);
	}
};

module.exports = seedDatabase;
