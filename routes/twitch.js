const express = require("express");
const router = express.Router();
const twitchController = require("../controllers/twitch");

// GET api/twitch/game/:name
router.route("/game/:name").get(twitchController.getTwitchInfo);

// GET api/twitch/:game_id/streams
router.route("/:game_id/streams").get(twitchController.getTwitchStreams);

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
