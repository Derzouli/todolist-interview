"use strict";

const app = require('./server.js').server;
const { flushAll } = require('./controllers/utils.js')
const request = require('supertest');

describe('GET /items/ 200 statusCode', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should get allItems ', async () => {
      const res = await request(app)
          .get('/items');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': {}}})
  }),
  it('should create item', async () => {
      const res = await request(app)
          .post('/items')
          .send({
               content: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'items': "item 0 has been created with content test with status todo"}})
  }),
  it('should get allItems => item that has just been created ', async () => {
      const res = await request(app)
          .get('/items');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': {"0": {"content": "test", "done": false}}}})
  })
})

describe('POST /items', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should not create item', async () => {
      const res = await request(app)
          .post('/items')
          .send({
               item: "test"
          })
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({"error": "item could not be created"})
    })
})
  


describe('POST /items', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should create item', async () => {
      const res = await request(app)
          .post('/items')
          .send({
               content: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'items': "item 0 has been created with content test with status todo"}})
  }),
  it('should create item', async () => {
      const res = await request(app)
          .post('/items')
          .send({
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
  it('should delete item, should return HTTP 204 No Content', async () => {
      const res = await request(app).delete('/items/1');
      expect(res.statusCode).toEqual(204)
  }),
  it('should create item ID: 0, data: test', async () => {
      const res = await request(app).post('/items/').send({ content: "test"})
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'items': "item 0 has been created with content test with status todo"}});
  }),
  it('should delete item ID: 0, data: test', async () => {
      const res = await request(app)
          .delete('/items/0')
      expect(res.statusCode).toEqual(200)
  })
})

describe('PUT /items/:id', () => {
  beforeAll( async () => {
    await flushAll();
  }),
  it('should not create object wrong id', async () => {
      const res = await request(app)
          .put('/items/-1')
          .send({
               content: "test",
               done: false
          })
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({"error": "item could not be updated"})
    }),
  it('should not create object wrong id', async () => {
      const res = await request(app)
          .put('/items/akofdo')
          .send({
               content: "test",
               done: false
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
  it('should create item, return 201 with item updated', async () => {
      const res = await request(app)
          .put('/items/1')
          .send({
               content: "test",
               done: false
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'items': "item 1 has been updated with content test with status todo"}})
    }),
  it('should create item, return 200 with item updated', async () => {
      const res = await request(app)
          .put('/items/1')
          .send({
               content: "test",
               done: true
          })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': "item 1 has been updated with content test with status done"}})
    })
  it('should update item, return 200 with item updated', async () => {
      const res = await request(app)
          .put('/items/1')
          .send({
          	content: "some change",
            done: false
          })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': "item 1 has been updated with content some change with status todo"}})
  }),
  it('should update item, return 200 with item updated', async () => {
      const res = await request(app)
          .put('/items/1')
          .send({
            done: true
          })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': "item 1 has been updated with content some change with status done"}})
  }),
  it('should update item, return 200 with item updated', async () => {
      const res = await request(app)
          .put('/items/1')
          .send({
            content: "modification",
          })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"data": {'items': "item 1 has been updated with content modification with status done"}})
  })
})

// describe('404 error page', () => {
//   it('should get allItems ', async () => {
//       const res = await request(app)
//           .get('/todo');
//       expect(res.statusCode).toEqual(404);
//       expect(res.body).toEqual({"data": {'items': {}}})
//   })
// })