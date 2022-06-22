# canonical-url

Wrapper class over [Normalize URL](https://github.com/powr/normalize-url#readme)

## Node / npm / Jest versions

```json
{
  ...
  "dependencies": {
    "normalize-url": "^4.4.0"
  },
  "devDependencies": {
    "jest": "^24.9.0"
  },
  "engines": {
    "node": ">=12.10.0",
    "npm": "~6.10.3"
  }
}
```

## Install

```
$ npm install [https://git-codecommit.us-east-1.amazonaws.com/v1/repos/canonical-url](https://github.com/video-me-tv/canonical-url/)
```

## Usage

```js
const canonicalUrl = require('canonical-url');

const {canonical, domain, slug} = canonicalUrl('https://powr.com:80/about.html#contact');
// canonical => 'powr.com/about.html'
// domain => 'powr.com'
// slug => '9261086205888c9c5a7bd4370610c2246a00473a'

const {canonical} = canonicalUrl('https://powr.com:80/about.html#contact');
// canonical => 'powr.com/about.html'

```

## Creating a New Release

First modify the version in `package.json` then use the same version when creating the tag. In this example, version 1.0.4 is used.

```bash
$ git commit -am 'message for the new changes'
$ git tag -a v1.0.4 -m 'release message for tag'
$ git push origin master
$ git push origin v1.0.4
```

## API

### canonicalUrl(url, options?)

#### url

Type: `string`

URL to normalize, including [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).

#### options

> WARNING: DO NOT MODIFY THESE OR I WILL HUNT YOU DOWN ONCE I FIX YOUR BUG!

Type: `object`

##### defaultProtocol

Type: `string`<br>
Default: `http:`

##### normalizeProtocol

Type: `boolean`<br>
Default: `true`

Prepend `defaultProtocol` to the URL if it's protocol-relative.

```js
canonicalUrl('//powr.com:80/');
//=> 'http://powr.com'

canonicalUrl('//powr.com:80/', {normalizeProtocol: false});
//=> '//powr.com'
```

##### forceHttp

Type: `boolean`<br>
Default: `false`

Normalize `https:` to `http:`.

```js
canonicalUrl('https://powr.com:80/');
//=> 'https://powr.com'

canonicalUrl('https://powr.com:80/', {forceHttp: true});
//=> 'http://powr.com'
```

##### forceHttps

Type: `boolean`<br>
Default: `false`

Normalize `http:` to `https:`.

```js
canonicalUrl('https://powr.com:80/');
//=> 'https://powr.com'

canonicalUrl('http://powr.com:80/', {forceHttps: true});
//=> 'https://powr.com'
```

This option can't be used with the `forceHttp` option at the same time.

##### stripAuthentication

Type: `boolean`<br>
Default: `true`

Strip the [authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) part of the URL.

```js
canonicalUrl('user:password@powr.com');
//=> 'https://powr.com'

canonicalUrl('user:password@powr.com', {stripAuthentication: false});
//=> 'https://user:password@powr.com'
```

##### stripHash

Type: `boolean`<br>
Default: `false`

Strip the hash part of the URL.

```js
canonicalUrl('powr.com/about.html#contact');
//=> 'http://powr.com/about.html#contact'

canonicalUrl('powr.com/about.html#contact', {stripHash: true});
//=> 'http://powr.com/about.html'
```

##### stripProtocol

Type: `boolean`<br>
Default: `false`

Remove HTTP(S) protocol from the URL: `http://powr.com` → `powr.com`.

```js
canonicalUrl('https://powr.com');
//=> 'https://powr.com'

canonicalUrl('powr.com', {stripProtocol: true});
//=> 'powr.com'
```

##### stripWWW

Type: `boolean`<br>
Default: `true`

Remove `www.` from the URL.

```js
canonicalUrl('http://www.powr.com');
//=> 'http://powr.com'

canonicalUrl('http://www.powr.com', {stripWWW: false});
//=> 'http://www.powr.com'
```

##### removeQueryParameters

Type: `Array<RegExp | string>`<br>
Default: `[/^utm_\w+/i]`

Remove query parameters that matches any of the provided strings or regexes.

```js
canonicalUrl('www.powr.com?foo=bar&ref=test_ref', {
	removeQueryParameters: ['ref']
});
//=> 'http://powr.com/?foo=bar'
```

##### removeTrailingSlash

Type: `boolean`<br>
Default: `true`

Remove trailing slash.

**Note:** Trailing slash is always removed if the URL doesn't have a pathname.

```js
canonicalUrl('http://powr.com/redirect/');
//=> 'http://powr.com/redirect'

canonicalUrl('http://powr.com/redirect/', {removeTrailingSlash: false});
//=> 'http://powr.com/redirect/'

canonicalUrl('http://powr.com/', {removeTrailingSlash: false});
//=> 'http://powr.com'
```

##### removeDirectoryIndex

Type: `boolean | Array<RegExp | string>`<br>
Default: `false`

Removes the default directory index file from path that matches any of the provided strings or regexes. When `true`, the regex `/^index\.[a-z]+$/` is used.

```js
canonicalUrl('www.powr.com/foo/default.php', {
	removeDirectoryIndex: [/^default\.[a-z]+$/]
});
//=> 'http://powr.com/foo'
```

##### sortQueryParameters

Type: `boolean`<br>
Default: `true`

Sorts the query parameters alphabetically by key.

```js
canonicalUrl('www.powr.com?b=two&a=one&c=three', {
	sortQueryParameters: false
});
//=> 'http://powr.com/?b=two&a=one&c=three'
```


## Related

- [normalize-url](https://github.com/powr/normalize-url#readme) - Original package
