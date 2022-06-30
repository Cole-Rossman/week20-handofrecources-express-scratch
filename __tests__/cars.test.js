const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cars routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/cars should return a list of cars', async () => {
    const resp = await request(app).get('/cars');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Urus',
        manufacturer: 'Lamborghini',
        origin: 'Italy',
        price: '$230,000',
      },
      {
        id: '2',
        name: 'Phantom',
        manufacturer: 'Rolls Royce',
        origin: 'United Kingdom',
        price: '$460,000',
      },
      {
        id: '3',
        name: 'Chiron',
        manufacturer: 'Bugatti',
        origin: 'Italy',
        price: '$3,300,000',
      },
      {
        id: '4',
        name: 'Corolla',
        manufacturer: 'Toyota',
        origin: 'Japan',
        price: '$20,000',
      },
    ]);
  });
  it('/cars/:id should return a car detail', async () => {
    const resp = await request(app).get('/cars/3');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '3',
      name: 'Chiron',
      manufacturer: 'Bugatti',
      origin: 'Italy',
      price: '$3,300,000'
    });
  });
  it('POST /cars should create a new car', async () => {
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
  it('PUT /cars/:id should update cars', async () => {
    const resp = await request(app).put('/cars/1').send({ name: 'Viper' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Viper');
  });
  it('DELETE /cars/:id should delete a car', async () => {
    const resp = await request(app).delete('/cars/4');
    expect(resp.status).toBe(200);
    const { body } = await request(app).get('/cars/4');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
