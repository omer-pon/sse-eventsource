let source = new EventSource("http://localhost:8000");

source.onmessage = function (event) {
	console.log(event.data);
};

source.addEventListener("ping", function (event) {
	console.log(event.data);
});

source.onclose = function () {
	console.log("Connection was closed");
};

source.onerror = function (error) {
	console.error("Error: " + error.message);
	// source.close();
};

source.addEventListener(
	"ping",
	function (event) {
		let data = JSON.parse(event.data);
		console.log("Ping at " + data.time);
	},
	false
);
