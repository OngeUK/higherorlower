let critical = require("critical");

critical.generate({
	inline: true,
	base: "dist/higherorlower/typescript",
	src: "index.html",
	dest: "index.html",
	minify: true,
	width: 1300,
	height: 900
}).then(() => {
	console.log("[TypeScript] Critical path CSS extracted");
}).error((err) => {
	console.error(err);
});