const express = require("express");
const cors = require("cors");
const moment = require("moment-timezone");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-store");

	let counter = Math.floor(Math.random() * 10) + 1;

	let intervalId = setInterval(() => {
		let curDate = moment().tz("America/New_York").format();

		res.write(`event: ping\n`);
		res.write(`data: {"time": "${curDate}"}\n\n`);

		counter--;

		if (!counter) {
			res.write(`data: This is a message at time ${curDate}\n\n`);
			counter = Math.floor(Math.random() * 10) + 1;
		}
		console.log("req.finished", req.finished);
		// Check if the connection is closed
		if (req.finished) {
			clearInterval(intervalId);
		}
	}, 1000);
});

app.listen(8000, () => {
	console.log("Server is running on port 8000");
});
