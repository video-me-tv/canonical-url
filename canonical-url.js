'use strict';
import normalizeUrl from 'normalize-url';
const sha1 = require('sha1');

const canonicalUrl = (urlString, options) => {
  options = {
    forceHttp: true,
    stripProtocol: true,
    stripHash: true,
    algorithmHashSHA1: false,
    ...options
  };

  if (urlString.search(/^http[s]?\:\/\//) === -1)
    urlString = 'http://' + urlString;

  const canonical = normalizeUrl(urlString, options);
  const slug = sha1(canonical);

  const url = new URL(urlString);
  let domain = url.hostname;

  if ((domain.match(/\./g) || []).length > 1) {
    domain = domain.substr(domain.indexOf('.') + 1, domain.length)
  }

  return {canonical, slug, domain};
};

module.exports = canonicalUrl;
