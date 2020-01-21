const { Users } = require("../database/models");

const userController = {
	getAllUsers: getAllUsers,
};

// GET api/users/
async function getAllUsers(req, res, next) {
	try {
		const users = await Users.findAll();
		res.status(200).json(users);
		console.log('attempting to find users');
	} catch (err) {
		console.log(err);
	}
}


module.exports = userController;
