const http = require('http');
const url = require('url');

const choose = require("./choose-posts");
const retrieve = require("./retrieve");
const rss = require("./rss");

module.exports = function(port){
  http.createServer(function(req, res){
    if (req.url === '/') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end("Hello, world!");
      return;
    }
    if (req.url === '/favicon.ico') {
      res.writeHead(404);
      res.end();
      return;
    }

    const u = url.parse(req.url, true);
    const subreddit = u.pathname.substr(1);
    retrieve(subreddit).then(function(data){
      const posts = data.data.children;
      const chosen = choose(posts, {
        amount: u.query.amount,
        skipFlairs: typeof u.query.skipFlair === 'string'
          ? [u.query.skipFlair] : u.query.skipFlair
      });
      res.writeHead(200, {'Content-Type': 'application/rss+xml'});
      res.end(rss(subreddit, 'http://' + req.headers.host, chosen));
    }).catch(function(err){
      console.log(new Date(), req.url, err);
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end(err.message);
    });
  }).listen(port);
};
