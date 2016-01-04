'use strict';

Handlebars.registerHelper({
  and: function (a, b) {
    return a && b;
  },
  eq: function (a, b) {
    return a === b;
  },
  gt: function (a, b) {
    return a > b;
  },
  gte: function (a, b) {
    return a >= b;
  },
  lt: function (a, b) {
    return a < b;
  },
  lte: function (a, b) {
    return a <= b;
  },
  ne: function (a, b) {
    return a !== b;
  },
  or: function (a, b) {
    return a || b;
  }
});

Handlebars.registerHelper('times', function (n, options) {
  var accum = '';

  for (var i = 0; i < n; ++i) {
    accum += options.fn(i);
  }

  return accum;
});
