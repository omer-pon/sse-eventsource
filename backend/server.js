const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(cors());

app.get("/", (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-store");
	let counter = 5;

	let intervalId = setInterval(() => {
		const date = new Date();
		if (counter > 0) {
			res.write(`event: CustomEvent\n`);
			res.write(`data: {"time": "${date.toLocaleTimeString()}"}\n\n`);
		} else {
			// Send a closing event to signify the end of the stream
			res.write(`event: Close\n`);
			res.write(`data: Stream Ended\n\n`);

			clearInterval(intervalId);
		}
		counter--;
	}, 1000);
});

app.listen(PORT, () => {
	console.log("Server is running on port 8000");
});
