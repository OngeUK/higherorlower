module.exports = {
	plugins: [
		require("autoprefixer")({browsers: "> 1%, ie 11", grid: false}), // add vendor prefixes, except legacy CSS grid
		require("css-mqpacker")({sort: true}), // group media query declarations into single statements
		require("postcss-responsive-type")(), // Use responsive typography [https://www.npmjs.com/package/postcss-responsive-type]
		require("postcss-pxtorem")() // Convert px to rem values [https://github.com/cuth/postcss-pxtorem]
	]
};