const RSS = require('rss');
const description = require("./description");

const title = function(i){
  var result = i.data.title;
  if (i.data.link_flair_text) {
    result = i.data.link_flair_text + ' - ' + result;
  }
  return result;
};

module.exports = function(name, url, items){
  const feed = new RSS({
    title: name + ' Reddit summary',
    site_url: 'https://www.reddit.com/r/' + encodeURIComponent(name) + '/',
    description: 'A selection of best posts from Reddit ' + name,
    feed_url: url,
  });

  items.forEach(i => feed.item({
    title: title(i),
    url: 'https://www.reddit.com' + i.data.permalink,
    date: (new Date(i.data.created * 1000)).toUTCString(),
    description: description(i)
  }));

  return feed.xml();
};
