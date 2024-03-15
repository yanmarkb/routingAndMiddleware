const express = require("express");
const itemsRoutes = require("./items");
const app = express();

app.use(express.json());
app.use("/items", itemsRoutes);

//Advice from mentor. Make changeable things like this into variables so you only have to change it in one place.
const port = 3000;
app.listen(port, () => {
	console.log("Server running on port ${port}"); //Literal string interpolation
});

module.exports = app;
