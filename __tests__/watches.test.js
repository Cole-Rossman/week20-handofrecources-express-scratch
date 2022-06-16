const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('watch routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/watches should return a list of watches', async () => {
    const resp = await request(app).get('/watches');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Nautilus',
        manufacturer: 'Patek Philippe',
        origin: 'Geneva, Switzerland',
        price: '$35,000',
      },
      {
        id: '2',
        name: 'Daytona',
        manufacturer: 'Rolex',
        origin: 'Geneva, Switzerland',
        price: '$13,150',
      },
      {
        id: '3',
        name: 'Seamaster',
        manufacturer: 'Omega',
        origin: 'La Chaux-de-Fonds, Switzerland',
        price: '$6,000',
      },
      {
        id: '4',
        name: 'RM 008 Tourbillion',
        manufacturer: 'Richard Mille',
        origin: 'Les Breuleux, Switzerland',
        price: '$7,206,000',
      },
    ]);
  });
  it.skip('/fruits/:id should return a fruit detail', async () => {
    const resp = await request(app).get('/fruits/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Mango',
      origin: 'India',
      benefits: 'Consumption of Mangos can lead to lower blood pressure, a regular pulse and a stable digestive system',
    });
  });
  it.skip('POST /fruits should create a new fruit', async () => {
    const resp = await request(app).post('/fruits').send({
      name: 'Grapes',
      origin: 'Egypt',
      benefits: 'They are healthy and tasty.',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Grapes');
    expect(resp.body.origin).toEqual('Egypt');
    expect(resp.body.benefits).toEqual('They are healthy and tasty.');
    expect(resp.body.id).not.toBeUndefined();
  });
  it.skip('PUT /fruits/:id should update fruit', async () => {
    const resp = await request(app).put('/fruits/2').send({ name: 'Pear' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Pear');
  });
  it.skip('DELETE /fruits/:id should delete a fruit', async () => {
    const resp = await request(app).delete('/fruits/3');
    expect(resp.status).toBe(200);
    const { body } = await request(app).get('/fruits/3');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
