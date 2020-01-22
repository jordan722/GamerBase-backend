const axios = require("axios");

const TWITCH_API_KEY = process.env.TWITCH_API_KEY;

const twitchController = {
	getStreams: getStreams
};

// GET api/twitch/streams?gameName
async function getStreams(req, res, next) {
	try {
		let info = await axios({
			method: "get",
			url: "https://api.twitch.tv/helix/games",
			params: { name: req.query.gameName },
			headers: { "Client-ID": TWITCH_API_KEY }
		});
		info = info.data.data[0];

		let streams = await axios({
			method: "get",
			url: "https://api.twitch.tv/helix/streams",
			params: { game_id: info.id },
			headers: { "Client-ID": TWITCH_API_KEY }
		});
		streams = await Promise.all(
			streams.data.data.slice(0, 10).map(async stream => {
				try {
					let user = await axios({
						method: "get",
						url: "https://api.twitch.tv/helix/users",
						params: { id: stream.user_id },
						headers: { "Client-ID": TWITCH_API_KEY }
					});
					user = user.data.data[0];

					return {
						user_name: stream.user_name,
						profile_image_url: user.profile_image_url,
						title: stream.title,
						thumbnail_url: stream.thumbnail_url,
						viewer_count: stream.viewer_count,
						external_link: `https://www.twitch.tv/${stream.user_name}`
					};
				} catch (err) {
					console.log(err);
				}
			})
		);

		const response = { ...info, ...{ streams: streams } };

		res.status(200).send(response);
	} catch (err) {
		console.log(err);
	}
}

module.exports = twitchController;
