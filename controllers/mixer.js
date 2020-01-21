const axios = require("axios");

const mixerController = {
	getMixerInfo: getMixerInfo,
	getMixerStreams: getMixerStreams
};

// GET api/mixer/game/:name
async function getMixerInfo(req, res, next) {
	try {
		const response = await axios({
			method: "get",
			url: "https://mixer.com/api/v1/types",
			params: { query: req.params.name }
		});
		if (response.status === 200) {
			const filtered_arr = response.data.filter(
				game => game.viewersCurrent > 0
			)[0];
			res.status(200).json(filtered_arr);
		} else {
			throw "Bad Mixer query.";
		}
	} catch (err) {
		console.log(err);
	}
}

// GET api/mixer/:game_id/streams
async function getMixerStreams(req, res, next) {
	try {
		const response = await axios({
			method: "get",
			url: `https://mixer.com/api/v1/types/${req.params.game_id}/channels`,
			params: { order: "viewersCurrent:DESC" }
		});
		if (response.status === 200) {
			res.status(200).json(response.data);
		} else {
			throw "Bad Mixer query.";
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = mixerController;
