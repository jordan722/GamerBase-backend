const axios = require("axios");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const youtubeController = {
	getYoutubeStreams: getYoutubeStreams
};

// GET api/youtube/:game_name/streams
async function getYoutubeStreams(req, res, next) {
	try {
		const response = await axios({
			method: "get",
			url: "https://www.googleapis.com/youtube/v3/search",
			params: {
				key: YOUTUBE_API_KEY,
				q: req.params.game_name,
				part: "snippet",
				maxResults: 25,
				eventType: "live",
				type: "video"
			}
		});
		if (response.status === 200) {
			res.status(200).json(response.data);
		} else {
			throw "Bad Youtube query.";
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = youtubeController;
