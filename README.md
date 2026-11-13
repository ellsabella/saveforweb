# Web Image Export

A browser-based PNG/JPEG/WebP optimiser modelled on Photoshop's Save for Web (Legacy).
Images are processed in the browser and never uploaded.

## Features

- **PNG-8** colour reduction: Perceptual, Selective, Adaptive, Restrictive (Web),
  Grayscale, Black & White, from 2 to 256 colours, with a live colour table.
- **Dithering**: Diffusion, Pattern or Noise, with an adjustable amount, plus web snap.
- **PNG-24**, **JPEG** and **WebP** (quality and blur; WebP can keep full alpha
  transparency).
- **Transparency and matte**: PNG-8 transparency is on or off per pixel (pixels under
  50% opacity become transparent, the rest are blended onto the matte colour).
- **Presets** matching the Save for Web defaults (PNG-8 128 Dithered, JPEG High, and so on),
  plus WebP High and Medium.
- **Canvas size** (crop or pad from an anchor, no resampling) and **image size** (resample).
- **Optimise to file size**: finds the highest JPEG or WebP quality, or PNG-8 colour count, that
  fits a target size in KB.
- **Side-by-side preview** of original and optimised, with synced pan and zoom:
  drag to pan, Ctrl+scroll or pinch to zoom, double-click to toggle Fit / 100%,
  Ctrl + / − / 0 / 1 from the keyboard.

Open an image with the button, by dropping it on the page, or by pasting it. PNG, JPEG,
WebP, GIF and BMP are accepted as input; output is PNG, JPEG or WebP. Animated
images are read as their first frame only.

## Limitations

- Images are decoded through the browser's 2D canvas, so output is always 8 bits per
  channel, embedded colour profiles are not preserved, and semi-transparent pixels can
  shift by a level or so. "Lossless" in the app means lossless relative to those
  decoded pixels.
- JPEG and WebP are encoded by the browser's own encoders, so there are no Progressive
  or Optimized switches.
- Safari cannot encode WebP itself, so there the app loads a bundled WebAssembly build
  of libwebp (about 320 KB, fetched only when needed) and runs it in a Web Worker so
  the page stays responsive. It is slower than a built-in encoder, its output differs
  slightly from Chrome's at the same quality, and it does not work when `index.html`
  is opened directly from disk. Add `?wasmwebp` to the URL to force
  this encoder in any browser.
- Optimise to file size can raise the quality or colour count if the file is already
  under the target.

## Structure

The whole app is `index.html` (markup, styles and script in one file). The WebP
fallback adds `webp-worker.js` and `vendor/webp/`, a copy of the libwebp encoder from
[@jsquash/webp](https://github.com/jamsinclair/jSquash) (licences are in that folder). There are no npm dependencies and no build step. The page loads two fonts from Google Fonts and
falls back to system fonts when offline; no image data is ever sent anywhere.

## Run locally

Open `index.html` directly in a browser, or:

    npm run dev

`npm run dev` serves the folder with `npx serve`, which is downloaded on first use.
When opened directly from disk, browsers usually block the page from loading
`fourlayertest.png`, so a generated sample image is shown instead of the default one.

## Deploy to Vercel

Push this folder to a Git repository and import it in Vercel, or run `vercel` in this
folder. `vercel.json` tells Vercel there is no framework and no build, and to serve
the repository root.
