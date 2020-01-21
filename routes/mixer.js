const express = require("express");
const router = express.Router();
const mixerController = require("../controllers/mixer");

// GET api/mixer/game/:name
router.route("/game/:name").get(mixerController.getMixerInfo);

// GET api/mixer/:game_id/streams
router.route("/:game_id/streams").get(mixerController.getMixerStreams);

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
