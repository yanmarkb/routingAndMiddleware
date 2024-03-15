const express = require("express");
const router = express.Router();
const items = require("./fakeDb");

router.get("/", (req, res) => {
	res.json(items);
});

router.post("/", (req, res) => {
	const newItem = { name: req.body.name, price: req.body.price };
	items.push(newItem);
	res.status(201).json({ added: newItem });
});

router.get("/:name", (req, res) => {
	const foundItem = items.find((item) => item.name === req.params.name);
	if (foundItem) {
		res.json(foundItem);
	} else {
		res.status(404).json({ error: "Item not found" });
	}
});

router.patch("/:name", (req, res) => {
	const foundItem = items.find((item) => item.name === req.params.name);
	if (foundItem) {
		foundItem.name = req.body.name || foundItem.name;
		foundItem.price = req.body.price || foundItem.price;
		res.json({ updated: foundItem });
	} else {
		res.status(404).json({ error: "Item not found" });
	}
});

router.delete("/:name", (req, res) => {
	const itemIndex = items.findIndex((item) => item.name === req.params.name);
	if (itemIndex !== -1) {
		items.splice(itemIndex, 1);
		res.json({ message: "Deleted" });
	} else {
		res.status(404).json({ error: "Item not found" });
	}
});

module.exports = router;
