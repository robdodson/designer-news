var express = require('express');
var router = express.Router();
var request = require('superagent');

// Paginate page urls with fallback option
// if it's on the initial page
function paginate(section, page, fallback) {
  if (page <= 0) {
    return null;
  }

  if (page === 1) {
    return fallback;
  }

  return [section, page].join('/')
}

/* GET home page. */
router.get('/p?/:offset?', function(req, res, next) {
  var offset = parseInt(req.params.offset, 10) || 1;
  request
    .get('https://api-news.layervault.com/api/v2/stories')
    .query({ page: offset })
    .end(function(err, apiRes) {
      if (err) {
        return next(err);
      }
      res.render('index', {
        stories: apiRes.body.stories,
        next: paginate('/p', offset + 1),
        prev: paginate('/p', offset - 1, '/')
      });
    });
});

/* GET newest stories. */
router.get('/new/:offset?', function(req, res, next) {
  var offset = parseInt(req.params.offset, 10) || 1;
  request
    .get('https://api-news.layervault.com/api/v2/stories')
    .query({ sort: '-created_at', page: offset })
    .end(function(err, apiRes) {
      if (err) {
        return next(err);
      }
      res.render('index', {
        stories: apiRes.body.stories,
        next: paginate('/new', offset + 1),
        prev: paginate('/new', offset - 1, '/new')
      });
    });
});

module.exports = router;
