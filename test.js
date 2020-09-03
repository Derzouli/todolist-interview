const app = require('./server.js').server;
const cache = require('./server.js').cache;
const request = require('supertest');

describe('GET /todo/ 200 statusCode', () => {
  it('should get todo page', async () => {
      cache.flushAll();
      const res = await request(app)
          .get('/todo/');
      expect(res.statusCode).toEqual(200);
  })
})

describe('POST /todo/create', () => {
  it('should post new item in todo page', async () => {
  	  cache.flushAll();
      const res = await request(app)
          .post('/todo/create')
          .send({
               create_item: "test"
          })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"data": {'item': "item ID: 0 has been created with content test"}})
  })
})

describe('DELETE /todo/delete/id', () => {
  it('should delete item in page', async () => {
  	  cache.flushAll();
      const res = await request(app)
          .delete('/todo/delete/1')
      expect(res.statusCode).toEqual(204);
      const res2 = await request(app)
          .post('/todo/create')
          .send({
               create_item: "test"
          })
      expect(res2.statusCode).toEqual(201);
      expect(res2.body).toEqual({"data": {'item': "item ID: 0 has been created with content test"}})
      const res3 = await request(app)
          .delete('/todo/delete/0')
      expect(res3.statusCode).toEqual(200);
  })
})

describe('PUT /todo/update/1', () => {
  it('create first an object with put and then modify it by updating', async () => {
      cache.flushAll();
      const res1 = await request(app)
          .put('/todo/update/1')
          .send({
               item_content: "test"
          })
      expect(res1.statusCode).toEqual(201);
      expect(res1.body).toEqual({"data": {'item': "item ID: 1 has been updated with content test"}})
      const res2 = await request(app)
          .put('/todo/update/1')
          .send({
          	item_content: "some change"
          })
      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toEqual({"data": {'item': "item ID: 1 has been updated with content some change"}})
  })
})
