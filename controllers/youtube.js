const axios = require("axios");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const youtubeController = {
	getStreams: getStreams
};

// GET api/youtube/streams?gameName
async function getStreams(req, res, next) {
	try {
		let streams = await axios({
			method: "get",
			url: "https://www.googleapis.com/youtube/v3/search",
			params: {
				key: YOUTUBE_API_KEY,
				q: req.query.gameName,
				part: "snippet",
				maxResults: 10,
				eventType: "live",
				type: "video",
				order: "viewCount"
			}
		});
		if (streams.data.items.length === 0) {
			res.status(404).json("Game not found - Youtube");
			return;
		}

		streams = await Promise.all(
			streams.data.items.map(async stream => {
				try {
					let user = await axios({
						method: "get",
						url: "https://www.googleapis.com/youtube/v3/videos",
						params: {
							key: YOUTUBE_API_KEY,
							part: "liveStreamingDetails",
							id: stream.id.videoId
						}
					});
					user = user.data.items[0];

					let channel = await axios({
						method: "get",
						url: "https://www.googleapis.com/youtube/v3/channels",
						params: {
							key: YOUTUBE_API_KEY,
							part: "snippet",
							id: stream.snippet.channelId
						}
					});
					channel = channel.data.items[0];

					return {
						user_name: stream.snippet.channelTitle,
						profile_image_url: channel.snippet.thumbnails.medium.url,
						title: stream.snippet.title,
						thumbnail_url: stream.snippet.thumbnails.high.url,
						viewer_count: user.liveStreamingDetails.concurrentViewers,
						external_link: `https://www.youtube.com/watch?v=${stream.id.videoId}`
					};
				} catch (err) {
					console.log(err);
				}
			})
		);

		res.status(200).json({ streams: streams });
	} catch (err) {
		console.log(err);
	}
}

module.exports = youtubeController;
