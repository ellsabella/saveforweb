# Web Image Export

A browser-based PNG/JPEG optimiser modelled on Photoshop's Save for Web (Legacy):
PNG-8 colour reduction (Perceptual, Selective, Adaptive, Web, Grayscale, Black & White),
dithering, web snap, matte and transparency, PNG-24, JPEG, canvas and image size,
and optimise-to-file-size. Images are processed in the browser and never uploaded.

## Structure

The whole app is `index.html` (markup, styles and script in one file). There are no
dependencies and no build step.

## Run locally

Open `index.html` directly in a browser, or:

    npm run dev

## Deploy to Vercel

Push this folder to a Git repository and import it in Vercel, or run `vercel` in this
folder. `vercel.json` tells Vercel there is no framework and no build, and to serve
the repository root.
