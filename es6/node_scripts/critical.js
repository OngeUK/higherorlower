let critical = require("critical");

critical.generate({
	inline: true,
	base: "dist/higherorlower/es6",
	src: "index.html",
	dest: "index.html",
	minify: true,
	width: 1300,
	height: 900
}).then(() => {
	console.log("[ES6] Critical path CSS extracted");
}).error((err) => {
	console.error(err);
});