"use strict";

const app = require('./server.js').server;
const { flushAll, list_keys } = require('./models/data_model.js')
const request = require('supertest');

describe('GET /items/ 200 statusCode', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should create list', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'lists': "list test has been created"}})
  }),
  it('should get allItems ', async () => {
      const res = await request(app)
          .get('/items').send({ list: "test"});
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': {}}})
  }),
  it('should create item', async () => {
      const res = await request(app)
          .post('/items')
          .send({
               content: "test",
               list: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'items': "item 0 has been created with content test with status todo"}})
  }),
  it('should get allItems => item that has just been created ', async () => {
      const res = await request(app)
          .get('/items').send({ list: "test"});
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': {"0": {"content": "test", "done": false}}}})
  })
})

describe('POST /items', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should create list', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'lists': "list test has been created"}})
  }),
  it('should not create item', async () => {
      const res = await request(app)
          .post('/items')
          .send({
               item: "test",
               list: "test"
          })
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({"error": "item could not be created"})
    })
})


describe('POST /items', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should create list', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'lists': "list test has been created"}})
  }),
  it('should create item', async () => {
      const res = await request(app)
          .post('/items')
          .send({
               content: "test",
               list: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'items': "item 0 has been created with content test with status todo"}})
  }),
  it('should create item', async () => {
      const res = await request(app)
          .post('/items')
          .send({
                list: "test",
                content: "test2",
                done: true
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'items': "item 1 has been created with content test2 with status done"}})
  })
})

describe('DELETE /items/:id', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should create list', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'lists': "list test has been created"}})
  }),
  it('should not delete item, should return HTTP 204 No Content', async () => {
      const res = await request(app).delete('/items/1').send({ list: "test"});
      expect(res.statusCode).toEqual(204)
  }),
  it('should create item ID: 0, data: test', async () => {
      const res = await request(app).post('/items/').send({ content: "test", list: "test"})
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'items': "item 0 has been created with content test with status todo"}});
  }),
  it('should delete item ID: 0, data: test', async () => {
      const res = await request(app)
          .delete('/items/0').send({ list: "test"});
      expect(res.statusCode).toEqual(200)
  })
})

describe('PUT /items/:id', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should create list', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'lists': "list test has been created"}})
  }),
  it('should not create object wrong id', async () => {
      const res = await request(app)
          .put('/items/-1')
          .send({
               content: "test",
               done: false,
               list: "test"
          })
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({"error": "item could not be updated"})
    }),
  it('should not create object wrong id', async () => {
      const res = await request(app)
          .put('/items/akofdo')
          .send({
               content: "test",
               done: false,
               list: "test"
          })
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({"error": "item could not be updated"})
    }),
  it('should not create object no parameter', async () => {
      const res = await request(app)
          .put('/items/1')
          .send({
          })
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({"error": "item could not be updated"})
    }),
  it('should not create object id too high', async () => {
      const res = await request(app)
          .put('/items/1000000')
          .send({
          })
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({"error": "item could not be updated"})
    })
})

describe('PUT /items/:id', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should create list', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'lists': "list test has been created"}})
  }),
  it('should create item, return 201 with item updated', async () => {
      const res = await request(app)
          .put('/items/1')
          .send({
               content: "test",
               done: false,
               list: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'items': "item 1 has been updated with content test with status todo"}})
    }),
  it('should create item, return 200 with item updated', async () => {
      const res = await request(app)
          .put('/items/1')
          .send({
               content: "test",
               done: true,
               list: "test"
          })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': "item 1 has been updated with content test with status done"}})
    })
  it('should update item, return 200 with item updated', async () => {
      const res = await request(app)
          .put('/items/1')
          .send({
          	content: "some change",
            done: false,
            list: "test"
          })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': "item 1 has been updated with content some change with status todo"}})
  }),
  it('should update item, return 200 with item updated', async () => {
      const res = await request(app)
          .put('/items/1')
          .send({
            done: true,
            list: "test"
          })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': "item 1 has been updated with content some change with status done"}})
  }),
  it('should update item, return 200 with item updated', async () => {
      const res = await request(app)
          .put('/items/1')
          .send({
            content: "modification",
            list: "test"
          })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': "item 1 has been updated with content modification with status done"}})
  })
})

describe('404 error page', () => {
  it('should get allItems ', async () => {
      const res = await request(app)
          .get('/notfound');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({"data": {'items': {}}})
  })
})

describe('POST /lists', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should not create list because name only accept alpha characters', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "13test!",
               list: "test"
          })
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({'error': "List name need to have only alpha characters"})
  }),
  it('should not create list because name only accept alpha characters', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "13dd",
               list: "test"
          })
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({'error': "List name need to have only alpha characters"})
  }),
  it('should create list', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "test",
               list: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'lists': "list test has been created"}})
  }),
  it('should not create list because already exist', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "test",
               list: "test"
          })
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({'error': "List name already exists"})
  })
})


describe('GET /lists/', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should create list', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'lists': "list test has been created"}})
  }),
  it('should get list', async () => {
      const res = await request(app)
          .get('/lists')
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'lists': ["test"] }})
      expect(list_keys().includes(["_lists", "test"]));
  }),
  it('should create list', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "testalpha"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'lists': "list testalpha has been created"}})
  }),
  it('should create list', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "testbeta"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'lists': "list testbeta has been created"}})
  }),
  it('should get list', async () => {
      const res = await request(app)
          .get('/lists')
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'lists': ["test", "testalpha", "testbeta"]}})
      expect(list_keys().includes(["_lists", "test", "testalpha", "testbeta"]));
  })
})


describe('DELETE /lists/:name', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should not delete list, should return HTTP 204 No Content', async () => {
      const res = await request(app).delete('/lists/test');
      expect(res.statusCode).toEqual(204)
  }),
  it('should create list', async () => {
      const res = await request(app)
          .post('/lists')
          .send({
               list_name: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'lists': "list test has been created"}})
  }),
  it('should delete item ID: 0, data: test', async () => {
      const res = await request(app)
          .delete('/lists/test')
      expect(res.statusCode).toEqual(200)
  }),
  it('should not delete list, should return HTTP 204 No Content', async () => {
      const res = await request(app)
          .delete('/lists/test')
      expect(res.statusCode).toEqual(204)
  })
})

describe('DELETE /lists/:name', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should not delete list, name is not correct', async () => {
      const res = await request(app).delete('/lists/delpflpe!');
      expect(res.statusCode).toEqual(500)
  })
})