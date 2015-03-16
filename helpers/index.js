// Handlebars helpers

var hbs = require('hbs');
var Handlebars = hbs.handlebars;

// hbs.registerHelper('paginate', function(text, num) {
//   if (num <= 0) {
//     return "";
//   }
//
//   if (num === 1) {
//     return new Handlebars.SafeString(
//       "<a href='/'>" + text + "</a>"
//     );
//   }
//
//   return new Handlebars.SafeString(
//     "<a href='/p/" + num + "'>" + text + "</a>"
//   );
// });
