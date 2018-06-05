const searchRegex = function(value) {
  return new RegExp(`.*${value}.*`, 'i');
};

const matches = function(text, query) {
  return text.match(searchRegex(query));
};

module.exports = {
  searchRegex: searchRegex,
  matches: matches
};
