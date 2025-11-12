// jest.polyfills.js
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (typeof TransformStream === 'undefined') {
  global.TransformStream = require('web-streams-polyfill').TransformStream;
}
