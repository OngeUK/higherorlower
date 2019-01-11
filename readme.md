# Higher or Lower

![alt text](https://www.onge.uk/higherorlower/screenshot.png "Screenshot of Higher or Lower")

## Introduction

_Higher or Lower_ is a simple offline-first Progressive Web App game where the player has three lives to score as many points as they can by predicting whether the next card in the deck will have a value that is higher or lower than the current one (basically a rip off of _Bruce Forsyth's Play Your Cards Right_).

## **[Play Higher or Lower](https://onge.uk/higherorlower/es6/)** ##

I built this to try out new things, especially CSS3 Grid which I've used to build the card faces, whilst allowing me to gain more experience with ES6 and Webpack.

I have built two versions of this game:

- [ES6 version](https://github.com/OngeUK/higherorlower/tree/master/es6)
- [ES6/TypeScript version](https://github.com/OngeUK/higherorlower/tree/master/typescript)

Given time, I might create versions written in React/Preact and Vue.js as well...

## Core technologies used ##
- Webpack 3
- ES6
- Service Workers, using [Workbox](https://workboxjs.org/)
- SASS with PostCSS
- CSS3 Grid
- Flexbox
- Yarn
- Jest

## Features ##

- HTTP/2 CDN delivery
- Full offline support via Service Workers
- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) score of 100/100 on both mobile and desktop
- 100/100 Progressive Web App score on [Lighthouse](https://developers.google.com/web/tools/lighthouse/)
- [WebPageTest](https://www.webpagetest.org) speed index of ~640
- Inlined critical path CSS using [Critical](https://www.npmjs.com/package/critical)
- Persistent "Best score" via localStorage

## Browser support ##

_Higher or Lower_ has been tested on the latest versions of modern browser across Windows, Android, MacOS and iOS. That's right - no Internet Explorer support. I've thrown off the shackles and it feels good (if you can't do that on your personal projects, when can you).