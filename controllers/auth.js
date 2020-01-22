const { User } = require("../database/models");

const authController = {
	login: login,
	logout: logout,
	signup: signup
};

async function signup(req, res, next) {
	try {
		const user = await User.create(req.body);
		res.status(201).json("Created User!");
		// req.login(user, err => (err ? next(err) : res.json(user)));
	} catch (err) {
		if (err.name === "SequelizeUniqueConstraintError") {
			res.status(401).send("User already exists");
		} else {
			next(err);
		}
	}
}

async function login(req, res, next) {}

async function logout(req, res, next) {}

module.exports = authController;
