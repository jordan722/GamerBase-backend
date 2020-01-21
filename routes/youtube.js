const express = require("express");
const router = express.Router();
const youtubeController = require("../controllers/youtube");

// GET api/youtube/:game_name/streams
router.route("/:game_name/streams").get(youtubeController.getYoutubeStreams);

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
