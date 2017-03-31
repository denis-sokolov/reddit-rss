const e = require('html-escape');
const getYoutubeId = require('get-youtube-id');
const showdown = require('showdown');

const markdown = new showdown.Converter();
markdown.setOption('simplifiedAutoLink', true);
markdown.setOption('excludeTrailingPunctuationFromURLs', true);
markdown.setOption('literalMidWordUnderscores', true);
markdown.setOption('tables', true);

const getThumbnailUrl = function(i){
  if (i.url.match(/^https?:\/\/gfycat.com\/[A-Z][^/]+/)) {
    return 'https://thumbs.gfycat.com/'
      + i.url.replace(/^https?:\/\/gfycat.com\//, '') + '-poster.jpg';
  }
  if (i.url.match(/^https?:\/\/imgur.com\/[^/]+/)) {
    return 'https://i.imgur.com/'
      + i.url.replace(/^https?:\/\/imgur.com\//, '') + 'l.jpg';
  }
  if (i.url.match(/\.(gif|png|jpe?g)$/)) {
    return i.url;
  }
  if (i.thumbnail.match(/^https?:\/\//)) {
    // Reddit puts keywords into thumbnail field: "self", "spoiler"
    return i.thumbnail;
  }
  return null;
};

const getThumbnail = function(i){
  if (getYoutubeId(i.url)) {
    return '<iframe id="ytplayer" type="text/html" width="640" height="360"'
      + 'src="https://www.youtube.com/embed/' + getYoutubeId(i.url) + '?origin=http://example.com"'
      + ' frameborder="0"></iframe>';
  }

  if (getThumbnailUrl(i)) {
    return '<p><a href="https://www.reddit.com' + e(i.permalink) + '">'
      + '<img src="' + e(getThumbnailUrl(i)) + '"></a></p>';
  }

  return '';
};

module.exports = function(item){
  const i = item.data;
  var html = '';

  html += getThumbnail(i);

  if (i.selftext) {
    html += "<p>" + markdown.makeHtml(i.selftext) + "</p>";
  }

  return html;
};
