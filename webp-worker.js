// WebP fallback encoder, run off the main thread so the page stays responsive.
// index.html starts this module worker only in browsers whose canvas cannot encode WebP (Safari).
import factory from './vendor/webp/webp_enc.js';

const ready = factory({ noInitialRun: true });

self.onmessage = async e => {
  const { data, width, height, options } = e.data;
  try {
    const mod = await ready;
    const out = mod.encode(new Uint8ClampedArray(data), width, height, options);
    if (!out) throw new Error('WebP encoding failed.');
    const copy = new Uint8Array(out);   // detach from the encoder's memory before transferring
    self.postMessage({ out: copy.buffer }, [copy.buffer]);
  } catch (err) {
    self.postMessage({ error: String(err && err.message || err) });
  }
};
