"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetcher = function (a, b) {
  return fetch(a, b).then(function (r) {
    return r.json();
  });
};
exports.default = fetcher;
