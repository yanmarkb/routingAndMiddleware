const request = require("supertest");
const app = require("./app");
const items = require("./fakeDb");

beforeEach(function () {
	items.push({ name: "popsicle", price: 1.45 });
});

afterEach(function () {
	// Ensure the test starts with no items
	items.length = 0;
});

// Test for GET /items
describe("GET /items", function () {
	test("Gets a list of items", async function () {
		const response = await request(app).get("/items");
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual([{ name: "popsicle", price: 1.45 }]);
	});
});

// Test for POST /items
describe("POST /items", function () {
	test("Creates a new item", async function () {
		const response = await request(app)
			.post("/items")
			.send({ name: "cheerios", price: 3.4 });
		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual({ added: { name: "cheerios", price: 3.4 } });
	});
});

// Test for GET /items/:name
describe("GET /items/:name", function () {
	test("Gets a single item", async function () {
		const response = await request(app).get("/items/popsicle");
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ name: "popsicle", price: 1.45 });
	});
});

// Test for PATCH /items/:name
describe("PATCH /items/:name", function () {
	test("Updates an item", async function () {
		const response = await request(app)
			.patch("/items/popsicle")
			.send({ name: "new popsicle", price: 2.45 });
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			updated: { name: "new popsicle", price: 2.45 },
		});
	});
});

// Test for DELETE /items/:name
describe("DELETE /items/:name", function () {
	test("Deletes an item", async function () {
		const response = await request(app).delete("/items/popsicle");
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ message: "Deleted" });
	});
});
