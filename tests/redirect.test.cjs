const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('root entry replaces history with the fixed game URL and preserves query and hash', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const [search, hash] of [['', ''], ['?from=home', '#save'], ['?next=https://other.invalid/', '#x']]) {
    let destination;
    vm.runInNewContext(script, { window: { location: { search, hash, replace(value) { destination = value; } } } });
    assert.equal(destination, 'https://karo-blue.github.io/buyunlu/' + search + hash);
  }
  assert.match(html, /<noscript>\s*<meta http-equiv="refresh" content="0;url=https:\/\/karo-blue\.github\.io\/buyunlu\/">\s*<\/noscript>/);
  assert.match(html, /<a href="https:\/\/karo-blue\.github\.io\/buyunlu\/">/);
});
