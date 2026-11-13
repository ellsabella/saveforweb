# WebP encoder (WebAssembly)

libwebp's encoder compiled to WebAssembly, copied unmodified from
[@jsquash/webp](https://github.com/jamsinclair/jSquash) 1.5.0 (`codec/enc/webp_enc.js`
and `codec/enc/webp_enc.wasm`), which repackages the codec from Google's Squoosh.

`webp-worker.js` loads it, and `index.html` starts that worker only in browsers whose canvas cannot encode WebP (Safari).

Licences: `LICENSE` (Apache-2.0, jSquash and Squoosh) and `LICENSE.codec.md` (libwebp).
