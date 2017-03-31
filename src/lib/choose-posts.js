const score = function(item){
  const now = (Date.now() / 1000) + 3600;
  return item.data.score / (now - item.data.created);
};

const amount = function(keyword){
  if (keyword === "more") { return 20; }
  if (keyword === "fewer" || keyword === "less") { return 5; }
  return 10;
};

module.exports = function(items, opts){
  var its = items.slice(0);

  if (opts.skipFlairs) {
    its = its.filter(i => opts.skipFlairs.indexOf(i.data.link_flair_text) === -1);
  }

  its = its.slice(0, 50);
  its.sort((a, b) => score(b) - score(a));
  return its.slice(0, amount(opts.amount));
};
