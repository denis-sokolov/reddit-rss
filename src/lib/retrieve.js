const fetch = require('node-fetch');

module.exports = function(subreddit){
  return fetch('https://www.reddit.com/r/' + encodeURIComponent(subreddit) + '.json', {
    headers: { 'user-agent': 'node:cc.sokolov.reddit-rss:v1.0.0 (by /u/akral)' }
  }).then(function(res){
    if (res.status !== 200)
      throw new Error("Bad response code " + res.status);
    return res.json();
  });
};
