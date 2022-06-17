const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('fish routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/fish should return a list of fish', async () => {
    const resp = await request(app).get('/fish');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Salmon',
        origin: 'Pacific Northwest',
        lifespan: '2-7 years',
      },
      {
        id: '2',
        name: 'Rainbow Trout',
        origin: 'North America',
        lifespan: '7 years',
      },
      {
        id: '3',
        name: 'Sturgeon',
        origin: 'North America',
        lifespan: '100 years',
      },
      {
        id: '4',
        name: 'Greenland Shark',
        origin: 'Canadian Arctic',
        lifespan: '250-500 years',
      },
    ]);
  });
  it('/fish/:id should return a fish detail', async () => {
    const resp = await request(app).get('/fish/2');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Rainbow Trout',
      origin: 'North America',
      lifespan: '7 years',
    });
  });
  it.skip('POST /cars should create a new car', async () => {
    const resp = await request(app).post('/cars').send({
      name: '4Runner',
      manufacturer: 'Toyota',
      origin: 'Japan',
      price: '$40,000',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('4Runner');
    expect(resp.body.manufacturer).toEqual('Toyota');
    expect(resp.body.origin).toEqual('Japan');
    expect(resp.body.price).toEqual('$40,000');
    expect(resp.body.id).not.toBeUndefined();
  });
  it.skip('PUT /cars/:id should update cars', async () => {
    const resp = await request(app).put('/cars/1').send({ name: 'Viper' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Viper');
  });
  it.skip('DELETE /cars/:id should delete a car', async () => {
    const resp = await request(app).delete('/cars/4');
    expect(resp.status).toBe(200);
    const { body } = await request(app).get('/cars/4');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});