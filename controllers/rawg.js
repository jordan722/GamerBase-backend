const axios = require('axios');

const rawgController = {
  getTrending: getTrending,
  getUpcoming: getUpcoming,
  getTopRated: getTopRated,
  getGameData: getGameData,
}

async function getTrending(req, res, next){
  try{
    const response = await axios({
      method: 'get',
      url: 'https://api.rawg.io/api/games/lists/main',
      params:{
        ordering: '-relevance',
        page_size: 10
      }
    });
    if (response.status === 200) {
			res.status(200).json(response.data);
		} else {
			throw "Bad query.";
		}
  } catch (err) {
    console.log(err);
  }
}

async function getTopRated(req, res, next){
  try{
    const response = await axios({
      method: 'get',
      url: 'https://api.rawg.io/api/games',
      params:{
        ordering: '-added',
        page_size: 10
      }
    });
    if (response.status === 200) {
			res.status(200).json(response.data);
		} else {
			throw "Bad query.";
		}
  } catch (err) {
    console.log(err);
  }
}

async function getUpcoming(req, res, next){
  try{
    const response = await axios({
      method: 'get',
      url: 'https://api.rawg.io/api/games',
      params:{
        dates:'2020-01-21,2020-12-31',
        ordering: '-added',
        page_size: 10,
      }
    });
    if (response.status === 200) {
			res.status(200).json(response.data);
		} else {
			throw "Bad query.";
		}
  } catch (err) {
    console.log(err);
  }
}

async function getGameData(req, res, next){
  try {
      ans = {}
      // get general game data
      const gameData = await axios.get(`https://api.rawg.io/api/games/${req.params.id}`);
      data = gameData.data;
      console.log(data)
      keys = ['id', 'name', 'description', 'rating', 'reddit_url', 'released', 'metacritic_url', 'background_image']
      for(let i = 0; i < keys.length; i++){
        ans[keys[i]] = data[keys[i]]
      }

      // get purchase links
      ans.stores = [];
      for(let i=0; i < data.stores.length; i++){
        ans.stores.push({
          store: data.stores[i].store.name.split(' ')[0],
          url: data.stores[i].url,
        })
      }

      // get reddit posts
      let redditData = await axios.get(`https://api.rawg.io/api/games/${req.params.id}/reddit`);
      redditData = redditData.data.results;
      ans.reddit_posts = [];
      for(let i=0; i < redditData.length; i++){
        ans.reddit_posts.push({
          name: redditData[i].id,
          url: redditData[i].url,
          image: redditData[i].image,
        })
      }

      // get youtube vids
      let youtubeData = await axios.get(`https://api.rawg.io/api/games/${req.params.id}/youtube`);
      youtubeData = youtubeData.data.results;
      ans.youtube = [];
      for(let i=0; i < youtubeData.length; i++){
        ans.youtube.push({
          name: youtubeData[i].name,
          image: youtubeData[i].thumbnails.high.url,
          url: `https://www.youtube.com/watch?v=${youtubeData[i].external_id}`,
        })
      }

      res.status(200).json(ans);
  }
  catch(err) {
      console.log(err);
  res.status(400).json("something went wrong");
  }
}

module.exports = rawgController;
