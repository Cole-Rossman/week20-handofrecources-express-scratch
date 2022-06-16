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
  it('/watches/:id should return a watch detail', async () => {
    const resp = await request(app).get('/watches/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Nautilus',
      manufacturer: 'Patek Philippe',
      origin: 'Geneva, Switzerland',
      price: '$35,000',
    });
  });
  it('POST /watches should create a new watch', async () => {
    const resp = await request(app).post('/watches').send({
      name: 'Skydweller',
      manufacturer: 'Rolex',
      origin: 'Geneva, Switzerland',
      price: '$17,000',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Skydweller');
    expect(resp.body.manufacturer).toEqual('Rolex');
    expect(resp.body.origin).toEqual('Geneva, Switzerland');
    expect(resp.body.price).toEqual('$17,000');
    expect(resp.body.id).not.toBeUndefined();
  });
  it('PUT /watches/:id should update watches', async () => {
    const resp = await request(app).put('/watches/2').send({ name: 'Aquaracer' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Aquaracer');
  });
  it('DELETE /watches/:id should delete a watch', async () => {
    const resp = await request(app).delete('/watches/2');
    expect(resp.status).toBe(200);
    const { body } = await request(app).get('/watches/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
