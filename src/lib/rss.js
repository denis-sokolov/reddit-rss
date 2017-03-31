const rss = require('node-rss');
const description = require("./description");

const title = function(i){
  var result = i.data.title;
  if (i.data.link_flair_text) {
    result = i.data.link_flair_text + ' - ' + result;
  }
  return result;
};

module.exports = function(name, url, items){
  const feed = rss.createNewFeed(
    name + ' Reddit summary',
    'https://www.reddit.com/r/' + encodeURIComponent(name) + '/',
    'A selection of best posts from Reddit ' + name,
    '',
    url);

  items.forEach(i => feed.addNewItem(
    title(i),
    'https://www.reddit.com' + i.data.permalink,
    (new Date(i.data.created * 1000)).toUTCString(),
    description(i)
  ));

  return rss.getFeedXML(feed);
};
