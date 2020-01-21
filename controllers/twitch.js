const axios = require("axios");

const TWITCH_API_KEY = process.env.TWITCH_API_KEY;

const twitchController = {
	getTwitchInfo: getTwitchInfo,
	getTwitchStreams: getTwitchStreams
};

// GET api/twitch/game/:name
async function getTwitchInfo(req, res, next) {
	try {
		const response = await axios({
			method: "get",
			url: "https://api.twitch.tv/helix/games",
			params: { name: req.params.name },
			headers: { "Client-ID": TWITCH_API_KEY }
		});
		if (response.status === 200) {
			res.status(200).json(response.data.data[0]);
		} else {
			throw "Bad Twitch query.";
		}
	} catch (err) {
		console.log(err);
	}
}

// GET api/twitch/:game_id/streams
async function getTwitchStreams(req, res, next) {
	try {
		const response = await axios({
			method: "get",
			url: "https://api.twitch.tv/helix/streams",
			params: { game_id: req.params.game_id },
			headers: { "Client-ID": TWITCH_API_KEY }
		});
		if (response.status === 200) {
			res.status(200).json(response.data);
		} else {
			throw "Bad Twitch query.";
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = twitchController;
