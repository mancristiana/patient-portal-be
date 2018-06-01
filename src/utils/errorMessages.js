module.exports = function(code) {
  switch (code) {
    case 400:
      return 'Bad request. Make sure JSON is properly formatted and contains all required fields. ';
    case 401:
      return 'Unauthorized. ';
    case 500:
      return 'Internal Server Error. ';
    default:
      return '';
  }
};
