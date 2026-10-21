const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('root entry replaces history with the fixed game URL and preserves query and hash', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const [search, hash] of [['', ''], ['?from=home', '#save'], ['?next=https://other.invalid/', '#x'], ['?v=1.0.21&from=wechat', '']]) {
    let destination;
    vm.runInNewContext(script, { URL, window: { location: { search, hash, replace(value) { destination = value; } } } });
    const expected = new URL('https://karo-blue.github.io/buyunlu/' + search + hash);
    expected.searchParams.set('v', '1.0.22');
    assert.equal(destination, expected.href);
  }
  assert.match(html, /<noscript>\s*<meta http-equiv="refresh" content="0;url=https:\/\/karo-blue\.github\.io\/buyunlu\/\?v=1\.0\.22">\s*<\/noscript>/);
  assert.match(html, /<a href="https:\/\/karo-blue\.github\.io\/buyunlu\/\?v=1\.0\.22">/);
});
