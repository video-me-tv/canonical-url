const canonicalUrl = require('./canonical-url');

test ('missing protocol', () => {
  expect(canonicalUrl('www.tubeoffline.com')).toEqual({
    canonical: 'tubeoffline.com',
    domain: 'tubeoffline.com',
    slug: '1d8c694cfea738f3606e6cd7dc12ff6c077a4a3e',
  });
});

test ('missing protocol and www', () => {
  expect(canonicalUrl('tubeoffline.com')).toEqual({
    canonical: 'tubeoffline.com',
    domain: 'tubeoffline.com',
    slug: '1d8c694cfea738f3606e6cd7dc12ff6c077a4a3e',
  });
});

test('remove port', () => {
  expect(canonicalUrl('https://me.tv:80')).toEqual({
    canonical: 'me.tv',
    domain: 'me.tv',
    slug: '42e81bef20384a1be20fe652e795a6b5e48c03b5',
  });
});

test('remove hash', () => {
  expect(canonicalUrl('http://me.tv/about.html#contact')).toEqual({
    canonical: 'me.tv/about.html',
    domain: 'me.tv',
    slug: '9261086205888c9c5a7bd4370610c2246a00473a',
  });
});

test('remove www', () => {
  expect(canonicalUrl('http://www.me.tv')).toEqual({
    canonical: 'me.tv',
    domain: 'me.tv',
    slug: '42e81bef20384a1be20fe652e795a6b5e48c03b5',
  });
});

test('remove www hash port', () => {
  expect(canonicalUrl('https://me.tv:80/about.html#contact')).toEqual({
    canonical: 'me.tv/about.html',
    domain: 'me.tv',
    slug: '9261086205888c9c5a7bd4370610c2246a00473a',
  });
});




