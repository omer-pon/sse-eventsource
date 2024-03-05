const ul = document.querySelector("ul");
let source = new EventSource("http://localhost:8000");

const appendToList = (data) => {
	const li = document.createElement("li");
	li.textContent = data;
	ul.appendChild(li);
};

source.addEventListener("CustomEvent", (event) => {
	appendToList(JSON.parse(event.data).time);
});

source.addEventListener("Close", (event) => {
	appendToList(event.data);
	source.close();
});

source.onerror = (error) => {
	console.error("Error: " + JSON.parse(error));
};
