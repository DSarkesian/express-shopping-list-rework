const request = require("supertest");
const app = require("../app");
let db = require("../fakeDb");
const testItem = { name: "silly", price: "200" };

beforeEach(function () {
  db.items.push({ ...testItem });
});

afterEach(function () {
  db.items.length = 0;
});

describe("Get/Items", function(){
  it("Gets list of items", async function() {
    const resp = await request(app).get(`/items`);
    console.log(resp.body)
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({"items":[testItem]});
  })
  });
//get items by name test
  describe("GET /items/:name", function () {
    test("Gets a single item", async function () {
      const response = await request(app).get(`/items/${testItem.name}`);
      expect(response.body).toEqual({ item: testItem });
    });

    test("Responds with 404 if can't find item", async function () {
      const response = await request(app).get(`/items/not-there`);
      expect(response.statusCode).toEqual(404);
    });
  });

describe("Post item", function (){
  it("creates new item", async function(){
    const resp = await request(app)
    .post('/items')
    .send({"name":"water","price":"2.00"});
    expect(resp.body).toEqual({
      "item":{"name":"water","price":"2.00"}
    })
    const getResp = await request(app).get(`/items/water`)
    expect(getResp.statusCode).toEqual(200)
    expect(getResp.body).toEqual({ "item": { "name":"water","price":"2.00" } });
  })
})

describe("patch /cats/:name", function(){
  it("update a single item", async function(){
    const resp = await request(app)
    .patch(`/items/${testItem.name}`)
    .send({"name":"patch", "price":"3.00"});
    expect(resp.body).toEqual({"item":{"name":"patch","price":"3.00"}})
  })
  it("Responds with 404 if can't find item", async function () {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toEqual(404);
  });
})

describe("DELETE /items/:name", function () {
  test("Deletes a single a item", async function () {
    const response = await request(app)
      .delete(`/items/silly`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});
